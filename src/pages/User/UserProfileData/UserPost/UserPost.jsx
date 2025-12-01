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
import { getAllPostbyUser } from '../../../../redux/actions/PostAction';
import { IoCloseSharp } from 'react-icons/io5';
import { MdEdit, MdVisibility } from 'react-icons/md';
import { TruncatedTextWithTooltip } from '../../../../components/TruncatedTextWithTooltip';
const MySwal = withReactContent(Swal);
const UserPost = () => {
  const [search, setSearch] = useState('');
  const [debounceTimer, setDebounceTimer] = useState(null);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const getRowHeight = (params) => (params.node.group ? 10 : 80);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const themeMode = useSelector((state) => state?.themeMode?.colorMode);
  const { databyuser, loading } = useSelector(
    (state) => state?.PostReducerDetails,
  );
  // console.log(databyuser);
  const serverurl = import.meta.env.VITE_SERVERURL;
  const location = useLocation();
  const user = location.state || {};
  // console.log('dsfsdfsdfsdf', user);
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
      headerName: 'Image',
      field: 'Image',
      width: 80,
      cellRenderer: (params) => (
        <div className=" mt-5 text-gray-800 text-base font-medium">
          <div className="break-words w-full max-w-xs">
            <img
              src={`${serverurl}/${params.data?.postImg}`}
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
      headerName: 'Post Description',
      field: 'postDesc',
      flex: 1,
      cellRenderer: (params) => (
        <div className="mt-5">
          <TruncatedTextWithTooltip 
            text={params.data?.postDesc || ''} 
            maxWords={10}
            className="break-words w-full max-w-xs text-sm"
          />
        </div>
      ),
    },

    {
      headerName: 'Action',
      width: 200,
      minWidth: 180,
      cellRenderer: (params) => (
        <div className="flex h-full items-start mt-5 justify-start gap-4">
          {/* {permission.view && permission.view.value && ( */}
            {/* <div
              className="cursor-pointer p-1 bg-primary hover:bg-blue-800 rounded-[4px] hover:scale-105"
              onClick={() => handleDisc(params.data?._id)}
            >
              <MdVisibility className="text-[20px] text-white" />
            </div> */}
          {/* )} */}
          {/* {permission?.edit && permission.edit.value && ( */}
            {/* <div
              className=" p-1 transition-all duration-200 bg-boxdark hover:bg-boxdark-4 dark:bg-[#2c74cc]  ease-in-out  dark:hover:bg-[#005dce]  rounded-[4px] hover:scale-105"
              onClick={() => hendleEdit(params.data)}
            >
              <MdEdit className="text-[20px] cursor-pointer text-white" />
            </div> */}
          {/* )} */}

          {/* {permission?.approve && permission.approve.value && ( */}
            <div
              className=" transition-all duration-200 bg-green-600  dark:bg-[#2c74cc] dark:hover:bg-[#005dce] hover:bg-green-700 p-1 rounded-[4px] cursor-pointer ease-in-out transform hover:scale-105"
              onClick={() => handleApprove(params.data)}
            >
              <FaCheck className="text-white text-xl" />
            </div>
          {/* )} */}
          {/* {permission?.reject && permission.reject.value && ( */}
            <div
              className="transition-all duration-200 bg-red-600  dark:bg-[#2c74cc] dark:hover:bg-[#005dce] p-1 rounded-[4px] cursor-pointer ease-in-out  hover:bg-red-700  transform hover:scale-105"
              onClick={() => handleReject(params.data)}
            >
              <IoCloseSharp className="text-white font-semibold text-xl" />
            </div>
          {/* )} */}
        </div>
      ),
    },
  ];
  const searchMyData = async () => {
    try {
      if (search.trim()) {
        dispatch(getAllPostbyUser(userId, page, limit));
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
      dispatch(getAllPostbyUser(userId, page, limit));
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
                loading ? Array(limit).fill({}) : databyuser?.posts || []
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
            count={databyuser?.total || 0}
            
          />
        </div>
      </div>
    </>
  );
};

export default UserPost;
