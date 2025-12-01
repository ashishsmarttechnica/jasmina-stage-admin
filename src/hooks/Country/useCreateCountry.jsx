import { useState } from "react";
import { useDispatch } from "react-redux";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { createCountry } from "../../redux/actions/CountryAction";

const useCreateCountry = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Function to handle USER creation
  const handleCreateCountry = async (formData) => {
    setLoading(true);
    try {
      const res = await dispatch(createCountry({
        country: formData.country,
        isLGBTQ: formData.isLGBTQ
      }));

      if (res.success) {
        toast.success("Country added successfully!");
        navigate("/country");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return { handleCreateCountry, loading };
};

export default useCreateCountry;
