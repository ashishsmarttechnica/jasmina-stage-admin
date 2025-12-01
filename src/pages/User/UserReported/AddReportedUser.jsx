import React, { useState } from 'react';
import DefaultLayout from '../../../layout/DefaultLayout';
import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useCreateReport from '../../../hooks/User/ReportedUser/useCreateReport';
// import useReportValidation from '../../../hooks/User/ReportedUser/useReportValidation';
import UserReportForm from '../../../components/Forms/UserReportForm';

const AddReportedUser = () => {
  const { handleCreateReport, loading } = useCreateReport();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    userId: '',
    reason: '',
    description: '',
    reportedUserId: '',
    reporterUserId: '',
    

  });

  // const { validateField, validateAllFields } = useReportValidation(formData, setErrors);

  const handleSubmit = (data) => {
    // if (validateAllFields()) {
    //   setErrors({});
    //   handleCreateReport(data);
    // }
    handleCreateReport(data);
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Add Reported User" />
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-1 table_no_overflow mb-2">
        <header className="flex justify-between items-center px-2">
          <h2 className="font-semibold text-slate-800 dark:text-white"></h2>
          <Button variant="contained" onClick={() => navigate('/reporteduser')}>
            View All Reported Users
          </Button>
        </header>
      </div>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <UserReportForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          isLoading={loading}
          errors={errors}
          setErrors={setErrors}
        />
      </div>
    </DefaultLayout>
  );
};

export default AddReportedUser;
