import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { createTestimonial } from "../../redux/actions/TestimonialAction";

const useCreateTestimonial = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCreateTestimonial = async (formData) => {
    setLoading(true);
    try {
      const res = await dispatch(createTestimonial(formData));

      if (res.success) {
        toast.success("Testimonial added successfully!");
        navigate("/Testimonial");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return { handleCreateTestimonial, loading };
};

export default useCreateTestimonial; 