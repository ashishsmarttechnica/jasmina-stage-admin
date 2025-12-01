import { AgGridReact } from 'ag-grid-react';
import {
  MdDelete,
  MdEdit,
  MdEditSquare,
  MdRemoveRedEye,
  MdVisibility,
} from 'react-icons/md';
import { FaExclamation } from 'react-icons/fa';
import { Skeleton, Tooltip } from '@mui/material';
import { FaEye, FaRegEye } from 'react-icons/fa';
import { IoEyeSharp } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { Modal, Toggle } from 'rsuite';
import { useState } from 'react';
import noImageIcon from '../../images/noImage2.webp';
import { useDispatch } from 'react-redux';
import CustomPagination from '../../components/CustomPagination';
const UserTable = () => {
  const [openModal, setOpenModal] = useState(false);
  const [modalText, setModalText] = useState('');

  const handleOpenModal = (notes) => {
    setModalText(notes || 'No notes available');
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const serverurl = import.meta.env.VITE_SERVERURL;
  //   const navigate = useNavigate();
  // const handleEdit = (item) => {
  //   navigate("/role-management/role/edit-role", { state: item });
  // };

  // Define the columns for the table
  const columns = [
    {
      headerName: 'Image',
      field: 'img',
      width: 20,
      cellRenderer: (params) => {
        return (
          <div className="flex h-full  items-center ">
            <img
              src={`${serverurl}/${params.data?.profile?.photo}`}
              alt="service image"
              className="w-8 h-8 !object-cover rounded-full"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = noImageIcon;
              }}
            />
          </div>
        );
      },
    },
    {
      headerName: 'First Name',
      field: 'firstName',
      minWidth: 100,
      width: 130,
      cellRenderer: (params) => {
        return <p>{params.data?.profile?.fullName}</p>;
      },
    },
    {
      headerName: 'User Name',
      field: 'userName',
      minWidth: 100,
      width: 200,
      cellRenderer: (params) => {
        return <p>{params.data?.profile?.userName}</p>;
      },
    },

    {
      headerName: 'gender',
      field: 'gender',
      minWidth: 100,
      width: 140,
      cellRenderer: (params) => {
        return <p>{params.data?.profile?.gender}</p>;
      },
    },
    // {
    //   headerName: 'linkedin',
    //   field: 'linkedin',
    //   width: 400,
    //   cellRenderer: (params) => {
    //     return <p>{params.data?.profile?.linkedin}</p>;
    //   },
    // },
    {
      headerName: 'email',
      field: 'email',
      // width: 230,
      flex: 1,
      cellRenderer: (params) => {
        return <p>{params.data?.email}</p>;
      },
    },
    {
      headerName: 'role',
      field: 'role',
      width: 30,
      cellRenderer: (params) => {
        return <p>{params.data?.role}</p>;
      },
    },
    {
      headerName: 'phone',
      field: 'phone',
      width: 180,
      cellRenderer: (params) => {
        return <p>{params.data?.profile?.phone}</p>;
      },
    },

    ...(permission?.remove?.value || permission?.edit?.value
      ? [
          {
            headerName: 'Action',
            width: 120,
            cellRenderer: (params) => {
              const userId = params.data._id;
              // console.log(userId, 'userId++++');

              // const data = params.data;
              // console.log(data);

              return (
                <div className="flex h-full items-center gap-4">
                  {permission.remove?.value && (
                    <div
                      className="p-1 transition-all duration-200 bg-red-500 hover:bg-red-600 rounded-[4px]"
                      onClick={() => handleDelete(params.data._id)}
                    >
                      <MdDelete className="text-[20px] cursor-pointer text-white" />
                    </div>
                  )}

                  {permission.edit?.value && (
                    <div
                      className="p-1 transition-all duration-200 bg-boxdark hover:bg-boxdark-2 dark:bg-[#2c74cc] dark:hover:bg-[#005dce] rounded-[4px]"
                      onClick={() => handleEdit(params.data)}
                    >
                      <MdEdit className="text-[20px] cursor-pointer text-white" />
                    </div>
                  )}

                  {permission.view?.value && (
                    <div
                      className="p-1 transition-all duration-200 bg-boxdark hover:bg-boxdark-2 dark:bg-[#2c74cc] dark:hover:bg-[#005dce] rounded-[4px]"
                      onClick={() => handleDisc(params.data, userId)}
                    >
                      <MdRemoveRedEye className="text-[20px] cursor-pointer text-white" />
                    </div>
                  )}
                </div>
              );
            },
          },
        ]
      : []),
  ];
  const [search, setSearch] = useState('');
  const [lastSearch, setLastSearch] = useState(false);
  const [debounceTimer, setDebounceTimer] = useState(null);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state?.UserReducerDetails);
  // console.log(data);
  const adminData = useSelector((state) => state.loginUser);
  const [open, setOpen] = useState(false);
  const permission = usePermissions(pageIds.User);
  const [MembershipdesData, setMembershipdesData] = useState(null);
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
  // Define columns for loading state (Skeleton loading)
  const columnsLoad = [
    { headerName: 'Name', flex: 1, cellRenderer: () => <Skeleton /> },
    { headerName: 'User Name', flex: 1, cellRenderer: () => <Skeleton /> },
    { headerName: 'Email', flex: 1, cellRenderer: () => <Skeleton /> },
    { headerName: 'gender', flex: 1, cellRenderer: () => <Skeleton /> },
    { headerName: 'Role', flex: 1, cellRenderer: () => <Skeleton /> },
    { headerName: 'Action', flex: 1, cellRenderer: () => <Skeleton /> },
  ];
  return (
    <>
      <div
        className={`${
          themeMode === 'dark' ? 'ag-theme-quartz-dark' : 'ag-theme-quartz'
        }`}
        style={{ width: '100%', height: '100%' }}
      >
        <AgGridReact
          rowData={loading ? Array(limit).fill({}) : data.users || []}
          columnDefs={loading ? columnsLoad : columns}
          defaultColDef={{ resizable: true, minWidth: 182 }}
          animateRows={true}
          onGridReady={(params) => {
            params.api.sizeColumnsToFit();
          }}
        />
      </div>
      <div className="flex items-center justify-end">
        <CustomPagination
          page={page}
          limit={limit}
          setPage={setPage}
          setLimit={setLimit}
          count={data?.total || 0}
        />
      </div>
      <div className="flex items-center justify-center dark:text-white">
        <Modal open={openModal} onClose={handleCloseModal}>
          <div className="rounded">
            <h2 className="text-xl font-semibold mb-3 dark:text-white">
              Block Reason
            </h2>
            <p className="dark:text-white">{modalText}</p>
            <button
              onClick={handleCloseModal}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded"
            >
              Close
            </button>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default UserTable;
