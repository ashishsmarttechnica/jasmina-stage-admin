import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createAdmin } from "../../redux/actions/AdminAction";
import { getAllRoles } from "../../redux/actions/RoleAction";
import { useSelector } from "react-redux";

const useCreateAdminManagement = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Function to handle Role creation
  const handleCreateAdmin = async (formData) => {
    // console.log(formData);

    setLoading(true);
    try {
      const res = await dispatch(createAdmin(formData));

      if (res.success) {
        toast.success("Admin added successfully!");
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

  return { handleCreateAdmin, loading };
};

export default useCreateAdminManagement;
