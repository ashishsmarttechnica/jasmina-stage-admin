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
  FaDownload,
} from 'react-icons/fa';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import CustomPagination from '../../../../components/CustomPagination';
import { getAllJob } from '../../../../redux/actions/JobAction';
const MySwal = withReactContent(Swal);
const AppliedJob = () => {
  const [search, setSearch] = useState('');
  const [debounceTimer, setDebounceTimer] = useState(null);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const themeMode = useSelector((state) => state?.themeMode?.colorMode);
  const { data: JobData, loading } = useSelector(
    (state) => state?.JobReducerDetails,
  );

  console.log('JobData', JobData);
  const location = useLocation();
  const user = location.state || {};
  const userId = user._id;
  const serverurl = import.meta.env.VITE_SERVERURL;
  const getRowHeight = (params) => (params.node.group ? 10 : 80);
  const handleClose = () => setOpen(false);

  const columnsLoad = [
    { headerName: 'Job Title', width: 200, cellRenderer: () => <Skeleton /> },
    { headerName: 'Company', width: 200, cellRenderer: () => <Skeleton /> },
    { headerName: 'Full Name', width: 200, cellRenderer: () => <Skeleton /> },
    { headerName: 'Email', width: 200, cellRenderer: () => <Skeleton /> },
    { headerName: 'Phone', width: 150, cellRenderer: () => <Skeleton /> },
    { headerName: 'Location', width: 150, cellRenderer: () => <Skeleton /> },
    { headerName: 'Experience', width: 120, cellRenderer: () => <Skeleton /> },
    { headerName: 'Applied CV', width: 120, cellRenderer: () => <Skeleton /> },
    { headerName: 'Status', width: 100, cellRenderer: () => <Skeleton /> },
  ];

  const columns = [
    {
      headerName: 'Job Title',
      field: 'jobTitle',
      width: 200,
      cellRenderer: (params) => (
        <div className="mt-5 text-gray-800 text-sm font-medium">
          <div className="break-words w-full max-w-xs">
            {params.data?.jobId?.jobTitle || 'N/A'}
          </div>
        </div>
      ),
    },

    {
      headerName: 'Full Name',
      field: 'fullName',
      width: 180,
      cellRenderer: (params) => (
        <div className="mt-5 break-words w-full max-w-xs">
          {params.data?.fullName || 'N/A'}
        </div>
      ),
    },
    {
      headerName: 'Email',
      field: 'email',
      width: 200,
      cellRenderer: (params) => (
        <div className="mt-5 break-words w-full max-w-xs">
          {params.data?.email || 'N/A'}
        </div>
      ),
    },
    {
      headerName: 'Phone',
      field: 'phone',
      width: 150,
      cellRenderer: (params) => (
        <div className="mt-5 break-words w-full max-w-xs">
          {params.data?.phone || 'N/A'}
        </div>
      ),
    },
    {
      headerName: 'Location',
      field: 'location',
      width: 150,
      cellRenderer: (params) => (
        <div className="mt-5 break-words w-full max-w-xs">
          {params.data?.location || 'N/A'}
        </div>
      ),
    },
    {
      headerName: 'Experience',
      field: 'expYears',
      width: 120,
      cellRenderer: (params) => (
        <div className="mt-5 break-words w-full max-w-xs">
          {params.data?.expYears ? `${params.data.expYears} years` : 'N/A'}
        </div>
      ),
    },
    {
      headerName: 'Applied CV',
      field: 'appliedCV',
      width: 120,
      cellRenderer: (params) => (
        <div className="mt-5">
          {params.data?.appliedCV ? (
            <a
              href={`${serverurl}/${params.data.appliedCV}`}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer text-blue-600 hover:text-blue-800 transition-colors"
            >
              <FaDownload className="text-lg" />
            </a>
          ) : (
            'N/A'
          )}
        </div>
      ),
    },
    {
      headerName: 'Status',
      field: 'seen',
      width: 100,
      cellRenderer: (params) => (
        <div className="mt-5">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              params.data?.seen
                ? 'bg-green-100 text-green-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}
          >
            {params.data?.seen ? 'Seen' : 'Pending'}
          </span>
        </div>
      ),
    },
  ];

  const searchMyData = async () => {
    try {
      if (search.trim()) {
        dispatch(getAllJob(userId, page, limit));
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
      dispatch(getAllJob(userId, page, limit));
    }
  }, [userId, page, limit]);

  return (
    <>
      <div className="rounded-sm dark:border-strokedark dark:bg-boxdark p-1 table_no_overflow shadow-lg"></div>

      <div className="rounded-sm shadow-default dark:border-strokedark dark:bg-boxdark p-1 table_no_overflow">
        <div className="flex flex-col">
          <div
            className={`${
              themeMode == 'dark' ? 'ag-theme-quartz-dark ' : 'ag-theme-quartz'
            } `}
          >
            {loading ? (
              <div className="flex justify-center pt-2">Loading...</div>
            ) : JobData?.data?.appliedJobs?.length !== 0 ? (
              <AgGridReact
                getRowHeight={getRowHeight}
                className="relative"
                style={{ width: '100%', height: '100%' }}
                rowData={JobData?.data?.appliedJobs || []}
                columnDefs={loading ? columnsLoad : columns}
                defaultColDef={{ resizable: true }}
                onGridReady={(params) => {
                  params.api.sizeColumnsToFit();
                }}
                rowSelection="multiple"
                animateRows={true}
              />
            ) : (
              <div className="flex justify-center pt-2">
                No Applied Jobs Found
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-end">
          <CustomPagination
            page={page}
            limit={limit}
            setPage={setPage}
            setLimit={setLimit}
            count={JobData?.data?.total || 0}
          />
        </div>
      </div>
    </>
  );
};

export default AppliedJob;
