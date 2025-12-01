import React, { useEffect, useState } from 'react';
import { Skeleton } from '@mui/material';
import { AgGridReact } from 'ag-grid-react';
import { MdDelete, MdEdit, MdKey, MdVisibility } from 'react-icons/md';
import { Toggle } from 'rsuite';
import noImageIcon from '../../images/noImage2.webp';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { getAllPost, updatePost } from '../../redux/actions/PostAction';
import { updateCompany } from '../../redux/actions/CompanyAction';
import TableSearch from '../../components/TableSearch';
import CustomPagination from '../../components/CustomPagination';
import usePermissions from '../../hooks/usePermissions';
import { pageIds } from '../../common/Permission/PermissionData';
import { toast } from 'react-toastify';
// import PostViewMore from '../../Model/PostViewMore';
import PostModelPopup from '../../Model/PostModelPopup';
import { FaTimesCircle } from 'react-icons/fa';
import { TruncatedTextWithTooltip } from '../../components/TruncatedTextWithTooltip';

const PostApprove = () => {
  const serverurl = import.meta.env.VITE_SERVERURL;
  const permission = usePermissions(pageIds.Post.id, pageIds.Post.PostApprove);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  const [search, setSearch] = useState('');
  const [lastserch, setLastSearch] = useState(false);
  const [debounceTimer, setDebounceTimer] = useState(null);
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null); // Store selected post data
  const [showModal, setShowModal] = useState(false); // Control modal visibility
  const [MembershipdesData, setMembershipdesData] = useState(null);
  const [limit, setLimit] = useState(10);

  const is_approved = 1;
  const { data, loading } = useSelector((state) => state?.PostReducerDetails);
  const themeMode = useSelector((state) => state?.themeMode?.colorMode);
  const pagination = data?.pagination;
