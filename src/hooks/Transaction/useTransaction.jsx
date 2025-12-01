import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllTransaction } from "../../redux/actions/TransactionAction";      
const useTransaction = () => {
  const [search, setSearch] = useState("");
  const [lastserch, setLastSearch] = useState(false);
  const [debounceTimer, setDebounceTimer] = useState(null);
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [limit, setLimit] = useState(10);
  const MySwal = withReactContent(Swal);
  const [transactionData, setTransactionData] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, loading } = useSelector((state) => state?.TransactionReducerDetails);
  const themeMode = useSelector((state) => state?.themeMode?.colorMode);

//   const handleDelete = async (id) => {
//     MySwal.fire({
//       title: "Are you sure you want to delete this transaction?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!",
//       customClass: {
//         popup: themeMode == "dark" ? "swal2-dark" : "swal2-light",
//       },
//     }).then((result) => {
//       if (result.isConfirmed) {
//         dispatch(deleteTransaction(id)).then((res) => {
//           if (res.success) {
//             toast.success("Transaction deleted successfully!");
//             dispatch(getAllTransactions());
//           } else {
//             toast.error("Failed to delete transaction");
//           }
//         });
//       }
//     });
//   };

  const handleEdit = (item) => {
    navigate("/Transaction/EditTransaction", { state: item });
  };

  const handleViewDetails = (id) => {
    dispatch(getAllTransaction("", page, limit, id))
      .then((response) => {
        if (response.success && Array.isArray(response.data)) {
          const selectedTransaction = response.data.find((item) => item._id === id);
          if (selectedTransaction) {
            setTransactionData(selectedTransaction);
            setOpen(true);
          } else {
            toast.error('Transaction not found');
          }
        } else {
          toast.error('Failed to fetch transaction details');
        }
      })
      .catch((error) => {
        console.error('Error fetching transaction:', error);
        toast.error('An error occurred while fetching transaction details');
      });
  };

  useEffect(() => {
    dispatch(getAllTransaction(search, page, limit));
  }, [page, limit]);

  useEffect(() => {
    if (search !== "") {
      setLastSearch(true);
      if (debounceTimer) clearTimeout(debounceTimer);
      const timer = setTimeout(() => {
        dispatch(getAllTransaction(search.trim(), page, limit));
      }, 400);
      setDebounceTimer(timer);
      return () => clearTimeout(timer);
    } else {
      if (lastserch) {
        dispatch(getAllTransaction(search, page, limit));
        setLastSearch(false);
      }
    }
  }, [search]);

  return {
    search,
    setSearch,
    page,
    setPage,
    limit,
    setLimit,
    data,
    loading,
    // handleDelete,
    handleEdit,
    handleViewDetails,
    transactionData,
    open,
    setOpen,
  };
};

export default useTransaction; 