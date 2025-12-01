import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Input } from 'rsuite';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRoles } from '../../redux/actions/RoleAction';
import { getAlluser } from '../../redux/actions/UserAction';
const UserForm = ({
  formData,
  setFormData,
  onSubmit,
  isLoading,
  errors,
  isEdit,
}) => {
  // const roles = ['author', 'publisher', 'reader']; // Static roles list

  return (
    <form
      className="edit-user-form"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(formData);
      }}
      noValidate
    >
      <div className="lg:grid grid-cols-12 gap-x-10 p-3 px-5">
        {/* First Name */}
        <div className="col-span-6">
          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Full Name <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              placeholder="Enter Name"
              value={formData.fullName}
              onChange={(val) => setFormData({ ...formData, fullName: val })}
              className="w-full text-base rounded dark:bg-boxdark dark:text-white"
            />
            {errors?.fullName && (
              <span className="text-red-500 ml-1 text-sm">
                {errors.fullName}
              </span>
            )}
          </div>
        </div>

        {/* Last Name */}
        <div className="col-span-6">
          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              User Name <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              placeholder="Enter Last Name"
              value={formData.userName}
              onChange={(val) => setFormData({ ...formData, userName: val })}
              className="w-full text-base rounded dark:bg-boxdark dark:text-white"
            />
            {errors?.userName && (
              <span className="text-red-500 ml-1 text-sm">
                {errors.userName}
              </span>
            )}
          </div>
        </div>

        {/* Email */}
        <div className="col-span-6">
          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Email <span className="text-red-500">*</span>
            </label>
            <Input
              type="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={(val) => setFormData({ ...formData, email: val })}
              className="w-full text-base rounded dark:bg-boxdark dark:text-white"
            />
            {errors?.email && (
              <span className="text-red-500 ml-1 text-sm">{errors.email}</span>
            )}
          </div>
        </div>
        <div className="col-span-6">
          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              gender <span className="text-red-500">*</span>
            </label>
            <Input
              type="gender"
              placeholder="Enter gender"
              value={formData.gender}
              onChange={(val) => setFormData({ ...formData, gender: val })}
              className="w-full text-base rounded dark:bg-boxdark dark:text-white"
            />
            {errors?.gender && (
              <span className="text-red-500 ml-1 text-sm">{errors.gender}</span>
            )}
          </div>
        </div>
        <div className="col-span-6">
          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              linkedin <span className="text-red-500">*</span>
            </label>
            <Input
              type="linkedin"
              placeholder="Enter linkedin"
              value={formData.linkedin}
              onChange={(val) => setFormData({ ...formData, linkedin: val })}
              className="w-full text-base rounded dark:bg-boxdark dark:text-white"
            />
            {errors?.linkedin && (
              <span className="text-red-500 ml-1 text-sm">
                {errors.linkedin}
              </span>
            )}
          </div>
        </div>
        <div className="col-span-6">
          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              location <span className="text-red-500">*</span>
            </label>
            <Input
              type="location"
              placeholder="Enter location"
              value={formData.location}
              onChange={(val) => setFormData({ ...formData, location: val })}
              className="w-full text-base rounded dark:bg-boxdark dark:text-white"
            />
            {errors?.location && (
              <span className="text-red-500 ml-1 text-sm">
                {errors.location}
              </span>
            )}
          </div>
        </div>
        <div className="col-span-6">
          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              phone <span className="text-red-500">*</span>
            </label>
            <Input
              type="phone"
              placeholder="Enter phone"
              value={formData.phone}
              onChange={(val) => setFormData({ ...formData, phone: val })}
              className="w-full text-base rounded dark:bg-boxdark dark:text-white"
            />
            {errors?.phone && (
              <span className="text-red-500 ml-1 text-sm">
                {errors.phone}
              </span>
            )}
          </div>
        </div>
        {/* <div className="mb-4.5 col-span-12">
          <label
            htmlFor="status"
            className="mb-2.5 block text-black dark:text-white"
          >
            Status
          </label>
          <div className="flex  gap-5">
            <label>
              <input
                type="radio"
                name="status"
                checked={!formData.isBlocked}
                onChange={() => setFormData({ ...formData, isBlocked: false })} // Set status to inactive
              />
              <span className="ml-2 text-black dark:text-white">
                Unblocked{' '}
              </span>
            </label>
            <label>
              <input
                type="radio"
                name="status"
                checked={formData.isBlocked}
                onChange={() => setFormData({ ...formData, isBlocked: true })} // Set status to active

              />
              <span className="ml-2 text-black dark:text-white">Blocked </span>
            </label>
          </div>
        </div>
        {isEdit && formData.isBlocked && (
          <div className="col-span-6">
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Blocked Reason <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                placeholder="Enter  Blocked Reason"
                value={formData.notes}
                onChange={(val) => setFormData({ ...formData, notes: val })}
                className="w-full text-base rounded dark:bg-boxdark dark:text-white"
              />
              {errors?.notes && (
                <span className="text-red-500 ml-1 text-sm">
                  {errors.notes}
                </span>
              )}
            </div>
          </div>
        )} */}
        {/* Role */}
        {/* <div className="col-span-6">
          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Role <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full text-base rounded dark:bg-boxdark dark:text-white"
            >
              <option value="">Select Role</option>
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </option>
              ))}
            </select>
            {errors?.role && (
              <span className="text-red-500 ml-1 text-sm">{errors.role}</span>
            )}
          </div>
        </div> */}
      </div>

      <div className="flex justify-center my-4.5">
        <Button variant="contained" type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Submit'}
        </Button>
      </div>
    </form>
  );
};

export default UserForm;
