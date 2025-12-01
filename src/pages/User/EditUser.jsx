import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import AdminManagementForm from '../../components/Forms/AdminManagementForm';
import useAdminValidation from '../../hooks/AdminManagement/useAdminValidation';
// import useEditAdminManagement from "../../hooks/AdminManagement/useEditAdminManagement";
import UserForm from '../../components/Forms/UserForm';
import useEditUser from '../../hooks/User/useEditUser';
import useUserValidation from '../../hooks/User/useUserValidation';

const EditUser = () => {
  const { handleEditUser, loading } = useEditUser();

  const location = useLocation();

  const data = location.state;
  // console.log(data, 'data12');

  const perentId = data._id;

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    fullName: data?.profile?.fullName || '', // Initialize first_name
    userName: data?.profile?.userName || '', // Initialize last_name
    gender: data?.profile?.gender || '',
    linkedin: data?.profile?.linkedin || '',
    location: data?.profile?.location || '',
    phone: data?.profile?.phone || '',
    email: data?.email || '',
    // isBlocked: data?.isBlocked ?? false,
    notes: data?.notes || '',
    permissions: data?.permission || [],
  });

  const { validateField } = useUserValidation(formData, setErrors, true);

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

    handleEditUser(perentId, data);
    setErrors({});
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Edit user" />
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-1 table_no_overflow mb-2">
        <header className="flex justify-between items-center px-2">
          <h2 className="font-semibold text-slate-800 dark:text-white"></h2>
          <Button variant="contained" onClick={() => navigate('/user')}>
            View All User
          </Button>
        </header>
      </div>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <UserForm
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

export default EditUser;
