import React, { useEffect, useState } from 'react';
import { Skeleton } from '@mui/material';
import { AgGridReact } from 'ag-grid-react';
import { useSelector, useDispatch } from 'react-redux';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import TableSearch from '../../components/TableSearch';
import CustomPagination from '../../components/CustomPagination';
import usePermissions from '../../hooks/usePermissions';
import { pageIds } from '../../common/Permission/PermissionData';
import { MdVisibility } from 'react-icons/md';
import { approveRejectPlanRequest, getAllChangePlan } from '../../redux/actions/ChangePlanAction';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { FaExclamation } from 'react-icons/fa';
import ReasonModal from '../../Model/ReasonModal';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useNavigate } from 'react-router-dom';
const PlanRequestRejected = () => {
  const permission = usePermissions(
    pageIds.PlanRequestManagement.id,
    pageIds.PlanRequestManagement.PlanRequestRejected,
  );
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();


  const columns = [
    {
      headerName: 'COMPANY NAME',
      field: 'companyName',
      width: 200,
      cellRenderer: (params) => {
        const searchTerm = search.trim().toLowerCase();
        const title = params.data?.companyId?.companyName || '';

        if (searchTerm && title.toLowerCase().includes(searchTerm)) {
          const regex = new RegExp(`(${searchTerm})`, 'gi');
          const highlightedTitle = title.replace(
            regex,
            `<span class='bg-[#ff0] text-black-2 rounded-[4px]'>$1</span>`,
          );

          return <div dangerouslySetInnerHTML={{ __html: highlightedTitle }} />;
        }

        return <div>{title}  </div>;
      },
    },
    {
      headerName: 'CURRENT PLAN',
      field: 'currentPlan',
      width: 180,
      cellRenderer: (params) => {
        return <p>{params.data?.oldMembershipId?.title}</p>;
      },
    },
    {
      headerName: 'REQUESTED PLAN',
      field: 'requestedPlan',
      flex: 1,
      cellRenderer: (params) => {
        return <p>{params.data?.newMembershipId?.title}</p>;
      },
    },
    {
      headerName: 'CURRENT SIZE',
      field: 'currentSize',
      width: 150,
      cellRenderer: (params) => {
        const size = params.data?.oldEmployeeSize;
        return <p>{size ? `${size.min}-${size.max}` : ''}</p>;
      },
    },
    {
      headerName: 'NEW SIZE',
      field: 'newSize',
      width: 150,
      cellRenderer: (params) => {
        const size = params.data?.newEmployeeSize;
        return <p>{size ? `${size.min}-${size.max}` : ''}</p>;
      },
    },
    {
      headerName: 'REASON',
      field: 'companyReason',
      width: 200,
      cellRenderer: (params) => {
        return <p>{params.data?.companyReason}</p>;
      },
    },
    {
      headerName: 'REQUEST DATE',
      field: 'requestDate',
      width: 150,
      cellRenderer: (params) => {
        return <p>{params.data?.createdAt ? new Date(params.data?.createdAt).toLocaleDateString() : '-'}</p>;
      },
    },
    ...(permission?.view?.value
      ? [
          {
            headerName: 'VIEW',
            width: 120,
            cellRenderer: (params) => (
              <div className="flex h-full items-start justify-start gap-4">
                {console.log(params.data,"params.data")}
                {permission.view?.value && (
                  <div
                    className="cursor-pointer mt-1 p-1 bg-primary hover:bg-blue-800 rounded-[4px] hover:scale-105"
                    onClick={() => handleView(params.data?.companyId?._id)}
                  >
                    <MdVisibility className="text-[20px] text-white" />
                  </div>
                )}
                  {/* {permission.approve?.value && (
                  <div
                    className="cursor-pointer  rounded-full hover:bg-green-100 transition-transform duration-200 ease-in-out transform hover:scale-105"
                    onClick={() => handleApprove(params.data)}
                  >
                    <FaCheckCircle className="text-green-600 text-2xl" />
                  </div>
                )} */}
              {permission.reject?.value && (
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
    { headerName: 'Name', flex: 1, cellRenderer: () => <Skeleton /> },
    { headerName: 'Current Plan', flex: 1, cellRenderer: () => <Skeleton /> },
    { headerName: 'Requested Plan', flex: 1, cellRenderer: () => <Skeleton /> },
    { headerName: 'Rejection Reason', flex: 1, cellRenderer: () => <Skeleton /> },
    { headerName: 'Action', width: 120, cellRenderer: () => <Skeleton /> },
  ];

  const [search, setSearch] = useState('');
  const [lastserch, setLastSearch] = useState(false);
  const [debounceTimer, setDebounceTimer] = useState(null);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const dispatch = useDispatch();

  const { data, loading } = useSelector((state) => state?.ChangePlanReducerDetails);
  const themeMode = useSelector((state) => state?.themeMode?.colorMode);
  const status = 3; // 3 for rejected requests
  const pagination = data?.data?.pagination;
// console.log(data);
// console.log(pagination);
  useEffect(() => {
    dispatch(getAllChangePlan(status, page, limit, search));
  }, [status, page, limit]);

  useEffect(() => {
    if (search !== '') {
      setLastSearch(true);
      if (debounceTimer) clearTimeout(debounceTimer);
      const timer = setTimeout(() => {
        dispatch(getAllChangePlan(status, page, limit, search.trim()));
      }, 400);
      setDebounceTimer(timer);
      return () => clearTimeout(timer);
    } else {
      if (lastserch) {
        dispatch(getAllChangePlan(status, page, limit, search.trim()));
        setLastSearch(false);
      }
    }
  }, [search]);

  const handleApprove = (item) => {
    MySwal.fire({
      title: 'Are you sure you want to approve this request?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, approve it!',
      customClass: {
        popup: themeMode == 'dark' ? 'swal2-dark' : 'swal2-light',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(approveRejectPlanRequest({
          companyId: item.companyId?._id || item.companyId,
          requestId: item._id,
          status: 2,
        }))
          .then((res) => {
            if (res.success) {
              toast.success('Request approved successfully');
              navigate('/planrequest/approved');
            }
          })
          .catch(() => toast.error('An error occurred while approving'));
      }
    });
  };
  const handleView = (id) => {
    console.log('View clicked, id:', id);
      navigate('/companydetail', { state: id });
  };

  
  const [showReasonModal, setShowReasonModal] = useState(false);
  const [currentReason, setCurrentReason] = useState('');

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Rejected Plan Requests" />
      <div className="rounded-sm border border-b-0 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-1 table_no_overflow ">
        <header className="flex flex-col sm:flex-row justify-end items-center px-2 ">
          <TableSearch search={search} setSearch={setSearch} />
        </header>
      </div>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-1 table_no_overflow">
        <div
          className={`${
            themeMode == 'dark' ? 'ag-theme-quartz-dark ' : 'ag-theme-quartz'
          } `}
          style={{ width: '100%', height: '100%' }}
        >
          <AgGridReact
            rowData={loading ? Array(limit).fill({}) : data?.data?.request || []}
            columnDefs={loading ? columnsLoad : columns}
            defaultColDef={{ resizable: true, minWidth: 200 }}
            animateRows={true}
            onGridReady={(params) => {
              params.api.sizeColumnsToFit();
            }}
          />
        </div>
        {pagination?.totalItems > 0 && (
          <div className="flex items-center justify-end">
            <CustomPagination
              page={page}
              limit={limit}
              setPage={setPage}
              setLimit={setLimit}
              count={pagination?.totalItems || 0}
            />
          </div>
        )}
      </div>
      <ReasonModal
        open={showReasonModal}
        onClose={() => setShowReasonModal(false)}
        reason={currentReason}
      />
    </DefaultLayout>
  );
};

export default PlanRequestRejected; 