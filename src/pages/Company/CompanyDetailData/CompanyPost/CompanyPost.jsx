import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Avatar, AvatarGroup, Box, Modal, Skeleton } from '@mui/material';
import noImageIcon from '../../../../images/noImage2.webp';
import { AgGridReact } from 'ag-grid-react';
import {
    FaCheck,
  FaCheckCircle,
  FaExpandArrowsAlt,
  FaEye,
  FaTimesCircle,
} from 'react-icons/fa';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import CustomPagination from '../../../../components/CustomPagination';
import { getAllPostbyComapany } from '../../../../redux/actions/PostAction';
import { IoCloseSharp } from 'react-icons/io5';
import { MdEdit, MdVisibility } from 'react-icons/md';
const MySwal = withReactContent(Swal);
const CompanyPost = ({id}) => {
  const [search, setSearch] = useState('');
  const [debounceTimer, setDebounceTimer] = useState(null);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const getRowHeight = (params) => (params.node.group ? 10 : 80);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const themeMode = useSelector((state) => state?.themeMode?.colorMode);
  const { databycompany, loading } = useSelector(
    (state) => state?.PostReducerDetails,
  );
  console.log(databycompany);
  const serverurl = import.meta.env.VITE_SERVERURL;
  const location = useLocation();
  const user = location.state || {};
  console.log('dsfsdfsdfsdf', user);
  const userId = user._id;

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
    headerName: 'Company',
    field: 'companyId.companyName',
    flex: 1,
    cellRenderer: (params) => (
      <div className="flex items-center gap-2 mt-3">
        <img
          src={`${serverurl}/${params?.data?.companyId?.logoUrl}`}
          alt="Logo"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = noImageIcon;
          }}
          className="w-8 h-8 rounded-full object-cover"
        />
        {/* <span>{params.data?.companyId?.companyName}</span> */}
      </div>
    ),
  },
  {
    headerName: 'Job Title',
    field: 'jobTitle',
    flex: 1,
    cellRenderer: (params) => (
      <div className="mt-3">{params.data?.jobTitle}</div>
    ),
  },
  {
    headerName: 'Department',
    field: 'department',
    flex: 1,
    cellRenderer: (params) => (
      <div className="mt-3 capitalize">{params.data?.department}</div>
    ),
  },
  {
    headerName: 'Location',
    field: 'jobLocation',
    flex: 1,
    cellRenderer: (params) => (
      <div className="mt-3">{params.data?.jobLocation}</div>
    ),
  },
  {
    headerName: 'Salary',
    field: 'salaryRange',
    flex: 1,
    cellRenderer: (params) => (
      <div className="mt-3">{params.data?.salaryRange}</div>
    ),
  },
  {
    headerName: 'Experience (yrs)',
    field: 'experience',
    width: 150,
    cellRenderer: (params) => (
      <div className="mt-3">{params.data?.experience || '0'}</div>
    ),
  },
  {
    headerName: 'Action',
    width: 200,
    cellRenderer: (params) => (
      <div className="flex gap-2 mt-3">
        <div
          className="bg-green-600 hover:bg-green-700 p-1 rounded cursor-pointer"
          onClick={() => handleApprove(params.data)}
        >
          <FaCheck className="text-white text-lg" />
        </div>
        <div
          className="bg-red-600 hover:bg-red-700 p-1 rounded cursor-pointer"
          onClick={() => handleReject(params.data)}
        >
          <IoCloseSharp className="text-white text-lg" />
        </div>
      </div>
    ),
  },
];

  const searchMyData = async () => {
    try {
      if (search.trim()) {
        dispatch(getAllPostbyComapany(id, page, limit));
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
      dispatch(getAllPostbyComapany(id, page, limit));
    }
  }, [search]);

  return (
    <>
      <div className="rounded-sm   dark:border-strokedark dark:bg-boxdark p-1 table_no_overflow shadow-lg"></div>

      <div className="rounded-sm shadow-default dark:border-strokedark dark:bg-boxdark p-1 table_no_overflow">
        <div className="flex flex-col">
          <div
            className={`${
              themeMode == 'dark' ? 'ag-theme-quartz-dark ' : 'ag-theme-quartz'
            } `}
          >
            <AgGridReact
              rowData={
                loading ? Array(limit).fill({}) : databycompany?.jobs || []
              }
              className="relative"
              style={{ width: '100%', height: '100%' }}
              columnDefs={loading ? columnsLoad : columns}
              defaultColDef={{ resizable: true, minWidth: 200 }}
              animateRows={true}
              getRowHeight={getRowHeight}
              onGridReady={(params) => {
                params.api.sizeColumnsToFit();
              }}
            />
          </div>
        </div>

        <div className="flex items-center justify-end">
          <CustomPagination
            page={page}
            limit={limit}
            setPage={setPage}
            setLimit={setLimit}
            count={databycompany?.total || 0}
            
          />
        </div>
      </div>
    </>
  );
};

export default CompanyPost;
