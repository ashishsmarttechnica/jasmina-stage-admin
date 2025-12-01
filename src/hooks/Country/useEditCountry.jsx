import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { updateCountry } from '../../redux/actions/CountryAction';

const useEditCountry = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Function to handle Role creation
  const handleEditCountry = async (id, formData) => {
    setLoading(true);
    try {
      const res = await dispatch(updateCountry(id, formData));

      if (res.success) {
        toast.success('Country Edit successfully!');
        navigate('/country');
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error?.message || 'Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return { handleEditCountry, loading };
};

export default useEditCountry;
