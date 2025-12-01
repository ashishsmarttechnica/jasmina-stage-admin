import { useState } from "react";
import { useDispatch } from "react-redux";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { createuser } from "../../redux/actions/UserAction";

const useCreateUser = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Function to handle USER creation
  const handleCreateUser = async (formData) => {
    setLoading(true);
    try {
      const res = await dispatch(createuser(formData));

      if (res.success) {
        toast.success("User added successfully!");
        navigate("/user");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return { handleCreateUser, loading };
};

export default useCreateUser;
