import React, { useState } from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import useEditJob from "../../hooks/Job/useEditJob";
import JobForm from "../../components/Forms/JobForm";

const EditJob = () => {
  const { handleEditJob, loading } = useEditJob();
  const location = useLocation();
  const data = location.state;
  const perentId = data?._id;

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    jobTitle: data?.jobTitle || "",
    companyId: data?.companyId || "",
    employeeType: data?.employeeType || "",
    department: data?.department || "",
    jobLocation: data?.jobLocation || "",
    seniorityLevel: data?.seniorityLevel || "",
    salaryRange: data?.salaryRange || "",
    workHours: data?.workHours || "",
    contactNumber: data?.contactNumber || "",
    education: data?.education || "",
    experience: data?.experience ?? "",
    applyVia: data?.applyVia || "",
    careerWebsite: data?.careerWebsite || "",
    description: data?.description || "",
    responsibilities: data?.responsibilities || "",
    requiredSkills: Array.isArray(data?.requiredSkills)
      ? data.requiredSkills.join(", ")
      : data?.requiredSkills || "",
    requiredLanguages: Array.isArray(data?.requiredLanguages)
      ? data.requiredLanguages.join(", ")
      : data?.requiredLanguages || "",
    deadline: data?.deadline ? data.deadline.slice(0, 10) : "",
    status: data?.status ?? 1,
  });

  const handleSubmit = (data) => {
    const validationErrors = {};
    if (!data.jobTitle?.trim()) {
      validationErrors.jobTitle = "Job title is required";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const toCommaArray = (value) =>
      value
        ? value
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        : [];

    const payload = {
      ...data,
      status: Number(data.status),
      requiredSkills: toCommaArray(data.requiredSkills),
      requiredLanguages: toCommaArray(data.requiredLanguages),
    };

    handleEditJob(perentId, payload);
  };
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Edit Job" />
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-1 table_no_overflow mb-2">
        <header className="flex justify-between items-center px-2">
          <h2 className="font-semibold text-slate-800 dark:text-white"></h2>
          <Button
            variant="contained"
            onClick={() => navigate("/job")}
          >
            View All Job
          </Button>
        </header>
      </div>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <JobForm
          loading={loading}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          errors={errors}
        />
      </div>
    </DefaultLayout>
  );
};

export default EditJob;
