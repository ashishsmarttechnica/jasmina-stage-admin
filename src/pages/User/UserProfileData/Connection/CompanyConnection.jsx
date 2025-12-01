import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Avatar, AvatarGroup, Box, Modal, Skeleton } from '@mui/material';
import noImageIcon from '../../../../images/noImage2.webp';
import { AgGridReact } from 'ag-grid-react';
import {
  FaCheckCircle,
  FaExpandArrowsAlt,
  FaEye,
  FaTimesCircle,
} from 'react-icons/fa';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import CustomPagination from '../../../../components/CustomPagination';
import { getAllConnection } from '../../../../redux/actions/ConnectionAction';
const MySwal = withReactContent(Swal);
const CompanyConnection = ({ userType, id }) => {
  console.log(userType)
  const [search, setSearch] = useState('');
  const [debounceTimer, setDebounceTimer] = useState(null);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [open, setOpen] = useState(false);
  const [filterType, setFilterType] = useState('Company');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const themeMode = useSelector((state) => state?.themeMode?.colorMode);
  const { data: ProductData, loading } = useSelector(
    (state) => state?.ConnectionReducerDetails,
  );
  console.log(ProductData);

  const is_pending = 0;
  const location = useLocation();
  const user = location.state || {};
  // console.log('dsfsdfsdfsdf', user);
  const userId = user._id;
  const serverurl = import.meta.env.VITE_SERVERURL;
  const getRowHeight = (params) => (params.node.group ? 10 : 80);
  const handleClose = () => setOpen(false);

  const columnsLoad = [
    { headerName: 'Image', width: 80, cellRenderer: () => <Skeleton /> },
    { headerName: 'email', width: 200, cellRenderer: () => <Skeleton /> },
    { headerName: 'full Name', width: 200, cellRenderer: () => <Skeleton /> },
    { headerName: 'username', width: 200, cellRenderer: () => <Skeleton /> },
    { headerName: 'connection', width: 200, cellRenderer: () => <Skeleton /> },
    { headerName: 'action', width: 200, cellRenderer: () => <Skeleton /> },
  ];
  const columns = [
    {
      headerName: 'Image',
      field: 'Image',
      width: 80,
      cellRenderer: (params) => (
        console.log(params.data?.details?.logoUrl),
        <div className=" mt-5 text-gray-800 text-base font-medium">
          <div className="break-words w-full max-w-xs">
            <img
              src={`${serverurl}/${params.data?.details?.logoUrl}`}
              alt="profile"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = noImageIcon;
              }}
              className="rounded-full w-10 h-10 object-cover shadow-md"
            />
          </div>
        </div>
      ),
    },
    {
      headerName: 'email',
      field: 'email',
      flex: 1,
      cellRenderer: (params) => (
        <div className="">
          <div className=" mt-5 break-words w-full max-w-xs">
            {params.data?.details?.profile?.email ||
              params.data?.details?.email}
          </div>
        </div>
      ),
    },
    {
      headerName: 'Company Name',
      field: 'fullName',
      width: 180,
      cellRenderer: (params) => (
        <div className="">
          <div className=" mt-5 break-words w-full max-w-xs">
            {params.data?.details?.companyName ||
              params.data?.details?.firstName}
          </div>
        </div>
      ),
    },
    {
      headerName: 'Industry Type',
      field: 'username',
      width: 170,
      cellRenderer: (params) => (
        <div className="">
          <div className=" mt-5 break-words w-full max-w-xs">
            {params.data?.details?.industryType?.join(', ') ||
              params.data?.details?.companyType}
          </div>
        </div>
      ),
    },
    {
      headerName: 'connection',
      field: 'connection',
      width: 200,
      cellRenderer: (params) => (
        <div className="">
          <div className=" mt-5 break-words w-full max-w-xs">
            {params.data?.details?.connectionCount ||
              params.data?.connectionCount}
          </div>
        </div>
      ),
    },
    // {
    //   headerName: 'Action',
    //   width: 150,
    //   cellRenderer: (params) => (
    //     <div className="flex gap-3 mt-5">
    //       <div
    //         className="cursor-pointer  rounded-full hover:bg-green-100 transition-transform duration-200 ease-in-out transform hover:scale-105"
    //         // onClick={() => handleApprove(params.data)}
    //       >
    //         <FaCheckCircle className="text-green-600 text-[25px]" />
    //       </div>

    //       {/* Reject Icon */}
    //       <div
    //         className="cursor-pointer  rounded-full hover:bg-red-100 transition-transform duration-200 ease-in-out transform hover:scale-105"
    //         // onClick={() => handleReject(params.data)}
    //       >
    //         <FaTimesCircle className="text-red-600 text-[25px]" />
    //       </div>
    //     </div>
    //   ),
    // },
  ];

  const searchMyData = async () => {
    try {
      if (search.trim()) {
        dispatch(getAllConnection('', page, limit, userType, filterType));
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    if (search !== '') {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
      const timer = setTimeout(() => {
        searchMyData();
      }, 400);
      setDebounceTimer(timer);
      return () => {
        clearTimeout(timer);
      };
    } else {
      dispatch(getAllConnection(id, page, limit, userType, filterType));
    }
  }, [id, page, limit, userType, filterType]); // <- include filterType here

  return (
    <>
      <div className="rounded-sm   dark:border-strokedark dark:bg-boxdark p-1 table_no_overflow shadow-lg"></div>
      {/* <div className="flex flex-wrap items-center gap-3 mb-6 px-6">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Connection :
        </span>
        <button
          className={`px-4 py-1.5 text-[16px]  rounded-md border transition-all duration-200 
      ${
        filterType === 'User'
          ? 'bg-blue-600 text-white text-[16px] border-blue-600'
          : 'bg-white text-gray-800 text-[16px] border-gray-300 hover:bg-gray-100'
      }`}
          onClick={() => setFilterType('User')}
        >
          User
        </button>
        <button
          className={`px-4 py-1.5 text-[16px] rounded-md border transition-all duration-200 
      ${
        filterType === 'Company'
          ? 'bg-blue-600 text-white text-[16px] border-blue-600'
          : 'bg-white text-gray-800 text-[16px] border-gray-300 hover:bg-gray-100'
      }`}
          onClick={() => setFilterType('Company')}
        >
          Company
        </button>
      </div> */}

      <div className="rounded-sm shadow-default dark:border-strokedark dark:bg-boxdark p-1 table_no_overflow">
        <div className="flex flex-col">
          <div
            className={`${themeMode == 'dark' ? 'ag-theme-quartz-dark ' : 'ag-theme-quartz'
              } `}
          >
            {ProductData.loading ? (
              <div className="flex justify-center pt-2">Loading...</div>
            ) : ProductData?.data?.results?.length !== 0 ? (
              <AgGridReact
                getRowHeight={getRowHeight}
                className="relative"
                style={{ width: '100%', height: '100%' }}
                rowData={ProductData?.results || []}
                columnDefs={loading ? columnsLoad : columns}
                defaultColDef={{ resizable: true }}
                onGridReady={(params) => {
                  params.api.sizeColumnsToFit();
                }}
                rowSelection="multiple"
                animateRows={true}
              />
            ) : (
              <div className="flex justify-center pt-2">No Data</div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-end">
          <CustomPagination
            page={page}
            limit={limit}
            setPage={setPage}
            setLimit={setLimit}
            count={ProductData?.pagination?.total || 0}
          />
        </div>
      </div>
    </>
  );
};

export default CompanyConnection;
