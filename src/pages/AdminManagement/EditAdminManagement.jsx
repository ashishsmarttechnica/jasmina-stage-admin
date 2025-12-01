import React, { useEffect, useState } from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import AdminManagementForm from "../../components/Forms/AdminManagementForm";
import useAdminValidation from "../../hooks/AdminManagement/useAdminValidation";
import useEditAdminManagement from "../../hooks/AdminManagement/useEditAdminManagement";

const EditAdminManagement = () => {
  const { handleEditAdmin, loading } = useEditAdminManagement();
  const location = useLocation();
  const data = location.state;
  const perentId = data._id;
  

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: data?.name || "",
    email: data?.email || "",
    role: data?.role || "",
    permissions: data?.permission || [],
  });

  const { validateField } = useAdminValidation(formData, setErrors, true);

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

    handleEditAdmin(perentId, data);
    setErrors({});
  };
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Edit Admin" />
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
          isEdit={true}
        />
      </div>
    </DefaultLayout>
  );
};

export default EditAdminManagement;
