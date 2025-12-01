import React, { useEffect, useState } from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import RoleManagementForm from "../../components/Forms/RoleManagementForm";
import useCreateRoleManagement from "../../hooks/RoleManagement/useCreateRoleManagement";
import { toast } from "react-toastify";

const AddRoleManagement = () => {
  const { handleCreateRole, loading } = useCreateRoleManagement();

  const [permission, setPermission] = useState([]);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    role: "",
  });
  const navigate = useNavigate();

  // Validate form
  const validateForm = () => {
    const errors = {};
    if (!formData.role) errors.role = "role is required.";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submit
  const handleSubmit = (data) => {
    setFormData(data); // Update local state
    if (!validateForm()) return;
    if (permission.length === 0) {
      toast.error("Please select at least one permission.");
      return;
    }
    handleCreateRole({ ...data, permission });
  };
  useEffect(() => {
    if (errors.role && formData.role.trim()) {
      setErrors((prevErrors) => ({ ...prevErrors, role: "" }));
    }
  }, [formData, errors]);
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Add Role" />
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-1 table_no_overflow mb-2">
        <header className="flex justify-between items-center px-2">
          <h2 className="font-semibold text-slate-800 dark:text-white"></h2>
          <Button
            variant="contained"
            onClick={() => navigate("/role-management")}
          >
            View All Role
          </Button>
        </header>
      </div>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <RoleManagementForm
          permission={permission}
          setPermission={setPermission}
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

export default AddRoleManagement;
