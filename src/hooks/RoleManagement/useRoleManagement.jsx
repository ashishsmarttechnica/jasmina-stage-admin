import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { useSelector } from "react-redux";
import { deleterole, getAllRoles } from "../../redux/actions/RoleAction";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const useRoleManagement = () => {
  const [search, setSearch] = useState("");
  const [lastserch, setLastSearch] = useState(false);
  const [debounceTimer, setDebounceTimer] = useState(null);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const MySwal = withReactContent(Swal);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, loading } = useSelector((state) => state?.roleDetails);
  // console.log(data, "data4354");
  
  
  const themeMode = useSelector((state) => state?.themeMode?.colorMode);

  const handleDelete = async (id) => {
    MySwal.fire({
      title: "Are you sure you want to delete Role ?",
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
        dispatch(deleterole(id)).then((res) => {
          if (res.success) {
            toast.success("Role Delered successfully!");
            dispatch(getAllRoles( page, limit));
          }
        });
      }
    });
  };

  const hendleEdit = (item) => {
    navigate("/role-management/role/edit-role", { state: item });
  };

  useEffect(() => {
    dispatch(getAllRoles( page, limit));
  }, [page, limit]);

  useEffect(() => {
    if (search !== "") {
      setLastSearch(true);
      if (debounceTimer) clearTimeout(debounceTimer);
      const timer = setTimeout(() => {
        dispatch(getAllRoles( page, limit));
      }, 400);
      setDebounceTimer(timer);
      return () => clearTimeout(timer);
    } else {
      if (lastserch) {
        dispatch(getAllRoles( page, limit));
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
    hendleEdit,
  };
};

export default useRoleManagement;
