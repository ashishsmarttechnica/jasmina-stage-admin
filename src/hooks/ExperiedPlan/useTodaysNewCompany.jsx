import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { getAllTodaysNewCompany } from "../../redux/actions/TodaysNewCompanyAction";

const useTodaysNewCompany = () => {
  const [search, setSearch] = useState("");
  const [lastSearch, setLastSearch] = useState(false);
  const [debounceTimer, setDebounceTimer] = useState(null);
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [limit, setLimit] = useState(5);
  const MySwal = withReactContent(Swal);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, loading } = useSelector((state) => state?.TodaysNewCompanyReducerDetail);
  const isStatus = 3;

  useEffect(() => {
    dispatch(getAllTodaysNewCompany(isStatus, page, limit));
  }, [page, limit]);

  useEffect(() => {
    if (search !== "") {
      setLastSearch(true);
      if (debounceTimer) clearTimeout(debounceTimer);
      const timer = setTimeout(() => {
        dispatch(getAllTodaysNewCompany(isStatus, page, limit));
      }, 400);
      setDebounceTimer(timer);
      return () => clearTimeout(timer);
    } else if (lastSearch) {
      dispatch(getAllTodaysNewCompany(isStatus, page, limit));
      setLastSearch(false);
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
    open,
    setOpen,
  };
};

export default useTodaysNewCompany;


