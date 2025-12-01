import React, { useEffect, useState } from 'react';
import { Skeleton } from '@mui/material';
import { AgGridReact } from 'ag-grid-react';
import { useSelector } from 'react-redux';
import useAdminManagement from '../../hooks/AdminManagement/useAdminManagement';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import { Button } from '@mui/material';
import TableSearch from '../../components/TableSearch';
import CustomPagination from '../../components/CustomPagination';
import CompanyTable from './CompanyTable';
import usePermissions from '../../hooks/usePermissions';
import { pageIds } from '../../common/Permission/PermissionData';
import noImageIcon from '../../images/noImage2.webp';
import useCompanyManagement from '../../hooks/Company/useCompanyManagement';
import CompanyModelPopup from '../../Model/CompanyModelPopup';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {
  getPendingCompany,
  updateCompany,
  updatePurchasedPlan,
} from '../../redux/actions/CompanyAction';
import { MdVisibility } from 'react-icons/md';
import { FaCheckCircle, FaEdit, FaTimesCircle } from 'react-icons/fa';
import { updatePost } from '../../redux/actions/PostAction';
import UpdatePlanDateDialog from '../../Model/UpdatePlanDateDialog';
import dayjs from 'dayjs';

const CompanyPending = () => {
  const serverurl = import.meta.env.VITE_SERVERURL;
  const permission = usePermissions(
    pageIds.CompanyManagement.id,
    pageIds.CompanyManagement.CompanyPending,
  );
  
  const columns = [
    {
      headerName: 'IMAGE',
      field: 'img',
      width: 20,
      cellRenderer: (params) => {
        return (
          <div className="flex h-full  items-center ">
            <img
              src={`${serverurl}/${params.data?.logoUrl}`}
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
      headerName: 'COMPANY NAME',
      field: 'companyName',
      width: 250,
      cellRenderer: (params) => {
        return <p>{params.data?.companyName}</p>;
      },
    },
    {
      headerName: 'EMAIL',
      field: 'email',
      //   width: 500,
      flex: 1,
      cellRenderer: (params) => {
        const searchTerm = search.trim().toLowerCase();
        const title = params.data?.email || '';

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
      headerName: 'INDUSTRY TYPE',
      field: 'industryType',
      width: 300,
      cellRenderer: (params) => {
        return <p>{params.data?.industryType}</p>;
      },
    },
    {
      headerName: 'COUNTRY',
      field: 'country',
      width: 200,
      cellRenderer: (params) => {
        return <p>{params.data?.country}</p>;
      },
    },
    {
      headerName: 'ISLGBTQ',
      field: 'isLgbtq',
      width: 50,
      cellRenderer: (params) => {
        return <p>{params.data?.isLGBTQFriendly ? 'Yes' : 'No'}</p>;
      },
    },
       {
          headerName: 'PURCHASED DATE',
          field: 'purchase_date',
          width: 150,
          cellRenderer: (params) => {
            const date = params.data?.purchase_date
              ? new Date(params.data.purchase_date).toLocaleDateString()
              : '';
            return (
              <div className="flex items-center gap-2">
                <p>{date}</p>
                {/* {date && (
                  <FaEdit
                    className="text-blue-500 cursor-pointer"
                    onClick={() => {
                      setSelectedDate(
                        params.data?.purchase_date?.split('T')[0] ||
                          dayjs().format('YYYY-MM-DD'),
                      );
                      setDateDialog({
                        open: true,
                        type: 'purchase_date',
                        company: params.data,
                      });
                    }}
                  />
                )} */}
              </div>
            );
          },
        },
        {
          headerName: 'EXPIRY DATE',
          field: 'expire_date',
          width: 150,
          cellRenderer: (params) => {
            const date = params.data?.expire_date
              ? new Date(params.data.expire_date).toLocaleDateString()
              : '';
            return (
              <div className="flex items-center gap-2">
                <p>{date}</p>
                {date && (
                  <FaEdit
                    className="text-blue-500 cursor-pointer"
                    onClick={() => {
                      setSelectedDate(
                        params.data?.expire_date?.split('T')[0] ||
                          dayjs().format('YYYY-MM-DD'),
                      );
                      setDateDialog({
                        open: true,
                        type: 'expire_date',
                        company: params.data,
                      });
                    }}
                  />
                )}
              </div>
            );
          },
        },
    ...(permission?.view?.value || permission?.approve?.value || permission?.reject?.value
      ? [
        {
          headerName: 'VIEW',
          width: 200,
          minWidth: 180,
          cellRenderer: (params) => {
            console.log("Rendering cell with params:", params);
            return (
              <div className="flex h-full items-start justify-start gap-4 mt-1">
                {permission.view?.value && (
                  <div
                    className="cursor-pointer p-1 bg-primary hover:bg-blue-800 rounded-[4px] hover:scale-105"
                    onClick={() => {
                      console.log('View clicked:', params.data);
                      handleDisc(params.data);
                    }}
                  >
                    <MdVisibility className="text-[20px] text-white" />
                  </div>
                )}
          
                {permission.approve?.value && (
                  <div
                    className="cursor-pointer rounded-full hover:bg-green-100 transition-transform duration-200 ease-in-out transform hover:scale-105"
                    onClick={() => {
                      // console.log("Approve clicked:", params.data);
                      handleApprove(params.data);
                    }}
                  >
                    <FaCheckCircle className="text-green-600 text-2xl" />
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
            );
          }
          
        },
      ]
      : []),
  ];
  const columnsLoad = [
    { headerName: 'Name', flex: 1, cellRenderer: () => <Skeleton /> },
    { headerName: 'Email', flex: 1, cellRenderer: () => <Skeleton /> },
    { headerName: 'Action', width: 120, cellRenderer: () => <Skeleton /> },
  ];
  const is_pending = 1;

  const [search, setSearch] = useState('');
  const [lastserch, setLastSearch] = useState(false);
  const [debounceTimer, setDebounceTimer] = useState(null);
  const [page, setPage] = useState(0);
  const [MembershipdesData, setMembershipdesData] = useState(null);
  const [limit, setLimit] = useState(10);
  const MySwal = withReactContent(Swal);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const [dateDialog, setDateDialog] = useState({
    open: false,
    type: '',
    company: null,
  });
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format('YYYY-MM-DD'),
  );

  const { data, loading } = useSelector(
    (state) => state?.CompanyReducerDetails,
  );
  // console.log(data, 'data');

  const themeMode = useSelector((state) => state?.themeMode?.colorMode);

  useEffect(() => {
    dispatch(getPendingCompany('', is_pending, page, limit));
  }, [is_pending, page, limit]);

  useEffect(() => {
    if (search !== '') {
      setLastSearch(true);
      if (debounceTimer) clearTimeout(debounceTimer);
      const timer = setTimeout(() => {
        dispatch(getPendingCompany(search, is_pending, page, limit));
      }, 400);
      setDebounceTimer(timer);
      return () => clearTimeout(timer);
    } else {
      if (lastserch) {
        dispatch(getPendingCompany('', is_pending, page, limit));
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

    const handleDisc = async (item) => {
        // console.log('View clicked, id:', id);
      navigate('/companydetail', { state: item });
  };
  const handleReject = (item) => {
    console.log('Reject clicked, item:', item);
    MySwal.fire({
      title: 'Are you sure you want to reject?',
      text: 'Please provide a reason for rejection:',
      icon: 'question',
      input: 'textarea', // Adding input for reason
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
        const formData = new FormData();
        formData.append('status', 3); // Append the reason
        const payload = {
          status: 3,
          adminReason: result.value,
        };
        dispatch(updateCompany(item._id, payload))
          .then((res) => {
            if (res.success) {
              toast.success('Company rejected successfully');
              navigate('/companyrejected');
            }
          })
          .catch(() => toast.error('An error occurred while rejecting'));
      }
    });
  };
  const handleApprove = (item) => {
    console.log('Approve clicked, item:', item);
    MySwal.fire({
      title: 'Approve this company?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, approve it!',
    }).then((result) => {
      if (result.isConfirmed) {
        // console.log(item,"afsdfsd");
        const formData = new FormData();
        formData.append('status', 2);
        dispatch(updateCompany(item._id, formData))
          .then((res) => {
            if (res.success) {
              toast.success('Company approved successfully');

              navigate('/companyapprove');
            } else {
              toast.error('Failed to approve company: ' + res.message);
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
      <Breadcrumb pageName="Pending Company" />
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
            rowData={loading ? Array(limit).fill({}) : data?.Companys || []}
            columnDefs={loading ? columnsLoad : columns}
            defaultColDef={{ resizable: true ,minWidth: 120  }}
            animateRows={true}
            onGridReady={(params) => {
              params.api.sizeColumnsToFit();
            }}
          />
        </div>
        {console.log(data?.Companys)}
        
        {data?.total > 0 && (
          <div className="flex items-center justify-end">
            <CustomPagination
              page={page}
              limit={limit}
              setPage={setPage}
              setLimit={setLimit}
              count={data?.total || 0}
            />
          </div>
        )}
      </div>
      {open && (
        <CompanyModelPopup
          open={open}
          onClose={() => setOpen(false)}
          description={MembershipdesData}
        />
      )}
       <UpdatePlanDateDialog
        open={dateDialog.open}
        type={dateDialog.type}
        company={dateDialog.company}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        onClose={() => setDateDialog({ open: false, type: "", company: null })}
        onSave={(payload) => {
          console.log("📌 Payload before API:", payload);
          dispatch(updatePurchasedPlan(payload)).then((res) => {
            if (res.success) {
              toast.success("Plan date updated successfully");
              dispatch(getPendingCompany(search, is_pending, page, limit));
            } else {
              toast.error(res.message || "Update failed");
            }
            setDateDialog({ open: false, type: "", company: null });
          });
        }}
        />
    </DefaultLayout>
  );
};

export default CompanyPending;
