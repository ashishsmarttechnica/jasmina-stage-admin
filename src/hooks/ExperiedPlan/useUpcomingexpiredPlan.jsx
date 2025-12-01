import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllUpcomingExpiredPlan } from "../../redux/actions/UpcomingExpiredAction";  
const useUpcomingExpiredPlan = () => {
  const [search, setSearch] = useState("");
  const [lastserch, setLastSearch] = useState(false);
  const [debounceTimer, setDebounceTimer] = useState(null);
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [limit, setLimit] = useState(5);
  const MySwal = withReactContent(Swal);
  const [expiredPlanData, setExpiredPlanData] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, loading } = useSelector((state) => state?.UpcomingExpiredPlanReducerDetail);
  const themeMode = useSelector((state) => state?.themeMode?.colorMode);
 const isStatus = 1;
  useEffect(() => {
    dispatch(getAllUpcomingExpiredPlan(isStatus, page, limit));
  }, [page, limit]);

  useEffect(() => {
    if (search !== "") {
      setLastSearch(true);
      if (debounceTimer) clearTimeout(debounceTimer);
      const timer = setTimeout(() => {
        dispatch(getAllUpcomingExpiredPlan(isStatus, page, limit));
      }, 400);
      setDebounceTimer(timer);
      return () => clearTimeout(timer);
    } else {
      if (lastserch) {
        dispatch(getAllUpcomingExpiredPlan(isStatus, page, limit));
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
    expiredPlanData,
    open,
    setOpen,
  };
};

export default useUpcomingExpiredPlan; 