import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { updateRole } from "../../redux/actions/RoleAction";

const useEditRoleManagement = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Function to handle Role creation
  const handleEditRole = async (id, formData) => {
    setLoading(true);
    try {
      const res = await dispatch(updateRole(id, formData));
      if (res.success) {
        toast.success("Role Updated successfully!");
        navigate("/role-management");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return { handleEditRole, loading };
};

export default useEditRoleManagement;
