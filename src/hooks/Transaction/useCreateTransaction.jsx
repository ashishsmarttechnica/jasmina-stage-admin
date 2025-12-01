import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { createTransaction } from "../../redux/actions/TransactionAction";

const useCreateTransaction = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCreateTransaction = async (formData) => {
    setLoading(true);
    try {
      const res = await dispatch(createTransaction(formData));

      if (res.success) {
        toast.success("Transaction added successfully!");
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

  return { handleCreateTransaction, loading };
};

export default useCreateTransaction; 