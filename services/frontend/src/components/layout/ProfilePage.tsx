import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css';
import {
  Edit2,
  Camera,
  Lock,
  ShieldCheck,
  BookOpen,
  CheckCircle,
  Flame,
  Eye,
  EyeOff,
  X,
  LayoutDashboard,
  LogOut
} from 'lucide-react';
import { fetchCurrentUser } from '../../api/auth';
import { updateProfile, changePassword, uploadProfilePhoto } from '../../api/user';

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  level: string;
  bio: string;
  profileImage: string;
  coursesEnrolled: number;
  completed: number;
  streak: number;
}

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [profile, setProfile] = useState<ProfileData>({
    name: '',
    email: '',
    phone: '',
    level: '',
    bio: '',
    profileImage: '',
    coursesEnrolled: 0,
    completed: 0,
    streak: 0,
  });

  const [editedProfile, setEditedProfile] = useState<ProfileData>({
    ...profile,
  });

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          console.warn("No token found");
          return;
        }

        const response = await fetchCurrentUser(token);
        console.log("API response:", response);

        const user = response.user;
        if (!user) {
          console.warn("User data missing");
          return;
        }

        const storedUser = JSON.parse(localStorage.getItem("user") || "{}");

        const newProfile = {
          name: user.name || '',
          email: user.email || '',
          phone: '', // Not in User model yet
          level: user.learningPreferences?.currentSkillLevel || 'Beginner',
          bio: '', // Not in User model yet
          profileImage: (user as any).profilePhoto || storedUser.profileImage || '',
          coursesEnrolled: 12, // Placeholder until detailed stats API
          completed: 8, // Placeholder until detailed stats API
          streak: (user as any).streak?.current || 0,
        };

        setProfile(newProfile);
        setEditedProfile(newProfile);
      } catch (error) {
        console.error('Failed to load profile:', error);
      }
    };

    loadProfile(); //loading profile data on component mount
  }, []);
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordError, setPasswordError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setEditedProfile((prev) => ({ ...prev, level: value }));
  };

  const handleEditToggle = () => {
    if (isEditing) {
      setEditedProfile({ ...profile });
    }
    setIsEditing(!isEditing);
  };


  const handleSaveChanges = async () => {
    try {
      if (!editedProfile.name.trim()) {
        alert("Name cannot be empty");
        return;
      }

      const token = localStorage.getItem('accessToken');
      if (!token) return;

      await updateProfile(token, {
        name: editedProfile.name,
        // email: editedProfile.email, // Email change usually requires verification, skip for now
        // level: editedProfile.level,
      });

      setProfile({ ...editedProfile });
      setIsEditing(false);
      alert('Profile updated successfully');
    } catch (error: any) {
      alert(error.message || 'Failed to update profile');
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
    setPasswordError('');
  };

  const handlePasswordSubmit = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
      return;
    }

    try {
      const token = localStorage.getItem('accessToken');
      if (!token) throw new Error("Not authenticated");

      await changePassword(token, {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });

      alert('Password changed successfully');
      setShowPasswordModal(false);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error: any) {
      setPasswordError(error.message || 'Failed to change password');
    }
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      navigate('/');
    }
  };
  const toggleTwoFactor = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      if (!file.type.match('image.*')) {
        alert('Please select an image file');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }

      const token = localStorage.getItem('accessToken');
      if (!token) return;

      //  Instant preview
      const previewUrl = URL.createObjectURL(file);
      setEditedProfile((prev) => ({ ...prev, profileImage: previewUrl }));

      try {
        const response = await uploadProfilePhoto(token, file);

        console.log("Upload response:", response);


        const imageUrl =
          response.profilePhoto ||
          response.profileImage ||
          response.url;

        const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
        storedUser.profileImage = imageUrl;
        localStorage.setItem("user", JSON.stringify(storedUser));

        //update UI
        setProfile((prev) => ({ ...prev, profileImage: imageUrl }));
        setEditedProfile((prev) => ({ ...prev, profileImage: imageUrl }));

        alert("Profile photo updated!");

      } catch (error: any) {
        console.error("Upload error:", error);
        alert(error.message || "Upload failed");
      }
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Helper to safely get display values
  const getName = () => isEditing ? editedProfile.name : profile.name;
  const getEmail = () => isEditing ? editedProfile.email : profile.email;
  const getPhone = () => isEditing ? editedProfile.phone : profile.phone;
  const getLevel = () => isEditing ? editedProfile.level : profile.level;
  const getBio = () => isEditing ? editedProfile.bio : profile.bio;
  const getImage = () => isEditing ? editedProfile.profileImage : profile.profileImage;

  const learningLevels = ['Beginner', 'Intermediate', 'Advanced'];

  return (
    <div className="profile-overlay">
      <div className="profile-container">
        {/* Header */}
        <div className="profile-header">
          <h2>My Profile</h2>
          <div className="header-actions">
            <button
              className="back-to-dashboard-btn"
              onClick={() => navigate('/dashboard')}
              aria-label="Back to Dashboard"
            >
              <LayoutDashboard size={20} />
            </button>


          </div>
        </div>

        {/* this is scrollable  Area code */}
        <div className="profile-content">
          {/* Top Card */}
          <div className="profile-card">
            <div className="profile-info">
              <div className="avatar">
                {getImage() ? (
                  <img src={getImage()} alt="Profile" />
                ) : (
                  <div className="avatar-fallback">
                    {(getName() || '')
                      .slice(0, 2)
                      .toUpperCase()}
                  </div>
                )}
                <span className="status-dot"></span>
                {isEditing && (
                  <button className="camera-btn" onClick={triggerFileInput}>
                    <Camera size={16} />
                  </button>
                )}
              </div>
              <div className="profile-text">
                <h3>{getName()}</h3>
                <p>{getBio()}</p>
                {getEmail() && <small>{getEmail()}</small>}
              </div>
            </div>
            <div className='profile-actions'>


              <button className="edit-btn" onClick={handleEditToggle}>
                <Edit2 size={14} /> {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
              {/*logout button */}
              <button
                className="logout-btn"
                onClick={handleLogout}

              >
                <LogOut size={14} /> Logout
              </button>
            </div>
          </div>

          {/* Personal Info */}
          <div className="section-card">
            <h4>Personal Information</h4>
            <div className="info-grid">
              <div className="input-group">
                <label>Full Name</label>
                <input
                  name="name"
                  value={getName()}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                  className={isEditing ? 'editable' : ''}
                  placeholder="Enter your name"
                />
              </div>
              <div className="input-group">
                <label>Email</label>
                <input
                  name="email"
                  value={getEmail()}
                  onChange={handleInputChange}
                  readOnly={!isEditing} // Email usually readonly or needs separate flow
                  className={isEditing ? 'editable' : ''}
                  placeholder="Enter your email"
                  disabled // Disable email editing for now
                />
              </div>
              <div className="input-group">
                <label>Phone</label>
                <input
                  name="phone"
                  value={getPhone() || "Not available"}
                  onChange={handleInputChange}
                  readOnly
                // readOnly={!isEditing}
                // className={isEditing ? 'editable' : ''}
                // placeholder="Enter your phone number"
                />
              </div>
              <div className="input-group">
                <label>Learning Level</label>
                {isEditing ? (
                  <div className="select-wrapper">
                    <select
                      name="level"
                      value={getLevel()}
                      onChange={handleLevelChange}
                      className="editable select-input"
                    >
                      <option value="" disabled>
                        Select your level
                      </option>
                      {learningLevels.map((level) => (
                        <option key={level} value={level}>
                          {level}
                        </option>
                      ))}
                    </select>
                    <div className="select-arrow">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                      >
                        <path
                          d="M3 4.5L6 7.5L9 4.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                ) : (
                  <input
                    name="level"
                    value={getLevel()}
                    readOnly
                    className="readonly-input"
                    placeholder="Select learning level"
                  />
                )}
              </div>
            </div>
          </div>

          <div className="bottom-sections">
            {/* Security */}
            <div className="section-card security-card">
              <h4>Security</h4>
              <div className="security-list">
                <div className="security-item">
                  <div className="security-left">
                    <Lock size={18} />
                    <div>
                      <p>Password</p>
                      <span>Last changed 30 days ago</span>
                    </div>
                  </div>
                  <button
                    className="small-btn"
                    onClick={() => setShowPasswordModal(true)}
                  >
                    Change
                  </button>
                </div>
                <div className="security-item">
                  <div className="security-left">
                    <ShieldCheck size={18} />
                    <div>
                      <p>Two-Factor Authentication</p>
                      <span>Add an extra layer of security</span>
                    </div>
                  </div>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={twoFactorEnabled}
                      onChange={toggleTwoFactor}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
            </div>

            {/* Activity */}
            <div className="section-card activity-card">
              <h4>Activity Insights</h4>
              <div className="activity-grid">
                <div className="activity-item">
                  <BookOpen size={18} />
                  <div>
                    <p>Courses Enrolled</p>
                    <h3>{profile.coursesEnrolled}</h3>
                  </div>
                </div>
                <div className="activity-item">
                  <CheckCircle size={18} />
                  <div>
                    <p>Completed</p>
                    <h3>{profile.completed}</h3>
                  </div>
                </div>
                <div className="activity-item">
                  <Flame size={18} />
                  <div>
                    <p>Current Streak</p>
                    <h3>{profile.streak} days</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {isEditing && (
            <div className="action-buttons">
              <button className="save-btn" onClick={handleSaveChanges}>
                Save Changes
              </button>
              <button className="cancel-btn" onClick={handleEditToggle}>
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Change Password</h3>
              <button
                className="close-btn"
                onClick={() => setShowPasswordModal(false)}
              >
                <X size={18} />
              </button>
            </div>
            <div className="modal-content">
              <div className="password-field">
                <label>Current Password</label>
                <div className="password-input">
                  <input
                    type={showCurrentPassword ? 'text' : 'password'}
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    placeholder="Enter current password"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </button>
                </div>
              </div>
              <div className="password-field">
                <label>New Password</label>
                <div className="password-input">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    placeholder="Enter new password"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <div className="password-field">
                <label>Confirm New Password</label>
                <div className="password-input">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    placeholder="Confirm new password"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </button>
                </div>
              </div>
              {passwordError && (
                <div className="error-message">{passwordError}</div>
              )}
            </div>
            <div className="modal-footer">
              <button className="save-btn" onClick={handlePasswordSubmit}>
                Change Password
              </button>
              <button
                className="cancel-btn"
                onClick={() => setShowPasswordModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hidden file input for image upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageUpload}
        accept="image/*"
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default ProfilePage;