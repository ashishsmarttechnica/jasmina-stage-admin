import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { updateRole } from "../../redux/actions/AdminAction";

const useEditAdminManagement = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Function to handle Role creation
  const handleEditAdmin = async (id, formData) => {
    setLoading(true);
    try {
      const res = await dispatch(updateRole(id, formData));

      if (res.success) {
        toast.success("Admin Edit successfully!");
        navigate("/admin-management");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return { handleEditAdmin, loading };
};

export default useEditAdminManagement;
