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
import { getAllReportedPost } from '../../redux/actions/PostAction';
import { updateCompany } from '../../redux/actions/CompanyAction';
import TableSearch from '../../components/TableSearch';
import CustomPagination from '../../components/CustomPagination';
import { TruncatedTextWithTooltip } from '../../components/TruncatedTextWithTooltip';


const PostReported = () => {
  const serverurl = import.meta.env.VITE_SERVERURL;
  const columns = [
  {
    headerName: 'Image',
    field: 'postId.postImg',
    width: 80,
    cellRenderer: (params) => {
      const postImg = params?.data?.postId?.postImg;
      const imgSrc = postImg ? `${serverurl}/${postImg.replace(/\\/g, '/')}` : noImageIcon;
      return (
        <div className="flex h-full items-center">
          <img
            src={imgSrc}
            alt="Post"
            className="w-8 h-8 object-cover rounded-full"
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
    headerName: 'Reported User',
    field: 'reportedUserId.profile.fullName',
    flex: 1,
    cellRenderer: (params) => {
      const title = params?.data?.reportedUserId?.profile?.fullName || 'N/A';
      const searchTerm = search.trim().toLowerCase();

      if (searchTerm && title.toLowerCase().includes(searchTerm)) {
        const highlighted = title.replace(
          new RegExp(`(${searchTerm})`, 'gi'),
          `<span class='bg-[#ff0] text-black-2 rounded-[4px]'>$1</span>`
        );
        return <div dangerouslySetInnerHTML={{ __html: highlighted }} />;
      }

      return <div>{title}</div>;
    },
  },
  {
    headerName: 'Description',
    field: 'postId.postDesc',
    flex: 2,
    cellRenderer: (params) => {
      const title = params?.data?.description || '';
      const searchTerm = search.trim().toLowerCase();

      if (searchTerm && title.toLowerCase().includes(searchTerm)) {
        const highlighted = title.replace(
          new RegExp(`(${searchTerm})`, 'gi'),
          `<span class='bg-[#ff0] text-black-2 rounded-[4px]'>$1</span>`
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
    headerName: 'Reason',
    field: 'reason',
    flex: 1,
    cellRenderer: (params) => <div>{params.data?.reason || 'N/A'}</div>,
  },
  {
    headerName: 'Reported By',
    field: 'reporterUserId.profile.fullName',
    flex: 1,
    cellRenderer: (params) => {
      return <div>{params.data?.reporterUserId?.profile?.fullName || 'N/A'}</div>;
    },
  },
  {
    headerName: 'Reported At',
    field: 'createdAt',
    flex: 1,
    cellRenderer: (params) => {
      const date = new Date(params.data?.createdAt);
      return <div>{!isNaN(date) ? date.toLocaleDateString() : 'N/A'}</div>;
    },
  },
];


  const columnsLoad = [
    { headerName: 'Name', flex: 1, cellRenderer: () => <Skeleton /> },
    { headerName: 'Email', flex: 1, cellRenderer: () => <Skeleton /> },
    { headerName: 'Action', width: 120, cellRenderer: () => <Skeleton /> },
  ];

  const [search, setSearch] = useState('');
  const [lastserch, setLastSearch] = useState(false);
  const [debounceTimer, setDebounceTimer] = useState(null);
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [MembershipdesData, setMembershipdesData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [limit, setLimit] = useState(10);
  const MySwal = withReactContent(Swal);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const is_reported = 3;
  const { reportedData, loading } = useSelector((state) => state?.PostReducerDetails);
  console.log(reportedData, 'data');

  const themeMode = useSelector((state) => state?.themeMode?.colorMode);

  // Handle view button click
  const handleDisc = (postId) => {
    // Find the post in the data
    const post = data?.posts?.find(p => p._id === postId);
    if (post) {
      setSelectedPost(post);
      setShowModal(true);
    }
  };
  // Close modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPost(null);
  };

  useEffect(() => {
    dispatch(getAllReportedPost());
  }, [page, limit]);

  useEffect(() => {
    if (search !== '') {
      setLastSearch(true);
      if (debounceTimer) clearTimeout(debounceTimer);
      const timer = setTimeout(() => {
        dispatch(getAgetAllReportedPostllPost());
      }, 400);
      setDebounceTimer(timer);
      return () => clearTimeout(timer);
    } else {
      if (lastserch) {
        dispatch(getAllReportedPost());
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
      <Breadcrumb pageName="Reported Post" />
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
            rowData={loading ? Array(limit).fill({}) : reportedData?.data|| []}
            columnDefs={loading ? columnsLoad : columns}
            defaultColDef={{ resizable: true, minWidth: 200 }}
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
            count={reportedData?.total || 0}
          />
        </div>
      </div>
{/* 
      {showModal && selectedPost && (
        <PostViewMore
          title="Post Details"
          onClose={handleCloseModal}
          width="w-full max-w-2xl"
        >
          <PostDetailsModal
            post={selectedPost}
            serverurl={serverurl}
            onClose={handleCloseModal}
          />
        </PostViewMore>
      )} */}
    </DefaultLayout>
  );
};

export default PostReported;
//
