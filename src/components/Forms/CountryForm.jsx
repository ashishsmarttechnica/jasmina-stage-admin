import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Input, Toggle } from 'rsuite';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRoles } from '../../redux/actions/RoleAction';
import { getAlluser } from '../../redux/actions/UserAction';
const CountryForm = ({
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
        {/* Country Name */}
        <div className="col-span-12">
          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Country Name <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              placeholder="Enter Country Name"
              value={formData.country}
              onChange={(val) => setFormData({ ...formData, country: val })}
              className="w-full text-base rounded dark:bg-boxdark dark:text-white"
            />
            {errors?.country && (
              <span className="text-red-500 ml-1 text-sm">{errors.country}</span>
            )}
          </div>
        </div>

        {/* LGBTQ Friendly Switch */}
        <div className="col-span-12">
          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              LGBTQ Friendly
            </label>
            <div className="mt-2">
              <Toggle
                checked={formData.isLGBTQ}
                onChange={(val) => setFormData({ ...formData, isLGBTQ: val })}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center my-4.5">
        <Button variant="contained" type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : isEdit ? 'Update' : 'Submit'}
        </Button>
      </div>
    </form>
  );
};

export default CountryForm;
