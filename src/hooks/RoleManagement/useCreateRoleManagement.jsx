import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createRole } from "../../redux/actions/RoleAction";

const useCreateRoleManagement = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Function to handle Role creation
  const handleCreateRole = async (formData) => {
    // console.log(formData, "this is a form data");

    setLoading(true);
    try {
      const res = await dispatch(createRole(formData));

      if (res.success) {
        toast.success("Role added successfully!");
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

  return { handleCreateRole, loading };
};

export default useCreateRoleManagement;
