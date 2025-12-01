import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { updateTestimonial } from "../../redux/actions/TestimonialAction";

const useEditTestimonial = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEditTestimonial = async (id, formData) => {
    setLoading(true);
    try {
      const res = await dispatch(updateTestimonial(id, formData));

      if (res.success) {
        toast.success("Testimonial updated successfully!");
        navigate("/testimonial");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return { handleEditTestimonial, loading };
};

export default useEditTestimonial; 