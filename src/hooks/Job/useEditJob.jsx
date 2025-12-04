import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { updateRole } from "../../redux/actions/AdminAction";
import { updatePage } from "../../redux/actions/PageSectionAction";
import { UpdateJob } from "../../redux/actions/JobAction";

const useEditJob = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Function to handle Role creation
  const handleEditJob = async (id, formData) => {
    setLoading(true);
    try {
      const res = await dispatch(UpdateJob(id, formData));

      if (res.success) {
        toast.success("Job Edit successfully!");
        navigate("/job");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return { handleEditJob, loading };
};

export default useEditJob;
