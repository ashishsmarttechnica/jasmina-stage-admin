import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Modal } from 'rsuite';
import { useDispatch } from 'react-redux';
import { createAdminPassword } from '../redux/actions/AdminAction';
import { toast } from 'react-toastify';
import { RiEyeOffFill } from 'react-icons/ri';
import { HiEye } from 'react-icons/hi';

const AdminModalPopup = ({ open, onClose, adminId }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  //  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!oldPassword) newErrors.oldPassword = 'Old password is required.';
    if (!newPassword) newErrors.newPassword = 'New password is required.';
    else if (newPassword.length < 4)
      newErrors.newPassword = 'Password must be at least 4 characters.';
    if (!confirmPassword)
      newErrors.confirmPassword = 'Please confirm your new password.';
    else if (newPassword !== confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match.';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    const formData = { adminId, oldPassword, newPassword, confirmPassword };

    const result = await dispatch(createAdminPassword(formData));
    setLoading(false);

    if (result?.success) {
      handleClose();
      toast.success(result.message || 'Password updated successfully!');
    } else {
      toast.error(result?.message || 'Something went wrong');
    }
  };

  const handleClose = () => {
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setErrors({});
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
    <Modal size="xs" open={open} onClose={handleClose} className="modelx">
      <Modal.Header>
        <Modal.Title>
          <p className="mb-5 font-medium">Password Change</p>
        </Modal.Title>
      </Modal.Header>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-3 dark:text-white">
          <div className="">
            <label
              htmlFor="oldPassword"
              className="text-sm  font-medium text-gray-600"
            >
              Old Password
            </label>
            <div className="relative">
              <input
                type={showOldPassword ? 'text' : 'password'}
                id="oldPassword"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className={`p-1 w-full rounded-sm border ${
                  errors.oldPassword ? 'border-red-500' : 'border-slate-200'
                }`}
              />
              <div
                className="absolute right-1 top-[50%] mx-2 -translate-y-1/2  cursor-pointer"
                onClick={() => setShowOldPassword(!showOldPassword)}
              >
                {showOldPassword ? (
                  <HiEye className="text-[18px]" />
                ) : (
                  <RiEyeOffFill className="text-[18px] text-gray-500" />
                )}
              </div>
            </div>
            {errors.oldPassword && (
              <p className="text-red-500 text-xs">{errors.oldPassword}</p>
            )}
          </div>
          <div className="">
            <label
              htmlFor="newPassword"
              className="text-sm font-medium text-gray-600"
            >
              New Password
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? 'text' : 'password'}
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={`p-1 w-full rounded-sm border ${
                  errors.newPassword ? 'border-red-500' : 'border-slate-200'
                }`}
              />
              <div
                className="absolute right-1 mx-2 top-[50%] -translate-y-1/2 cursor-pointer"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? (
                  <HiEye className="text-[18px]" />
                ) : (
                  <RiEyeOffFill className="text-[18px] text-gray-500" />
                )}
              </div>
            </div>
            {errors.newPassword && (
              <p className="text-red-500 text-xs">{errors.newPassword}</p>
            )}
          </div>
          <div className="relative">
            <label
              htmlFor="confirmPassword"
              className="text-sm font-medium text-gray-600"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`p-1 w-full rounded-sm border ${
                  errors.confirmPassword ? 'border-red-500' : 'border-slate-200'
                }`}
              />
              <div
                className="absolute right-1 top-[50%] mx-2 -translate-y-1/2 cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <HiEye className="text-[18px]" />
                ) : (
                  <RiEyeOffFill className="text-[18px] text-gray-500" />
                )}
              </div>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs">{errors.confirmPassword}</p>
            )}
          </div>
          <div className="flex justify-center items-center">
            <button
              type="submit"
              disabled={loading}
              className={`${
                loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
              } bg-blue-600 text-white text-sm font-medium px-3 py-2 my-3 rounded-md transition`}
            >
              {loading ? 'Updating...' : 'Submit'}
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default AdminModalPopup;
