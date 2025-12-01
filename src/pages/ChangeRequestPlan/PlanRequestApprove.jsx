import React, { useEffect, useState } from 'react';
import { Skeleton } from '@mui/material';
import { AgGridReact } from 'ag-grid-react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import TableSearch from '../../components/TableSearch';
import CustomPagination from '../../components/CustomPagination';
import usePermissions from '../../hooks/usePermissions';
import { pageIds } from '../../common/Permission/PermissionData';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { MdVisibility } from 'react-icons/md';
import { FaTimesCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { getAllChangePlan, updateChangePlan, approveRejectPlanRequest } from '../../redux/actions/ChangePlanAction';
import { FaCheckCircle } from 'react-icons/fa';

const PlanRequestApprove = () => {
  const permission = usePermissions(
    pageIds.PlanRequestManagement.id,
    pageIds.PlanRequestManagement.PlanRequestApprove,
  );

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
      field: 'reason',
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
        return <p>{new Date(params.data?.createdAt).toLocaleDateString()}</p>;
      },
    },
    ...(permission?.view?.value || permission?.reject?.value || permission?.approve?.value
      ? [
          {
            headerName: 'ACTIONS',
            width: 180,
            cellRenderer: (params) => (
              <div className="flex h-full items-start justify-start gap-4">
                {permission.view?.value && (
                  <div
                    className="cursor-pointer mt-1 p-1 bg-primary hover:bg-blue-800 rounded-[4px] hover:scale-105"
                    onClick={() => handleView(params.data?.companyId?._id)}
                  >
                    <MdVisibility className="text-[20px] text-white" />
                  </div>
                )}
                {permission.approve?.value && (
                  <div
                    className="cursor-pointer rounded-full hover:bg-green-100 transition-transform duration-200 ease-in-out transform hover:scale-105"
                    onClick={() => handleApprove(params.data)}
                  >
                    <FaCheckCircle className="text-green-600 text-2xl" />
                  </div>
                )}
                {/* {permission.reject?.value && (
                  <div
                    className="cursor-pointer rounded-full hover:bg-red-100 transition-transform duration-200 ease-in-out transform hover:scale-105"
                    onClick={() => handleReject(params.data)}
                  >
                    <FaTimesCircle className="text-red-600 text-2xl" />
                  </div>
                )} */}
              </div>
            ),
          },
        ]
      : []),
  ];

  const columnsLoad = [
    { headerName: 'Company Name', flex: 1, cellRenderer: () => <Skeleton /> },
    { headerName: 'Current Plan', flex: 1, cellRenderer: () => <Skeleton /> },
    { headerName: 'Requested Plan', flex: 1, cellRenderer: () => <Skeleton /> },
    { headerName: 'Current Size', flex: 1, cellRenderer: () => <Skeleton /> },
    { headerName: 'New Size', flex: 1, cellRenderer: () => <Skeleton /> },
    { headerName: 'Reason', flex: 1, cellRenderer: () => <Skeleton /> },
    { headerName: 'Request Date', flex: 1, cellRenderer: () => <Skeleton /> },
    { headerName: 'Action', width: 150, cellRenderer: () => <Skeleton /> },
  ];

  const [search, setSearch] = useState('');
  const [lastserch, setLastSearch] = useState(false);
  const [debounceTimer, setDebounceTimer] = useState(null);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const MySwal = withReactContent(Swal);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, loading } = useSelector((state) => state?.ChangePlanReducerDetails);
  const themeMode = useSelector((state) => state?.themeMode?.colorMode);
  const status = 2; // 2 for approved requests
  const pagination = data?.data?.pagination;
// console.log(data);
// console.log(pagination);
  useEffect(() => {
    dispatch(getAllChangePlan(status, page, limit,search));
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
        dispatch(getAllChangePlan(status, page, limit, search));
        setLastSearch(false);
      }
    }
  }, [search]);

  const handleView = (id) => {
    navigate('/companydetail', { state: id });
  };

  // const handleReject = (item) => {
  //   MySwal.fire({
  //     title: 'Are you sure you want to reject?',
  //     text: 'Please provide a reason for rejection:',
  //     icon: 'question',
  //     input: 'textarea',
  //     inputPlaceholder: 'Type your reason here...',
  //     showCancelButton: true,
  //     confirmButtonText: 'Yes, reject it!',
  //     inputValidator: (value) => {
  //       if (!value) {
  //         return 'You need to write a reason!';
  //       }
  //     },
  //     customClass: {
  //       popup: themeMode == 'dark' ? 'swal2-dark' : 'swal2-light',
  //     },
  //   }).then((result) => {
  //     if (result.isConfirmed && result.value) {
  //       dispatch(updateChangePlan(item._id, { status: 3, rejectionReason: result.value }))
  //         .then((res) => {
  //           if (res.success) {
  //             toast.success('Request rejected successfully');
  //             navigate('/planrequest/rejected');
  //           }
  //         })
  //         .catch(() => toast.error('An error occurred while rejecting'));
  //     }
  //   });
  // };
  const handleReject = (item) => {
    console.log(item,"itemitemitemitemitem");
    
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
      customClass: {
        popup: themeMode == 'dark' ? 'swal2-dark' : 'swal2-light',
      },
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        dispatch(approveRejectPlanRequest({
          companyId: item.companyId?._id || item.companyId,
          requestId: item._id,
          status: 3,
          rejectionReason: result.value,
        }))
          .then((res) => {
            if (res.success) {
              toast.success('Request rejected successfully');
              navigate('/planrequest/rejected');
            }
          })
          .catch(() => toast.error('An error occurred while rejecting'));
      }
    });
  };

  const handleApprove = (item) => {
    MySwal.fire({
      title: 'Are you sure you want to approve?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, approve it!',
      customClass: {
        popup: themeMode == 'dark' ? 'swal2-dark' : 'swal2-light',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(approveRejectPlanRequest({
          companyId: item.companyId?._id,
          requestId: item._id,
          status: 2, // 2 for approved
          rejectionReason: '',
        }))
          .then((res) => {
            if (res.success) {
              toast.success('Request approved successfully');
              dispatch(getAllChangePlan(status, page, limit));
            }
          })
          .catch(() => toast.error('An error occurred while approving'));
      }
    });
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Approved Plan Requests" />
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
            defaultColDef={{ resizable: true, minWidth: 150 }}
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
    </DefaultLayout>
  );
};

export default PlanRequestApprove; 