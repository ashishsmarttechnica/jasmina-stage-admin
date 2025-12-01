import React, { useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useCreateCountry from '../../hooks/Country/useCreateCountry';
import useCountryValidation from '../../hooks/Country/useCountryValidation';
import CountryForm from '../../components/Forms/CountryForm';
import TableSearch from '../../components/TableSearch';

const AddCountry = () => {
  const { handleCreateCountry, loading } = useCreateCountry();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    country: '',
    isLGBTQ: false
  });

  const { validateField } = useCountryValidation(formData, setErrors);

  const handleSubmit = () => {
    let validationErrors = {};

    // Validate all fields
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) validationErrors[key] = error;
    });

    // If there are validation errors, set them and return
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Clear any existing errors
    setErrors({});
    
    // Call API with validated data
    handleCreateCountry({
      country: formData.country,
      isLGBTQ: formData.isLGBTQ
    });
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Add Countries" />
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-1 table_no_overflow mb-2">
        <header className="flex justify-between items-center px-2">
          <h2 className="font-semibold text-slate-800 dark:text-white"></h2>
          <Button variant="contained" onClick={() => navigate('/country')}>
            View All Countrie
          </Button>
         
        </header>
      </div>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <CountryForm
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

export default AddCountry;
