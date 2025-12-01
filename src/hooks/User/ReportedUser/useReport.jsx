import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAllUserReport } from '../../../redux/actions/ReportedUserAction';
import { Updateuser } from '../../../redux/actions/UserAction';


const useReportedUser = () => {
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
  const { data, loading } = useSelector(
    (state) => state?.UserReportReducerDetails,
  );
  console.log(data, 'datatertertert');
  const isStatus = 1;
  const themeMode = useSelector((state) => state?.themeMode?.colorMode);

  const handleDelete = async (id) => {
    MySwal.fire({
      title: 'Are you sure you want to delete Reported User ?',
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
        dispatch(deleteUserReport(id)).then((res) => {
          if (res.success) {
            toast.success('Report Deleted successfully!');
            dispatch(getAllUserReport(search, isStatus, page, limit));
          }
        });
      }
    });
  };
  const handleToggleChange = async (val, data) => {
    const id = data?._id;
    if (!id) return;
    const nextStatus = val ? 2 : 1;
    MySwal.fire({
      title: val ? 'Are you sure you want to block this user?' : 'Are you sure you want to unblock this user?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: val ? 'Yes, Block it!' : 'Yes, Unblock it!',
      customClass: {
        popup: themeMode == 'dark' ? 'swal2-dark' : 'swal2-light',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const formData = new FormData();
          formData.append('status', nextStatus);
        dispatch(Updateuser(id, formData)).then((res) => {
          if (res.success) {
            toast.success(res.message);
            navigate('/userblocked');
            dispatch(getAllUserReport(search, isStatus, page, limit));
          }
        });
      }
    });
  };
  const hendleEdit = (item) => {
    navigate('/subscription/edit-subscription', { state: item });
    // console.log(item,"sdfs");
  };

  const handleDisc = (id) => {
    // console.log(id,"id");

    setOpen(true);
    setMembershipdesData(id);
  };

  useEffect(() => {
    dispatch(getAllUserReport(search, isStatus, page, limit));
  }, [page, limit]);

  useEffect(() => {
    if (search !== '') {
      setLastSearch(true);
      if (debounceTimer) clearTimeout(debounceTimer);
      const timer = setTimeout(() => {
        dispatch(getAllUserReport(search.trim(), isStatus, page, limit));
      }, 400);
      setDebounceTimer(timer);
      return () => clearTimeout(timer);
    } else {
      if (lastserch) {
        dispatch(getAllUserReport(search, isStatus, page, limit));
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
    handleToggleChange,
  };
};

export default useReportedUser;
