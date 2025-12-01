import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllTestimonial, deleteTestimonial, updateTestimonial } from "../../redux/actions/TestimonialAction.js";      
const useTestimonial = () => {
  const [search, setSearch] = useState("");
  const [lastserch, setLastSearch] = useState(false);
  const [debounceTimer, setDebounceTimer] = useState(null);
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [limit, setLimit] = useState(10);
  const MySwal = withReactContent(Swal);
  const [testimonialData, setTestimonialData] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, loading } = useSelector((state) => state?.TestimonialReducer);
  console.log(data, 'data--------------');
  const themeMode = useSelector((state) => state?.themeMode?.colorMode);

  const handleDelete = async (id) => {
    MySwal.fire({
      title: "Are you sure you want to delete this testimonial?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      customClass: {
        popup: themeMode == "dark" ? "swal2-dark" : "swal2-light",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteTestimonial(id)).then((res) => {
          if (res.success) {
            toast.success("Testimonial deleted successfully!");
            dispatch(getAllTestimonial(search, page, limit));
          } else {
            toast.error("Failed to delete testimonial");
          }
        });
      }
    });
  };

  const handleToggleChange = async (val, data) => {
    MySwal.fire({
      title: 'Are you sure you want to change status?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!',
      customClass: {
        popup: themeMode == 'dark' ? 'swal2-dark' : 'swal2-light',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const statusField = data?.status !== undefined ? 'status' : 'isActive';
        dispatch(updateTestimonial(data._id, { [statusField]: val })).then((res) => {
          if (res.success) {
            toast.success(res.message || 'Status updated successfully!');
            dispatch(getAllTestimonial(search, page, limit));
          } else {
            toast.error(res.message || 'Failed to update status');
          }
        });
      }
    });
  };


  const handleViewDetails = (id) => {
    dispatch(getAllTestimonial("", page, limit, id))
      .then((response) => {
        if (response.success && Array.isArray(response.data)) {
          const selectedTestimonial = response.data.find((item) => item._id === id);
          if (selectedTestimonial) {
            setTestimonialData(selectedTestimonial);
            setOpen(true);
          } else {
            toast.error('Testimonial not found');
          }
        } else {
          toast.error('Failed to fetch testimonial details');
        }
      })
      .catch((error) => {
        console.error('Error fetching testimonial:', error);
        toast.error('An error occurred while fetching testimonial details');
      });
  };

  useEffect(() => {
    dispatch(getAllTestimonial(search, page, limit));
  }, [page, limit]);

  useEffect(() => {
    if (search !== "") {
      setLastSearch(true);
      if (debounceTimer) clearTimeout(debounceTimer);
      const timer = setTimeout(() => {
        dispatch(getAllTestimonial(search.trim(), page, limit));
      }, 400);
      setDebounceTimer(timer);
      return () => clearTimeout(timer);
    } else {
      if (lastserch) {
        dispatch(getAllTestimonial(search, page, limit));
        setLastSearch(false);
      }
    }
  }, [search]);

  const hendleEdit = (item) => {
    navigate("/testimonial/edit-testimonial", { state: item });
  };

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
    handleToggleChange,
    hendleEdit,
    handleViewDetails,
    testimonialData,
    open,
    setOpen,
  };
};

export default useTestimonial; 