import React, { useEffect, useState } from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import useEditSubscription from "../../hooks/Subscription/useEditSubscription";
import SubsciptionForm from "../../components/Forms/SubscriptionForm";
import useSubscriptionValidation from "../../hooks/Subscription/useSubscriptionValidation";

const EditJob = () => {
  const { handleEditSubscription, loading } = useEditSubscription();
  const location = useLocation();
  const data = location.state;
  const perentId = data._id;
  

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    title: data?.title || "",
    price: data?.price || "",
    eligibility: data?.eligibility || "",
    isActive: data?.isActive || false,
    employeeRange: {
      min: data?.employeeRange?.min || "",
      max: data?.employeeRange?.max || "",
    },
  });

  const { validateField } = useSubscriptionValidation(formData, setErrors);

  const handleSubmit = (data) => {
    let validationErrors = {};
    Object.keys(formData).forEach((key) => {
      let error = validateField(key, formData[key], formData);
      if (error) validationErrors[key] = error;
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    handleEditSubscription(perentId, data);
    setErrors({});
  };
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Edit Subscription" />
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-1 table_no_overflow mb-2">
        <header className="flex justify-between items-center px-2">
          <h2 className="font-semibold text-slate-800 dark:text-white"></h2>
          <Button
            variant="contained"
            onClick={() => navigate("/subscription")}
          >
            View All Subscription
          </Button>
        </header>
      </div>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <SubsciptionForm
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

export default EditJob;
