import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllPost } from '../../redux/actions/PostAction';

const usePostManagement = () => {
  const [search, setSearch] = useState('');
  const [lastserch, setLastSearch] = useState(false);
  const [debounceTimer, setDebounceTimer] = useState(null);
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [MembershipdesData, setMembershipdesData] = useState(null);
  const [limit, setLimit] = useState(10);
  const MySwal = withReactContent(Swal);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, loading } = useSelector((state) => state?.PostReducerDetails);
  console.log(data, 'data');
  
  const themeMode = useSelector((state) => state?.themeMode?.colorMode);

  useEffect(() => {
    dispatch(getAllPost('', '', page, limit));
  }, [page, limit]);

  useEffect(() => {
    if (search !== '') {
      setLastSearch(true);
      if (debounceTimer) clearTimeout(debounceTimer);
      const timer = setTimeout(() => {
        dispatch(getAllPost(search, '', page, limit));
      }, 400);
      setDebounceTimer(timer);
      return () => clearTimeout(timer);
    } else {
      if (lastserch) {
        dispatch(getAllPost('', '', page, limit));
        setLastSearch(false);
      }
    }
  }, [search]);


  
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
         dispatch(updateCompany(data._id, { verified: val })).then((res) => {
           if (res.success) {
             toast.success(res.message);
           }
         });
       }
     
     });
 
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
    open,
    setOpen,
    setMembershipdesData,
    MembershipdesData,
    handleToggleChange,
  };
};

export default usePostManagement;
