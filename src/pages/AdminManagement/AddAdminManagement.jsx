import React, { useEffect, useState } from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AdminManagementForm from "../../components/Forms/AdminManagementForm";
import useCreateAdminManagement from "../../hooks/AdminManagement/useCreateAdminManagement";
import useAdminValidation from "../../hooks/AdminManagement/useAdminValidation";

const AddAdminManagement = () => {
  const { handleCreateAdmin, loading } = useCreateAdminManagement();

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    permissions: [],
  });

  const { validateField } = useAdminValidation(formData, setErrors);

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
    handleCreateAdmin(data);
    setErrors({});
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Add Admin" />
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-1 table_no_overflow mb-2">
        <header className="flex justify-between items-center px-2">
          <h2 className="font-semibold text-slate-800 dark:text-white"></h2>
          <Button
            variant="contained"
            onClick={() => navigate("/admin-management")}
          >
            View All Admin
          </Button>
        </header>
      </div>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <AdminManagementForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit} // Pass submit handler
          isLoading={loading} // Pass loading state
          errors={errors} // Pass validation errors
          setErrors={setErrors} // Allow form to update errors
        />
      </div>
    </DefaultLayout>
  );
};

export default AddAdminManagement;
