import React, { useState, useRef } from 'react';
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
} from 'lucide-react';

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
    coursesEnrolled: 12,
    completed: 8,
    streak: 15,
  });

  const [editedProfile, setEditedProfile] = useState<ProfileData>({
    ...profile,
  });
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

  const handleSaveChanges = () => {
    setProfile({ ...editedProfile });
    setIsEditing(false);
    alert('Profile updated successfully');
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
    setPasswordError('');
  };

  const handlePasswordSubmit = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
      return;
    }

    alert('Password changed successfully');
    setShowPasswordModal(false);
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };

  const toggleTwoFactor = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
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

      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        setEditedProfile((prev) => ({ ...prev, profileImage: imageUrl }));
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const displayValue = (field: keyof ProfileData) =>
    isEditing ? editedProfile[field] : profile[field];

  const displayText = (value: string) => value || '';

  const displayEmail = isEditing ? editedProfile.email : profile.email;

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

        {/* Scrollable  Area */}
        <div className="profile-content">
          {/* Top Card */}
          <div className="profile-card">
            <div className="profile-info">
              <div className="avatar">
                {displayValue('profileImage') ? (
                  <img src={displayValue('profileImage')} alt="Profile" />
                ) : (
                  <div className="avatar-fallback">
                    {((displayValue('name') as string) || '')
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
                <h3>{displayText(displayValue('name') as string)}</h3>
                <p>{displayText(displayValue('bio') as string)}</p>
                {displayEmail && <small>{displayEmail}</small>}
              </div>
            </div>
            <button className="edit-btn" onClick={handleEditToggle}>
              <Edit2 size={14} /> {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>

          {/* Personal Info */}
          <div className="section-card">
            <h4>Personal Information</h4>
            <div className="info-grid">
              <div className="input-group">
                <label>Full Name</label>
                <input
                  name="name"
                  value={displayValue('name')}
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
                  value={displayValue('email')}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                  className={isEditing ? 'editable' : ''}
                  placeholder="Enter your email"
                />
              </div>
              <div className="input-group">
                <label>Phone</label>
                <input
                  name="phone"
                  value={displayValue('phone')}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                  className={isEditing ? 'editable' : ''}
                  placeholder="Enter your phone number"
                />
              </div>
              <div className="input-group">
                <label>Learning Level</label>
                {isEditing ? (
                  <div className="select-wrapper">
                    <select
                      name="level"
                      value={displayValue('level')}
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
                    value={displayValue('level')}
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
