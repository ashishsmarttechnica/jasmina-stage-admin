import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import { deletepage, getAllPages } from "../../redux/actions/AdminAction";
// import { getstutspost } from "../../redux/actions/PostAction";
import { deletepage, getAllPages } from "../../redux/actions/PageSectionAction";
import { getAllJobs, getSingleJob } from "../../redux/actions/JobAction";

const useJob = () => {
  const [search, setSearch] = useState("");
  const [lastserch, setLastSearch] = useState(false);
  const [debounceTimer, setDebounceTimer] = useState(null);
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [limit, setLimit] = useState(10);
  const MySwal = withReactContent(Swal);
  const [MembershipdesData, setMembershipdesData] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, loading } = useSelector((state) => state?.JobReducerDetails);
  console.log(data, "dfgdf");

  const themeMode = useSelector((state) => state?.themeMode?.colorMode);
  const handleDelete = async (id) => {
    console.log("Delete clicked for ID:", id); // 👉 Log when delete is initiated

    MySwal.fire({
      title: "Are you sure you want to delete Admin ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      customClass: {
        popup: themeMode == "dark" ? "swal2-dark" : "swal2-light",
      },
    }).then((result) => {
      console.log("SweetAlert result:", result); // 👉 Log the result from SweetAlert

      if (result.isConfirmed) {
        console.log("Confirmed. Dispatching deletepage for ID:", id);

        dispatch(deletepage(id)).then((res) => {
          console.log("Delete response:", res); // 👉 Log the response from delete action

          if (res.success) {
            toast.success("Admin Deleted successfully!");
            console.log("Fetching updated list...");

            dispatch(getAllJobs(search, page, limit));
          } else {
            console.warn("Delete failed:", res);
          }
        });
      } else {
        console.log("Deletion cancelled by user.");
      }
    });
  };


  const handleEdit = (item) => {
    navigate("/job/edit-job", { state: item });
    // console.log(item,"sdfs");

  };
  const handleDisc = async (id) => {
    dispatch(getAllJobs("", page, limit))
      .then((response) => {
        if (response.success && Array.isArray(response.data)) {
          const selectedMembership = response.data.find((item) => item._id === id);
          if (selectedMembership) {
            setMembershipdesData(selectedMembership);
            setOpen(true);
          } else {
            toast.error('Membership not found');
          }
        } else {
          toast.error('Failed to fetch memberships');
        }
        console.log('Fetched response:', response);
      })
      .catch((error) => {
        console.error('Error fetching memberships:', error);
        toast.error('An error occurred while fetching memberships');
      });
  };
  const handleDiscd = (id) => {
  dispatch(getSingleJob(id))
    .then((res) => {
      if (res.success) {
        setMembershipdesData(res.data); // set single job data
        setOpen(true); 
      } else {
        toast.error(res.message || "Failed to fetch job");
      }
    })
    .catch((error) => {
      toast.error("Something went wrong while fetching the job");
      console.error("Error in handleDiscd:", error);
    });
};
  useEffect(() => {
    dispatch(getAllJobs(search, page, limit));
  }, [page, limit]);

  useEffect(() => {
    if (search !== "") {
      setLastSearch(true);
      if (debounceTimer) clearTimeout(debounceTimer);
      const timer = setTimeout(() => {
        dispatch(getAllJobs(search, page, limit));
      }, 400);
      setDebounceTimer(timer);
      return () => clearTimeout(timer);
    } else {
      if (lastserch) {
        dispatch(getAllJobs(search, page, limit));
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
    handleDelete,
    handleEdit,
    handleDiscd,
    MembershipdesData,
    open,
    setOpen,
  };
};

export default useJob;