console.log(data);
console.log(pagination);
  // Handle view button click
  const handleDisc = (postId) => {
    // Find the post in the data
    const post = data?.posts?.find(p => p._id === postId);
    if (post) {
      setSelectedPost(post);
      setShowModal(true);
    }
  };
  const handleReject = (item) => {
    MySwal.fire({
      title: 'Are you sure you want to reject?',
      text: 'Please provide a reason for rejection:',
      icon: 'question',
      input: 'textarea',
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
        const payload = {
          status: 2,
          adminReason: result.value,
        };
        dispatch(updatePost(item._id, payload))
          .then((res) => {
            if (res.success) {
              toast.success('Post rejected successfully');
              navigate('/postrejected');
            }
          })
          .catch(() => toast.error('An error occurred while rejecting'));
      }
    });
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPost(null);
  };

  const columns = [
    {
      headerName: 'IMAGE',
      field: 'img',
      width: 20,
      cellRenderer: (params) => {
        return (
          <div className="flex h-full items-center">
            <img
              src={`${serverurl}/${params.data?.postImg}`}
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
      headerName: 'FULL NAME',
      field: 'fullName',
      width: 150,
      cellRenderer: (params) => {
        const searchTerm = search.trim().toLowerCase();
        const title = params.data?.userId?.profile?.fullName || 'N/A';

        if (searchTerm && title.toLowerCase().includes(searchTerm)) {
          const regex = new RegExp(`(${searchTerm})`, 'gi');
          const highlighted = title.replace(
            regex,
            `<span class='bg-[#ff0] text-black-2 rounded-[4px]'>$1</span>`,
          );
          return <div dangerouslySetInnerHTML={{ __html: highlighted }} />;
        }

        return <div>{title}</div>;
      },
    },
    {
      headerName: 'DESCRIPTION',
      field: 'email',
      flex: 1,
      cellRenderer: (params) => {
        const searchTerm = search.trim().toLowerCase();
        const title = params.data?.postDesc || '';

        if (searchTerm && title.toLowerCase().includes(searchTerm)) {
          const regex = new RegExp(`(${searchTerm})`, 'gi');
          const highlighted = title.replace(
            regex,
            `<span class='bg-[#ff0] text-black-2 rounded-[4px]'>$1</span>`,
          );
          return <div dangerouslySetInnerHTML={{ __html: highlighted }} />;
        }

        return (
          <TruncatedTextWithTooltip 
            text={title} 
            maxWords={10}
            className="text-sm"
          />
        );
      },
    },
    {
      headerName: 'VISIBLE',
      field: 'visible',
      width: 50,
      cellRenderer: (params) => {
        return <p>{params.data?.visible ? 'Yes' : 'No'}</p>;
      },
    },
    ...(permission?.view?.value
      ? [
        {
          headerName: 'VIEW',
          width: 200,
          minWidth: 180,
          cellRenderer: (params) => (
            <div className="flex h-full items-start justify-start gap-4">
              {permission.view?.value && (
                <div
                  className="cursor-pointer p-1 bg-primary hover:bg-blue-800 rounded-[4px] hover:scale-105"
                  onClick={() => handleDisc(params.data?._id)}
                >
                  <MdVisibility className="text-[20px] text-white" />
                </div>
              )}
              {permission.reject?.value && (
                  <div
                    className="cursor-pointer rounded-full hover:bg-red-100 transition-transform duration-200 ease-in-out transform hover:scale-105"
                    onClick={() => {
                      // console.log("Reject clicked:", params.data);
                      handleReject(params.data);
                    }}
                  >
                    <FaTimesCircle className="text-red-600 text-2xl" />
                  </div>
                )}
            </div>
          ),
        },
      ]
      : []),
  ];

  const columnsLoad = [
    { headerName: 'IMAGE', width: 20, cellRenderer: () => <Skeleton variant="circular" width={32} height={32} /> },
    { headerName: 'DESCRIPTION', flex: 1, cellRenderer: () => <Skeleton /> },
    { headerName: 'VISIBLE', width: 50, cellRenderer: () => <Skeleton /> },
    { headerName: 'ACTION', width: 200, cellRenderer: () => <Skeleton /> },
  ];


  useEffect(() => {
    dispatch(getAllPost('', is_approved, page, limit));
  }, [page, limit]);

  useEffect(() => {
    if (search !== '') {
      setLastSearch(true);
      if (debounceTimer) clearTimeout(debounceTimer);
      const timer = setTimeout(() => {
        dispatch(getAllPost(search, is_approved, page, limit));
      }, 400);
      setDebounceTimer(timer);
      return () => clearTimeout(timer);
    } else {
      if (lastserch) {
        dispatch(getAllPost('', is_approved, page, limit));
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

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Approve Post" />
      <div className="rounded-sm border border-b-0 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-1 table_no_overflow">
        <header className="flex flex-col sm:flex-row justify-end items-center px-2">
          <TableSearch search={search} setSearch={setSearch} />
        </header>
      </div>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-1 table_no_overflow">
        <div
          className={`${themeMode == 'dark' ? 'ag-theme-quartz-dark' : 'ag-theme-quartz'
            }`}
          style={{ width: '100%', height: '100%' }}
        >
          <AgGridReact
            rowData={loading ? Array(limit).fill({}) : data?.posts || []}
            columnDefs={loading ? columnsLoad : columns}
            defaultColDef={{ resizable: true, minWidth: 200 }}
            animateRows={true}
            onGridReady={(params) => {
              params.api.sizeColumnsToFit();
            }}
          />
        </div>
        {pagination?.total > 0 && (
          <div className="flex items-center justify-end">
            <CustomPagination
              page={page}
              limit={limit}
              setPage={setPage}
              setLimit={setLimit}
              count={pagination?.total || 0}
            />
          </div>
        )}
      </div>

      {showModal && selectedPost && (
        <PostModelPopup
          open={showModal}
          post={selectedPost}
          serverurl={serverurl}
          onClose={handleCloseModal}
        />
      )}

    </DefaultLayout>
  );
};

export default PostApprove;