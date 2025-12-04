import { Button } from '@mui/material';
import React from 'react';
import { Input } from 'rsuite';

const JobForm = ({
  formData,
  setFormData,
  onSubmit,
  loading = false,
  errors = {},
}) => {
  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

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
        {/* Job Title */}
        <div className="col-span-6">
          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Job Title <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              placeholder="Enter Job Title"
              value={formData.jobTitle}
              onChange={(val) => handleChange('jobTitle', val)}
              className="w-full text-base rounded dark:bg-boxdark dark:text-white"
            />
            {errors?.jobTitle && (
              <span className="text-red-500 ml-1 text-sm">
                {errors.jobTitle}
              </span>
            )}
          </div>
        </div>

        {/* Department */}
        <div className="col-span-6">
          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Department
            </label>
            <Input
              type="text"
              placeholder="Enter Department"
              value={formData.department}
              onChange={(val) => handleChange('department', val)}
              className="w-full text-base rounded dark:bg-boxdark dark:text-white"
            />
          </div>
        </div>

        {/* Employee Type */}
        <div className="col-span-6">
          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Employee Type
            </label>
            <Input
              type="text"
              placeholder="Enter Employee Type"
              value={formData.employeeType}
              onChange={(val) => handleChange('employeeType', val)}
              className="w-full text-base rounded dark:bg-boxdark dark:text-white"
            />
          </div>
        </div>

        {/* Job Location */}
        <div className="col-span-6">
          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Job Location
            </label>
            <Input
              type="text"
              placeholder="Enter Job Location"
              value={formData.jobLocation}
              onChange={(val) => handleChange('jobLocation', val)}
              className="w-full text-base rounded dark:bg-boxdark dark:text-white"
            />
          </div>
        </div>

        {/* Seniority Level */}
        <div className="col-span-6">
          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Seniority Level
            </label>
            <Input
              type="text"
              placeholder="Enter Seniority Level"
              value={formData.seniorityLevel}
              onChange={(val) => handleChange('seniorityLevel', val)}
              className="w-full text-base rounded dark:bg-boxdark dark:text-white"
            />
          </div>
        </div>

        {/* Salary Range */}
        <div className="col-span-6">
          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Salary Range
            </label>
            <Input
              type="text"
              placeholder="e.g. 20000-30000 INR"
              value={formData.salaryRange}
              onChange={(val) => handleChange('salaryRange', val)}
              className="w-full text-base rounded dark:bg-boxdark dark:text-white"
            />
          </div>
        </div>

        {/* Work Hours */}
        <div className="col-span-6">
          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Work Hours
            </label>
            <Input
              type="text"
              placeholder="e.g. 09:00 - 18:00"
              value={formData.workHours}
              onChange={(val) => handleChange('workHours', val)}
              className="w-full text-base rounded dark:bg-boxdark dark:text-white"
            />
          </div>
        </div>

        {/* Education */}
        <div className="col-span-6">
          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Education
            </label>
            <Input
              type="text"
              placeholder="Enter Education (e.g. bachelor)"
              value={formData.education}
              onChange={(val) => handleChange('education', val)}
              className="w-full text-base rounded dark:bg-boxdark dark:text-white"
            />
          </div>
        </div>

        {/* Experience */}
        <div className="col-span-6">
          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Experience (years)
            </label>
            <Input
              type="number"
              min={0}
              placeholder="Enter Experience"
              value={formData.experience}
              onChange={(val) => handleChange('experience', val)}
              className="w-full text-base rounded dark:bg-boxdark dark:text-white"
            />
          </div>
        </div>

        {/* Contact Number */}
        <div className="col-span-6">
          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Contact Number
            </label>
            <Input
              type="text"
              placeholder="Enter Contact Number"
              value={formData.contactNumber}
              onChange={(val) => handleChange('contactNumber', val)}
              className="w-full text-base rounded dark:bg-boxdark dark:text-white"
            />
          </div>
        </div>

        {/* Status */}
        <div className="col-span-6">
          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => handleChange('status', e.target.value)}
              className="w-full text-base rounded border border-stroke px-3 py-2 dark:bg-boxdark dark:text-white"
            >
              <option value={1}>Active</option>
              <option value={0}>Inactive</option>
            </select>
          </div>
        </div>

        {/* Deadline */}
        <div className="col-span-6">
          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Deadline
            </label>
            <Input
              type="date"
              value={formData.deadline}
              onChange={(val) => handleChange('deadline', val)}
              className="w-full text-base rounded dark:bg-boxdark dark:text-white"
            />
          </div>
        </div>

        {/* Apply Via */}
        <div className="col-span-6">
          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Apply Via
            </label>
            <Input
              type="text"
              placeholder="Enter Apply Via Details"
              value={formData.applyVia}
              onChange={(val) => handleChange('applyVia', val)}
              className="w-full text-base rounded dark:bg-boxdark dark:text-white"
            />
          </div>
        </div>

        {/* Career Website */}
        <div className="col-span-6">
          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Career Website
            </label>
            <Input
              type="url"
              placeholder="https://example.com"
              value={formData.careerWebsite}
              onChange={(val) => handleChange('careerWebsite', val)}
              className="w-full text-base rounded dark:bg-boxdark dark:text-white"
            />
          </div>
        </div>

        {/* Required Languages */}
        <div className="col-span-12">
          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Required Languages (comma separated)
            </label>
            <Input
              as="textarea"
              rows={2}
              placeholder="e.g. English, Hindi"
              value={formData.requiredLanguages}
              onChange={(val) => handleChange('requiredLanguages', val)}
              className="w-full text-base rounded dark:bg-boxdark dark:text-white"
            />
          </div>
        </div>

        {/* Required Skills (comma separated) */}
        <div className="col-span-12">
          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Required Skills (comma separated)
            </label>
            <Input
              as="textarea"
              rows={2}
              placeholder="e.g. Node.js, Python, Java"
              value={formData.requiredSkills}
              onChange={(val) => handleChange('requiredSkills', val)}
              className="w-full text-base rounded dark:bg-boxdark dark:text-white"
            />
          </div>
        </div>

        {/* Description */}
        <div className="col-span-12">
          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Description (HTML allowed)
            </label>
            <Input
              as="textarea"
              rows={4}
              placeholder="Enter job description"
              value={formData.description}
              onChange={(val) => handleChange('description', val)}
              className="w-full text-base rounded dark:bg-boxdark dark:text-white"
            />
          </div>
        </div>

        {/* Responsibilities */}
        <div className="col-span-12">
          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Responsibilities (HTML allowed)
            </label>
            <Input
              as="textarea"
              rows={4}
              placeholder="Enter job responsibilities"
              value={formData.responsibilities}
              onChange={(val) => handleChange('responsibilities', val)}
              className="w-full text-base rounded dark:bg-boxdark dark:text-white"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center my-4.5">
        <Button variant="contained" type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Submit'}
        </Button>
      </div>
    </form>
  );
};

export default JobForm;
