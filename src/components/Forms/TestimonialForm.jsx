import { Button } from '@mui/material';
import React from 'react';
import { Input } from 'rsuite';
import { Toggle } from 'rsuite';

const TestimonialForm = ({
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
        {/* Name */}
        <div className="col-span-6">
          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Name <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              placeholder="Enter Name"
              value={formData.name}
              onChange={(val) => setFormData({ ...formData, name: val })}
              className="w-full text-base rounded dark:bg-boxdark dark:text-white"
            />
            {errors?.name && (
              <span className="text-red-500 ml-1 text-sm">
                {errors.name}
              </span>
            )}
          </div>
        </div>

        {/* Message */}
        <div className="col-span-12">
          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              placeholder="Enter Message"
              value={formData.testimonial}
              onChange={(e) => setFormData({ ...formData, testimonial: e.target.value })}
              rows="4"
              className="w-full text-base rounded border border-stroke bg-transparent py-2 px-4 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-boxdark dark:text-white dark:focus:border-primary"
            />
            {errors?.testimonial && (
              <span className="text-red-500 ml-1 text-sm">
                {errors.testimonial}
              </span>
            )}
          </div>
        </div>

        {/* Image */}
        <div className="col-span-6">
          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Image (Optional)
            </label>
            <Input
              type="text"
              placeholder="Enter Image URL or Path (Optional)"
              value={formData.image}
              onChange={(val) => setFormData({ ...formData, image: val })}
              className="w-full text-base rounded dark:bg-boxdark dark:text-white"
            />
            {errors?.image && (
              <span className="text-red-500 ml-1 text-sm">{errors.image}</span>
            )}
          </div>
        </div>

        {/* Status */}
        <div className="col-span-6">
          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Status <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center mt-2">
              <Toggle
                checked={formData.isActive}
                onChange={(val) => setFormData({ ...formData, isActive: val })}
              />
              <span className="ml-3 text-black dark:text-white">
                {formData.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
            {errors?.isActive && (
              <span className="text-red-500 ml-1 text-sm">{errors.isActive}</span>
            )}
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

export default TestimonialForm;
        