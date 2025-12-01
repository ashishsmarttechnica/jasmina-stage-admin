import React, { useEffect, useState } from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import useEditCountry from "../../hooks/Country/useEditCountry";
import useCountryValidation from "../../hooks/Country/useCountryValidation";
import CountryForm from "../../components/Forms/CountryForm";

const EditCountry = () => {
  const { handleEditCountry, loading } = useEditCountry();
  const location = useLocation();
  const data = location.state;
  const perentId = data._id;
  

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    country: data?.country || "",
    isLGBTQ: data?.isLGBTQ || false
  });

  const { validateField } = useCountryValidation(formData, setErrors);

  const handleSubmit = () => {
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
    handleEditCountry(perentId, {
      country: formData.country,
      isLGBTQ: formData.isLGBTQ
    });
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Edit Countrie" />
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-1 table_no_overflow mb-2">
        <header className="flex justify-between items-center px-2">
          <h2 className="font-semibold text-slate-800 dark:text-white"></h2>
          <Button
            variant="contained"
            onClick={() => navigate("/country")}
          >
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
          isEdit={true}
        />
      </div>
    </DefaultLayout>
  );
};

export default EditCountry;
