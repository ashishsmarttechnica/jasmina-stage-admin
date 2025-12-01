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

const useUserData = () => {
  const [search, setSearch] = useState('');
  const [lastSearch, setLastSearch] = useState(false);
  const [debounceTimer, setDebounceTimer] = useState(null);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state?.UserReducerDetails);
  // console.log(data);

  const MySwal = withReactContent(Swal);
  const themeMode = useSelector((state) => state?.themeMode?.colorMode);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAlluser('', '', page, limit));
  }, [page, limit]);

  useEffect(() => {
    if (search !== '') {
      setLastSearch(true);

      if (debounceTimer) clearTimeout(debounceTimer);
      const timer = setTimeout(() => {
        dispatch(getAlluser(search, '', page, limit));
      }, 400);
      setDebounceTimer(timer);
      return () => clearTimeout(timer);
    } else {
      if (lastSearch) {
        dispatch(getAlluser('', '', page, limit));
        setLastSearch(false);
      }
    }
  }, [search]);

  const handleEdit = (item) => {
    navigate('/edituser', { state: item });
    // console.log(item, 'item234');
  };

  const handleDisc = async (item) => {
    navigate('/userdetail', { state: item });
  };

  const handleReject = (item) => {
    MySwal.fire({
      title: 'block this user?',
      text: 'Please provide a reason for rejection:',
      icon: 'question',
      input: 'textarea', // Adding input for reason
      inputPlaceholder: 'Type your reason here...',
      showCancelButton: true,
      confirmButtonText: 'Yes, reject it!',
      inputValidator: (value) => {
        if (!value) {
          return 'You need to write a reason!';
        }
      },
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const formData = new FormData();
        formData.append('notes', result.value); // Append the reason

        dispatch(updatePodcastEpisode(item._id, item.episodes[0]._id, formData))
          .then((result) => {
            if (result.isConfirmed) {
              dispatch(Updateuser(data._id, { isBlocked: val })).then((res) => {
                if (res.success) {
                  toast.success(
                    val
                      ? 'User has been blocked successfully!'
                      : 'User has been Unblocked successfully!',
                  );
                }
              });
            }
          })
          .catch(() => toast.error('An error occurred while rejecting'));
      }
    });
  };

  const handleToggleChange = async (val, data) => {
    // console.log(data.isBlocked);

    if (!data.isBlocked) {
      MySwal.fire({
        title: 'block this user?',
        text: 'Please provide a reason for rejection:',
        icon: 'question',
        input: 'textarea', // Adding input for reason
        inputPlaceholder: 'Type your reason here...',
        showCancelButton: true,
        confirmButtonText: 'Yes, reject it!',
        inputValidator: (value) => {
          if (!value) {
            return 'You need to write a reason!';
          }
        },
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(
            Updateuser(data._id, { isBlocked: val, notes: result.value }),
          ).then((res) => {
            if (res.success) {
              toast.success(
                res.data.message || 'User has been blocked successfully!',
              );
            }
          });
        }
      });
    } else {
      dispatch(Updateuser(data._id, { isBlocked: val })).then((res) => {
        if (res.success) {
          // console.log(res.data.message, 'sdfjk');

          toast.success(
            res.data.message || 'User has been Unblocked successfully!',
          );
        }
      });
    }
  };

  const handleDelete = async (userId) => {
    MySwal.fire({
      title: 'Are you sure you want to delete this user?',
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
        dispatch(deleteuser(userId)).then((res) => {
          if (res.success) {
            dispatch(getAlluser('', '', page, limit));
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
    handleEdit,
    handleDisc,
    handleReject,
    handleToggleChange,
  };
};
export default useUserData;
