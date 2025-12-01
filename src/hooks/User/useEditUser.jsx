import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import { updateRole } from "../../redux/actions/AdminAction";
import { Updateuser } from "../../redux/actions/UserAction";

const useEditUser = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Function to handle Role creation
  const handleEditUser = async (id, formData) => {
    // console.log(formData,);
    
    setLoading(true);
    // console.log("Sending data:", formData);  // Log form data before API call
    try {
      const res = await dispatch(Updateuser(id, formData));
      // console.log("API Response:", res);  // Log the response received
      
      if (res.success) {
        toast.success("Admin Edit successfully!");
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
  

  return { handleEditUser, loading };
};

export default useEditUser;
