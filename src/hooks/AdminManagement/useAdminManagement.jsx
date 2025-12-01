import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteAdmin, getAllAdmins } from '../../redux/actions/AdminAction';

const useAdminManagement = () => {
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
  const { data, loading } = useSelector((state) => state?.adminDetails);
  console.log(data, 'data');
  
  const themeMode = useSelector((state) => state?.themeMode?.colorMode);

  const handleDelete = async (id) => {
    MySwal.fire({
      title: 'Are you sure you want to delete Admin ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      customClass: {
        popup: themeMode == 'dark' ? 'swal2-dark' : 'swal2-light',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteAdmin(id)).then((res) => {
          if (res.success) {
            toast.success('Admin Delered successfully!');
            dispatch(getAllAdmins(page, limit));
          }
        });
      }
    });
  };

  const hendleEdit = (item) => {
    navigate('/admin-management/edit-admin', { state: item });
    // console.log(item,"sdfs");
  };

  const handleDisc = (id) => {
    // console.log(id,"id");
    
    setOpen(true);
    setMembershipdesData(id);
  };

  useEffect(() => {
    dispatch(getAllAdmins(page, limit));
  }, [page, limit]);

  useEffect(() => {
    if (search !== '') {
      setLastSearch(true);
      if (debounceTimer) clearTimeout(debounceTimer);
      const timer = setTimeout(() => {
        dispatch(getAllAdmins(page, limit));
      }, 400);
      setDebounceTimer(timer);
      return () => clearTimeout(timer);
    } else {
      if (lastserch) {
        dispatch(getAllAdmins('', page, limit));
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
    open,
    setOpen,
    MembershipdesData,
    setMembershipdesData,
    handleDelete,
    hendleEdit,
    handleDisc,
  };
};

export default useAdminManagement;
