import React, { useEffect, useState } from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import useEditTestimonial from "../../hooks/Testimonial/useEditTestimonial";
import TestimonialForm from "../../components/Forms/TestimonialForm";
import useTestimonialValidation from "../../hooks/Testimonial/useTestimonialValidation";

const EditTestimonial = () => {
  const { handleEditTestimonial, loading } = useEditTestimonial();
  const location = useLocation();
  const data = location.state;
  const perentId = data._id;
  

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: data?.name || "",
    testimonial: data?.message || data?.testimonial || "",
    image: data?.image || "",
    isActive: data?.status !== undefined ? data?.status : (data?.isActive || false),
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
    
    const submitData = new FormData();
    submitData.append("id", perentId);
    submitData.append("name", formData.name);
    submitData.append("message", formData.testimonial);
    submitData.append("status", String(formData.isActive));
    
    // Append image only if it's a file (newly selected)
    if (formData.image instanceof File) {
      submitData.append("testmonialImg", formData.image);
    }

    handleEditTestimonial(perentId, submitData);
  };
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Edit Testimonial" />
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-1 table_no_overflow mb-2">
        <header className="flex justify-between items-center px-2">
          <h2 className="font-semibold text-slate-800 dark:text-white"></h2>
          <Button
            variant="contained"
            onClick={() => navigate("/testimonial")}
          >
            View All Testimonials
          </Button>
        </header>
      </div>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <TestimonialForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit} // Pass submit handler
          isLoading={loading} // Pass loading state
          errors={errors} // Pass validation errors
          setErrors={setErrors} // Allow form to update errors
          isEdit={true}
        />
      </div>
    </DefaultLayout>
  );
};

export default EditTestimonial;
