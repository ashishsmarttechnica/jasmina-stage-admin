import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import {
  deleteuser,
  getAlluser,
  Updateuser,
} from '../../redux/actions/UserAction';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  deleteCountry,
  getAllCountry,
  updateCountry,
} from '../../redux/actions/CountryAction';

const useCountry = () => {
  const [search, setSearch] = useState('');
  const [lastSearch, setLastSearch] = useState(false);
  const [debounceTimer, setDebounceTimer] = useState(null);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const dispatch = useDispatch();
  const { data, loading } = useSelector(
    (state) => state?.CountryReducerDetails,
  );
//   console.log(data);

  const MySwal = withReactContent(Swal);
  const themeMode = useSelector((state) => state?.themeMode?.colorMode);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllCountry(search,page, limit));
  }, [page, limit]);

  useEffect(() => {
    if (search !== '') {
      setLastSearch(true);

      if (debounceTimer) clearTimeout(debounceTimer);
      const timer = setTimeout(() => {
        dispatch(getAllCountry(search,page, limit));
      }, 400);
      setDebounceTimer(timer);
      return () => clearTimeout(timer);
    } else {
      if (lastSearch) {
        dispatch(getAllCountry(search,page, limit));
        setLastSearch(false);
      }
    }
  }, [search]);

  const hendleEdit = (item) => {
    navigate('/country/edit-country', { state: item });
    // console.log(item, 'item234');
  };

  const handleDisc = async (item) => {
    navigate('/userdetail', { state: item });
  };

  const handleToggleChange = async (val, data) => {
    dispatch(updateCountry(data._id, { isLGBTQ: val })).then((res) => {
      if (res.success) {
        toast.success(res.data.message || 'LGBTQ status updated successfully!');
        dispatch(getAllCountry(data,page, limit));
      }
    });
  };

  const handleDelete = async (userId) => {
    MySwal.fire({
      title: 'Are you sure you want to delete this Country?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      customClass: {
        popup: themeMode === 'dark' ? 'swal2-dark' : 'swal2-light',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteCountry(userId)).then((res) => {
          if (res.success) {
            dispatch(getAllCountry(search,page, limit));
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
    handleDelete,
    hendleEdit,
    handleDisc,
    handleToggleChange,
  };
};
export default useCountry;
