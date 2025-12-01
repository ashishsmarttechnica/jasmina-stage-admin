import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UpdateTransaction } from "../../redux/actions/TransactionAction";

const useEditTransaction = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEditTransaction = async (id, formData) => {
    setLoading(true);
    try {
      const res = await dispatch(UpdateTransaction(id, formData));

      if (res.success) {
        toast.success("Transaction updated successfully!");
        navigate("/Transaction");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return { handleEditTransaction, loading };
};

export default useEditTransaction; 