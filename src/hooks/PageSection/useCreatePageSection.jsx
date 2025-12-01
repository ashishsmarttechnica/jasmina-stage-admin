import { useState } from "react";
import { useDispatch } from "react-redux";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { createPage } from "../../redux/actions/PageSectionAction";

const useCreatePageSection = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Function to handle category creation
  // 
  const handleCreatePageSection = async (formData) => {
    setLoading(true);
    try {
      const res = await dispatch(createPage(formData));

      if (res.success) {
        toast.success("Page added successfully!");
        navigate("/PageSection");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return { handleCreatePageSection, loading };
};

export default useCreatePageSection;
