import React, { useEffect, useState } from 'react';
import { Modal } from 'rsuite';
import { Button } from '@mui/material';
import { FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { axiosClient } from '../axios/axios';
import Swal from 'sweetalert2';

const ChangePasswordModal = ({ open, onClose, userId, userDetail }) => {
    console.log(userDetail, "userDetail");
    
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const validateForm = () => {
    if (!formData.currentPassword) {
      Swal.fire('Error', 'Current password is required', 'error');
      return false;
    }
    if (!formData.newPassword) {
      Swal.fire('Error', 'New password is required', 'error');
      return false;
    }
    if (formData.newPassword.length < 4) {
      Swal.fire('Error', 'New password must be at least 4 characters long', 'error');
      return false;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      Swal.fire('Error', 'New password and confirm password do not match', 'error');
      return false;
    }
    if (formData.currentPassword === formData.newPassword) {
      Swal.fire('Error', 'New password must be different from current password', 'error');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await axiosClient.put('/resetPassword', {
        id: userId,
        password: formData.newPassword,
        currentPassword: formData.currentPassword,
        cpassword: formData.confirmPassword
      });

      if (response.data.success) {
        Swal.fire('Success', 'Password changed successfully!', 'success');
        handleClose();
      } else {
        Swal.fire('Error', response.data.message || 'Failed to change password', 'error');
      }
    } catch (error) {
      console.error('Error changing password:', error);
      const errorMessage = error.response?.data?.message || 'Failed to change password';
      Swal.fire('Error', errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setShowPasswords({
      current: false,
      new: false,
      confirm: false
    });
    onClose();
  };
  useEffect(() => {
    const wrapper = document.querySelector('.rs-modal-wrapper');
    if (wrapper) {
      wrapper.classList.add('custom-center-model');
    }

    // Clean up when unmount
    return () => {
      if (wrapper) {
        wrapper.classList.remove('custom-center-model');
      }
    };
  }, [open]);

  return (
    <Modal size="sm" open={open} onClose={handleClose} className="modelx">
      <Modal.Header>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
          <FaLock className="text-primary" />
          Change Password
        </h2>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-md font-medium text-gray-600 dark:text-gray-400"> Account: {userDetail?.email}</h2>
          {/* Current Password */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">
              Current Password *
            </label>
            <div className="relative">
              <input
                type={showPasswords.current ? 'text' : 'password'}
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleInputChange}
                className="w-full px-4 py-3 pr-12 border border-slate-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                placeholder="Enter current password"
                required
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('current')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                {showPasswords.current ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">
              New Password *
            </label>
            <div className="relative">
              <input
                type={showPasswords.new ? 'text' : 'password'}
                name="newPassword"
                value={formData.newPassword}
                onChange={handleInputChange}
                className="w-full px-4 py-3 pr-12 border border-slate-300 dark:border-gray-600 rounded-lg  focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Enter new password"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('new')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                {showPasswords.new ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">
              Confirm New Password *
            </label>
            <div className="relative">
              <input
                type={showPasswords.confirm ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full px-4 py-3 pr-12 border border-slate-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Confirm new password"
                required
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('confirm')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                {showPasswords.confirm ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <div className="flex justify-end gap-2 items-center mt-2">
          <Button onClick={handleClose} variant="outlined" disabled={loading}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained" 
            disabled={loading}
            className="bg-primary hover:bg-primary-dark"
          >
            {loading ? 'Changing...' : 'Change Password'}
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default ChangePasswordModal;
