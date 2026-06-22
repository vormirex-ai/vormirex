import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Save, Edit2, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@/store/api/profileApi";

import ProfilePhotoUploader from "../profile/profile-photo-uploader";
import { ProfileStatsBadges } from "../profile/profile-stats-badges";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  bio: Yup.string(),
  phoneNumber: Yup.string(),
});

export function ProfileTab() {
  const user = useSelector((state: any) => state.auth.user);
  const { data: profileData, isLoading } = useGetProfileQuery(undefined);
  const [isEditing, setIsEditing] = useState(false);
  const [updateProfile] = useUpdateProfileMutation();

  const profile = profileData?.user;

  const initialValues = useMemo(
    () => ({
      name: profile?.name || user?.name || "",
      email: profile?.email || user?.email || "",
      phoneNumber: profile?.phoneNumber || user?.phoneNumber || "",
      bio: profile?.bio || user?.bio || "",
    }),
    [profile, user],
  );

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,

    onSubmit: async (values) => {
      try {
        await updateProfile(values).unwrap();
        setIsEditing(false);
      } catch (error) {
        console.error("Profile Update Error:", error);
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="space-y-6 custom-surface p-6 rounded-2xl shadow-xl"
    >
      <div>
        <h3 className="text-lg font-semibold">Profile Information</h3>
      </div>

      <div className="flex items-center gap-4">
        <ProfilePhotoUploader />

        <div>
          <h4 className="text-base font-medium">
            {profile?.name || user?.name || "User"}
          </h4>

          <p className="text-xs text-slate-500">
            {profile?.email || user?.email}
          </p>
          {profile?.bio && (
            <p className="text-xs text-primary-500 line-clamp-2">
              Bio:- <span className="text-textColor">{profile?.bio || ""}</span>
            </p>
          )}

          <ProfileStatsBadges
            isPro={profileData?.user?.isPro}
            dayStreak={profileData?.stats?.dayStreak}
            xpPoints={profileData?.stats?.xpPoints}
            level={profileData?.stats?.level}
            percentile={profileData?.user?.percentile}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label className="my-2">Full Name</Label>
          <Input
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            disabled={!isEditing}
          />
        </div>

        <div>
          <Label className="my-2">Email</Label>
          <Input
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            disabled={!isEditing}
          />
        </div>

        <div>
          <Label className="my-2">Phone</Label>
          <Input
            name="phoneNumber"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            disabled={!isEditing}
          />
        </div>

        <div>
          <Label className="my-2">Role</Label>
          <Input value={profile?.role || user?.role || ""} disabled />
        </div>
      </div>

      <div>
        <Label className="my-2">Bio</Label>
        <Textarea
          name="bio"
          value={formik.values.bio}
          onChange={formik.handleChange}
          disabled={!isEditing}
        />
      </div>

      {!isEditing ? (
        <Button
          type="button"
          onClick={() => setIsEditing(true)}
          className="gap-2"
        >
          <Edit2 className="w-4 h-4" />
          Edit Profile
        </Button>
      ) : (
        <div className="flex gap-3">
          <Button type="submit" className="gap-2">
            <Save className="w-4 h-4" />
            Save Changes
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => {
              formik.resetForm();
              setIsEditing(false);
            }}
          >
            Cancel
          </Button>
        </div>
      )}
    </form>
  );
}
