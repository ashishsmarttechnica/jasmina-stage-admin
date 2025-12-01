import React, { useState } from 'react';

const UserReportForm = () => {
  const [formData, setFormData] = useState({
    reportedUserId: '',
    reporterUserId: '',
    reason: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Reported User ID
          </label>
          <input
            type="text"
            name="reportedUserId"
            value={formData.reportedUserId}
            onChange={handleChange}
            className="w-full rounded-lg border border-stroke bg-transparent py-2 px-4 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            placeholder="Enter reported user ID"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Reporter User ID
          </label>
          <input
            type="text"
            name="reporterUserId"
            value={formData.reporterUserId}
            onChange={handleChange}
            className="w-full rounded-lg border border-stroke bg-transparent py-2 px-4 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            placeholder="Enter reporter user ID"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Reason
          </label>
          <input
            type="text"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            className="w-full rounded-lg border border-stroke bg-transparent py-2 px-4 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            placeholder="Enter reason"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full rounded-lg border border-stroke bg-transparent py-2 px-4 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            placeholder="Enter description"
          />
        </div>

        <button
          type="submit"
          className="flex justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
        >
          Submit Report
        </button>
      </form>
    </div>
  );
};

export default UserReportForm;
