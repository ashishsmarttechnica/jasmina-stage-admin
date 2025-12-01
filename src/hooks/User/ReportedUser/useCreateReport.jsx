import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createUserReport } from "../../../redux/actions/ReportedUserAction";

const useCreateReport = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Function to handle Role creation
  const handleCreateReport = async (formData) => {
    // console.log(formData);

    setLoading(true);
    try {
      const res = await dispatch(createUserReport(formData));

      if (res.success) {
        toast.success("Report added successfully!");
        navigate("/reporteduser");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return { handleCreateReport, loading };
};

export default useCreateReport;
