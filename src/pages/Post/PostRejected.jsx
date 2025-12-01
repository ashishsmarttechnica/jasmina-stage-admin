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
import { toast } from 'react-toastify';
import { FaCheckCircle, FaExclamation } from 'react-icons/fa';
import usePermissions from '../../hooks/usePermissions';
import { pageIds } from '../../common/Permission/PermissionData';
import PostModelPopup from '../../Model/PostModelPopup';
import ReasonModal from '../../Model/ReasonModal';
import { TruncatedTextWithTooltip } from '../../components/TruncatedTextWithTooltip';

const PostRejected = () => {
  const serverurl = import.meta.env.VITE_SERVERURL;
  const permission = usePermissions(pageIds.Post.id, pageIds.Post.PostRejected);
  const columns = [
    {
      headerName: 'USER PHOTO',
      width: 80,
      cellRenderer: (params) => {
        const photoPath = params.data?.userId?.profile?.photo;
        const imgSrc = photoPath ? `${serverurl}/${photoPath}` : noImageIcon;

        return (
          <div className="flex h-full items-center">
            <img
              src={imgSrc}
              alt="User"
              className="w-8 h-8 object-cover rounded-full"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = noImageIcon;
                // console.log("imgSrc", imgSrc)

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

    ...(permission?.remove?.value ||
      permission?.approve?.value ||
      permission?.reject?.value
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
              {permission.approve?.value && (
                <div
                  className="cursor-pointer  rounded-full hover:bg-green-100 transition-transform duration-200 ease-in-out transform hover:scale-105"
                  onClick={() => handleApprove(params.data)}
                >
                  <FaCheckCircle className="text-green-600 text-2xl" />
                </div>
              )}
             {permission?.reject && permission.reject.value && (
                  <div
                    className="transition-all duration-200 bg-red-600  dark:bg-[#2c74cc] dark:hover:bg-[#005dce] p-1 rounded-[4px] cursor-pointer ease-in-out  hover:bg-red-700  transform hover:scale-105"
                    onClick={() => {
                      const reason = params.data.adminReason || 'No reason provided.';
                      setCurrentReason(reason);
                      setShowReasonModal(true);
                    }}
                  >
                    <FaExclamation className="text-white text-xl" />
                  </div>
                )}
            </div>
          ),
        },
      ]
      : []),
  ];

  const columnsLoad = [
    { headerName: 'NAME', flex: 1, cellRenderer: () => <Skeleton /> },
    { headerName: 'EMAIL', flex: 1, cellRenderer: () => <Skeleton /> },
    { headerName: 'ACTION', width: 120, cellRenderer: () => <Skeleton /> },
  ];

  const [search, setSearch] = useState('');
  const [lastserch, setLastSearch] = useState(false);
  const [debounceTimer, setDebounceTimer] = useState(null);
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [MembershipdesData, setMembershipdesData] = useState(null);
  const [limit, setLimit] = useState(10);
  const MySwal = withReactContent(Swal);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, loading } = useSelector((state) => state?.PostReducerDetails);
  // console.log(data, 'data');
  const is_rejected = 2;
  const themeMode = useSelector((state) => state?.themeMode?.colorMode);
  const [showReasonModal, setShowReasonModal] = useState(false);
  const [currentReason, setCurrentReason] = useState('');

  // Handle view button click
  const handleDisc = (postId) => {
    // Find the post in the data
    const post = data?.posts?.find(p => p._id === postId);
    if (post) {
      setSelectedPost(post);
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPost(null);
  };

  useEffect(() => {
    dispatch(getAllPost('', is_rejected, page, limit));
  }, [page, limit]);

  useEffect(() => {
    if (search !== '') {
      setLastSearch(true);
      if (debounceTimer) clearTimeout(debounceTimer);
      const timer = setTimeout(() => {
        dispatch(getAllPost(search, is_rejected, page, limit));
      }, 400);
      setDebounceTimer(timer);
      return () => clearTimeout(timer);
    } else {
      if (lastserch) {
        dispatch(getAllPost('', is_rejected, page, limit));
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
  const handleApprove = (item) => {
    MySwal.fire({
      title: 'Are You Sure Your post Change successfully?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, approve it!',
    }).then((result) => {
      if (result.isConfirmed) {
        // const formData = new FormData();
        const data = {
          status: 1
        };
        dispatch(updatePost(item._id, data))
          .then((res) => {
            if (res.success) {
              toast.success('post Data Change successfully');

              navigate('/postapprove');
            } else {
              toast.error('Failed to approve company: ');
            }
          })
          .catch((error) => {
            toast.error('An error occurred while updating: ' + error.message);
          });
      }
    });
  };
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Rejected Post" />
      <div className="rounded-sm border border-b-0 border-stroke bg-white   shadow-default dark:border-strokedark dark:bg-boxdark p-1 table_no_overflow ">
        <header className=" flex  flex-col sm:flex-row justify-end items-center px-2 ">
          <TableSearch search={search} setSearch={setSearch} />
        </header>
      </div>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-1 table_no_overflow">
        <div
          className={`${themeMode == 'dark' ? 'ag-theme-quartz-dark ' : 'ag-theme-quartz'
            } `}
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
        {data?.pagination?.total > 0 && (
          <div className="flex items-center justify-end">
            <CustomPagination
              page={page}
              limit={limit}
              setPage={setPage}
              setLimit={setLimit}
              count={data?.pagination?.total || 0}
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
      <ReasonModal
        open={showReasonModal}
        onClose={() => setShowReasonModal(false)}
        reason={currentReason}
      />
    </DefaultLayout>
  );
};

export default PostRejected;
//
