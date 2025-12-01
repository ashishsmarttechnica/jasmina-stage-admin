import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Input, InputGroup, SelectPicker } from 'rsuite';

//
const SubsciptionForm = ({
  formData,
  setFormData,
  onSubmit,
  isLoading,
  errors,
  isEdit,
}) => {
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
        {/* Admin Name */}

        {/* Email */}
        <div className="col-span-6">
          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Title <span className="text-red-500">*</span>
            </label>
            <Input
              type="title"
              placeholder="Enter title"
              value={formData.title}
              onChange={(val) => setFormData({ ...formData, title: val })}
              className="w-full text-base rounded  dark:bg-boxdark dark:text-white"
            />
            {errors?.title && (
              <span className="text-red-500 ml-1 text-sm">{errors.title}</span>
            )}
          </div>
        </div>
        <div className="col-span-6">
          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Price <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              placeholder="Enter Name"
              value={formData.price}
              onChange={(val) => setFormData({ ...formData, price: val })}
              className="w-full text-base rounded  dark:bg-boxdark dark:text-white"
            />
            {errors?.price && (
              <span className="text-red-500 ml-1 text-sm">{errors.price}</span>
            )}
          </div>
        </div>

        <div className="col-span-6">
          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Employee Range Minimum <span className="text-red-500">*</span>
            </label>
            <Input
              type="tel"
              placeholder="Enter Employee Range Minimum"
              value={formData.employeeRange.min}
              onChange={(val) =>
                setFormData({
                  ...formData,
                  employeeRange: {
                    ...formData.employeeRange,
                    min: val,
                  },
                })
              }
              className="w-full text-base rounded dark:bg-boxdark dark:text-white"
            />
            {errors?.['employeeRange.min'] && (
              <span className="text-red-500 ml-1 text-sm">
                {errors['employeeRange.min']}
              </span>
            )}
          </div>
        </div>
        <div className="col-span-6">
          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Employee Range Maximum <span className="text-red-500">*</span>
            </label>
            <Input
              type="number"
              placeholder="Enter Employee Range Maximum"
              value={formData.employeeRange.max}
              onChange={(val) =>
                setFormData({
                  ...formData,
                  employeeRange: {
                    ...formData.employeeRange,
                    max: val,
                  },
                })
              }
              className="w-full text-base rounded dark:bg-boxdark dark:text-white"
            />
            {errors?.['employeeRange.max'] && (
              <span className="text-red-500 ml-1 text-sm">
                {errors['employeeRange.max']}
              </span>
            )}
          </div>
        </div>
        <div className="col-span-8">
          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Eligibility <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              placeholder="Enter Eligibility"
              value={formData.eligibility}
              onChange={(val) => setFormData({ ...formData, eligibility: val })}
              className="w-full text-base rounded  dark:bg-boxdark dark:text-white"
            />
            {errors?.eligibility && (
              <span className="text-red-500 ml-1 text-sm">
                {errors.eligibility}
              </span>
            )}
          </div>
        </div>
        <div className="col-span-12">
          <div className="mb-4.5 col-span-12">
            <label
              htmlFor="status"
              className="mb-2.5 block text-black dark:text-white"
            >
              Status
            </label>
            <div className="flex gap-5">
              <label htmlFor="status-inactive" className="flex items-center">
                <input
                  type="radio"
                  id="status-inactive"
                  name="status"
                  value="isActive"
                  checked={!formData.isActive}
                  onChange={() => setFormData({ ...formData, isActive: false })}
                  className="text-primary"
                />
                <span className="ml-2 text-black dark:text-white">
                  Inactive
                </span>
              </label>
              <label htmlFor="status-active" className="flex items-center">
                <input
                  type="radio"
                  id="status-active"
                  name="status"
                  value="isActive"
                  checked={formData.isActive}
                  onChange={() => setFormData({ ...formData, isActive: true })}
                  className="text-primary"
                />
                <span className="ml-2 text-black dark:text-white">Active</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center my-4.5">
        <Button variant="contained" type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Submit'}
        </Button>
      </div>
    </form>
  );
};

export default SubsciptionForm;
