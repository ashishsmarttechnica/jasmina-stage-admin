import { useState } from "react";
import { useDispatch } from "react-redux";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { createPage } from "../../redux/actions/PageSectionAction";
import { createJob } from "../../redux/actions/JobAction";

const useCreateJob = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Function to handle category creation
  // 
  const handleCreateJob = async (formData) => {
    setLoading(true);
    try {
      const res = await dispatch(createJob(formData));

      if (res.success) {
        toast.success("Page added successfully!");
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

  return { handleCreateJob, loading };
};

export default useCreateJob;
