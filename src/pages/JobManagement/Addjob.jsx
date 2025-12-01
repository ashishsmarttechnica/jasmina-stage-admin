import React, { useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useCreateSubscription from '../../hooks/Subscription/useCreateSubsciption';
import SubsciptionForm from '../../components/Forms/SubscriptionForm';
import useSubscriptionValidation from '../../hooks/Subscription/useSubscriptionValidation';

const AddJob = () => {
  const { handleCreateSubscription, loading } = useCreateSubscription();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    eligibility: '',
    isActive: true ,
    employeeRange: {
      min: '',
      max: '',
    },
  });

  const { validateField } = useSubscriptionValidation(formData, setErrors);

  const handleSubmit = (data) => {
    let validationErrors = {};

    Object.keys(formData).forEach((key) => {
      if (key === 'employeeRange') {
        const minError = validateField('employeeRange.min', formData.employeeRange.min);
        const maxError = validateField('employeeRange.max', formData.employeeRange.max);

        if (minError) validationErrors['employeeRange.min'] = minError;
        if (maxError) validationErrors['employeeRange.max'] = maxError;
      } else {
        const error = validateField(key, formData[key]);
        if (error) validationErrors[key] = error;
      }
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    handleCreateSubscription(data);
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Add Subscription" />
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-1 table_no_overflow mb-2">
        <header className="flex justify-between items-center px-2">
          <h2 className="font-semibold text-slate-800 dark:text-white"></h2>
          <Button variant="contained" onClick={() => navigate('/subscription')}>
            View All Subscriptions
          </Button>
        </header>
      </div>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <SubsciptionForm
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

export default AddJob;
