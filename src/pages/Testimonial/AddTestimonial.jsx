import React, { useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useCreateTestimonial from '../../hooks/Testimonial/useCreateTestimonial';
import TestimonialForm from '../../components/Forms/TestimonialForm.jsx';
import useTestimonialValidation from '../../hooks/Testimonial/useTestimonialValidation';

const AddTestimonial = () => {
  const { handleCreateTestimonial, loading } = useCreateTestimonial();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    testimonial: '',
    image: '',
    isActive: true ,
  });

  const { validateField } = useTestimonialValidation(formData, setErrors);

  const handleSubmit = (data) => {
    let validationErrors = {};

    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) validationErrors[key] = error;
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    // Map testimonial to message if API expects message
    const submitData = {
      ...formData,
      message: formData.testimonial,
      status: formData.isActive,
    };
    handleCreateTestimonial(submitData);
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Add Testimonial" />
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-1 table_no_overflow mb-2">
        <header className="flex justify-between items-center px-2">
          <h2 className="font-semibold text-slate-800 dark:text-white"></h2>
          <Button variant="contained" onClick={() => navigate('/testimonial')}>
            View All Testimonials
          </Button>
        </header>
      </div>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <TestimonialForm
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

export default AddTestimonial;
