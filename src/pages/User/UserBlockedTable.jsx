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
import { useEffect, useState } from 'react';
import noImageIcon from '../../images/noImage2.webp';
import { useDispatch } from 'react-redux';
import CustomPagination from '../../components/CustomPagination';
import usePermissions from '../../hooks/usePermissions';
import { pageIds } from '../../common/Permission/PermissionData';
import { useSelector } from 'react-redux';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { deleteuser, getAlluser, Updateuser } from '../../redux/actions/UserAction';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { toast } from 'react-toastify';
import TableSearch from '../../components/TableSearch';
const UserActive = () => {
  const [openModal, setOpenModal] = useState(false);
  const [modalText, setModalText] = useState('');
  const permission = usePermissions(pageIds.User.id, pageIds.User.UserActive);
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
      headerName: 'IMAGE',
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
      headerName: 'FIRST NAME',
      field: 'firstName',
      minWidth: 110,
      width: 190,
      cellRenderer: (params) => {
        return <p>{params.data?.profile?.fullName}</p>;
      },
    },
    {
      headerName: 'USER NAME',
      field: 'userName',
      minWidth: 110,
      width: 200,
      cellRenderer: (params) => {
        return <p>{params.data?.profile?.userName}</p>;
      },
    },

    {
      headerName: 'GENDER',
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
      headerName: 'EMAIL',
      field: 'email',
      width: 350,
      // flex: 1,
      cellRenderer: (params) => {
        return <p>{params.data?.email}</p>;
      },
    },
    {
      headerName: 'IS PUBLIC',
      field: 'visibility',
      width: 30,
      cellRenderer: (params) => {
        const value = params.data?.visibility?.visibleTo;
        let visibleToText = '-';
        if (value === 0) visibleToText = 'Friends';
        else if (value === 1) visibleToText = 'Companies';
        else if (value === 2) visibleToText = 'Both';
        return <p>{params.data?.visibility.isPublic ? 'Yes' : 'No'} ({visibleToText})</p>;
      },
    },
    {
      headerName: 'LGBTQ +',
      field: 'onlyLGBTQFriendlyCompanies',
      width: 30,
      cellRenderer: (params) => {
        const isLGBTQ = params.data?.visibility.onlyLGBTQFriendlyCompanies;
        return <p>{isLGBTQ ? 'Yes' : 'No'}</p>;
      },
    },
    {
      headerName: 'Blocked',
      field: 'status',
      width: 140,
      cellRenderer: (params) => {
        const id = params?.data?._id;
        const status = params?.data?.status;
        // Since this is UserBlockedTable, all users here are blocked (status === 4)
        // So toggle should be active (checked) by default
        const isBlocked = true; // Always true for blocked users table
        return (
          <div className="flex items-center h-full">
            <Toggle size="sm" checked={isBlocked} onChange={(val) => handleToggleChange(val, params.data)} />
          </div>
        );
      },
    },

    // ...(permission?.remove?.value ||
    // permission?.update?.value ||
    // permission?.view?.value
    //   ? [
    //       {
    //         headerName: 'ACTION',
    //         width: 120,
    //         cellRenderer: (params) => {
    //           const userId = params.data._id;
    //           // console.log(userId, 'userId++++');

    //           // const data = params.data;
    //           // console.log(data);

    //           return (
    //             <div className="flex h-full items-center gap-4">
    //               {permission.remove?.value && (
    //                 <div
    //                   className="p-1 transition-all duration-200 bg-red-500 hover:bg-red-600 rounded-[4px]"
    //                   onClick={() => handleDelete(params.data._id)}
    //                 >
    //                   <MdDelete className="text-[20px] cursor-pointer text-white" />
    //                 </div>
    //               )}

    //               {permission.update?.value && (
    //                 <div
    //                   className="p-1 transition-all duration-200 bg-boxdark hover:bg-boxdark-2 dark:bg-[#2c74cc] dark:hover:bg-[#005dce] rounded-[4px]"
    //                   onClick={() => handleEdit(params.data)
    //                   }
    //                 >
    //                   <MdEdit className="text-[20px] cursor-pointer text-white" />
    //                 </div>
    //               )}

    //               {permission.view?.value && (
    //                 <div
    //                   className="p-1 transition-all duration-200 bg-boxdark hover:bg-boxdark-2 dark:bg-[#2c74cc] dark:hover:bg-[#005dce] rounded-[4px]"
    //                   onClick={() => handleDisc(params.data, userId)}
    //                 >
    //                   <MdRemoveRedEye className="text-[20px] cursor-pointer text-white" />
    //                 </div>
    //               )}
    //             </div>
    //           );
    //         },
    //       },
    //     ]
    //   : []),
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
  const is_active = 2;
  const [MembershipdesData, setMembershipdesData] = useState(null);
  const MySwal = withReactContent(Swal);
  const themeMode = useSelector((state) => state?.themeMode?.colorMode);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAlluser('', is_active, page, limit));
  }, [page, limit]);

  useEffect(() => {
    if (search !== '') {
      setLastSearch(true);

      if (debounceTimer) clearTimeout(debounceTimer);
      const timer = setTimeout(() => {
        dispatch(getAlluser(search, is_active, page, limit));
      }, 400);
      setDebounceTimer(timer);
      return () => clearTimeout(timer);
    } else {
      if (lastSearch) {
        dispatch(getAlluser('', is_active, page, limit));
        setLastSearch(false);
      }
    }
  }, [search]);

  const handleToggleChange = async (checked, row) => {
    const id = row?._id;
    if (!id) return;
    
    // Since this is UserBlockedTable, when toggle is unchecked (checked=false), 
    // we want to unblock the user (set status to 2 for active)
    if (!checked) {
      MySwal.fire({
        title: 'Are you sure you want to unblock this user?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Unblock',
        customClass: {
          popup: themeMode == 'dark' ? 'swal2-dark' : 'swal2-light',
        },
      }).then((result) => {
        if (result.isConfirmed) {
          const payload = { status: 1}; // Set to active status
          dispatch(Updateuser(id, payload)).then((res) => {
            if (res?.success) {
              toast.success(res.message || 'User unblocked successfully');
              // Navigate to userActive when unblocking
              navigate('/userActive');
              dispatch(getAlluser(search, is_active, page, limit));
            }
          });
        }
      });
    }
    // If checked=true, do nothing as user should remain blocked
  };
  const handleEdit = (item) => {
    navigate('/edituser', { state: item });
    // console.log(item, 'item234');
  };

  const handleDisc = async (item) => {
    navigate('/userdetail', { state: item });
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
            dispatch(getAlluser('', is_active, page, limit));
          }
        });
      }
    });
  };
  // Define columns for loading state (Skeleton loading)
  const columnsLoad = [
    { headerName: 'NAME', flex: 1, cellRenderer: () => <Skeleton /> },
    { headerName: 'USER NAME', flex: 1, cellRenderer: () => <Skeleton /> },
    { headerName: 'EMAIL', flex: 1, cellRenderer: () => <Skeleton /> },
    { headerName: 'GENDER', flex: 1, cellRenderer: () => <Skeleton /> },
    { headerName: 'ROLE', flex: 1, cellRenderer: () => <Skeleton /> },
    { headerName: 'ACTION', flex: 1, cellRenderer: () => <Skeleton /> },
  ];
  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Blocked User" />
        <div className="rounded-sm border border-b-0 border-stroke bg-white   shadow-default dark:border-strokedark dark:bg-boxdark p-1 table_no_overflow ">
          <header className=" flex  flex-col sm:flex-row justify-end items-center px-2 ">
            <TableSearch search={search} setSearch={setSearch} />
          </header>
        </div>
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-1 table_no_overflow">
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
          {console.log(data?.users,"data")}
          
          <div className="flex items-center justify-end">
            <CustomPagination
              page={page}
              limit={limit}
              setPage={setPage}
              setLimit={setLimit}
              count={data?.total || 0}
            />
          </div>
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
      </DefaultLayout>
    </>
  );
};

export default UserActive;
