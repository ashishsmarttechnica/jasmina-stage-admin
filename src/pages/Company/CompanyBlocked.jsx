import React, { useEffect, useState } from 'react';
import { Skeleton } from '@mui/material';
import { AgGridReact } from 'ag-grid-react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import TableSearch from '../../components/TableSearch';
import CustomPagination from '../../components/CustomPagination';
import usePermissions from '../../hooks/usePermissions';
import { pageIds } from '../../common/Permission/PermissionData';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { Toggle } from 'rsuite';
import { getPendingCompany, updateCompany } from '../../redux/actions/CompanyAction';

const CompanyBlocked = () => {
  const permission = usePermissions(
    pageIds.CompanyManagement.id,
    pageIds.CompanyManagement.CompanyBlocked,
  );

  const [search, setSearch] = useState('');
  const [lastserch, setLastSearch] = useState(false);
  const [debounceTimer, setDebounceTimer] = useState(null);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const MySwal = withReactContent(Swal);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const themeMode = useSelector((state) => state?.themeMode?.colorMode);
  const { data, loading } = useSelector((state) => state?.CompanyReducerDetails);

  const is_blocked_status = 4;

  useEffect(() => {
    dispatch(getPendingCompany('', is_blocked_status, page, limit));
  }, [is_blocked_status, page, limit]);

  useEffect(() => {
    if (search !== '') {
      setLastSearch(true);
      if (debounceTimer) clearTimeout(debounceTimer);
      const timer = setTimeout(() => {
        dispatch(getPendingCompany(search, is_blocked_status, page, limit));
      }, 400);
      setDebounceTimer(timer);
      return () => clearTimeout(timer);
    } else {
      if (lastserch) {
        dispatch(getPendingCompany('', is_blocked_status, page, limit));
        setLastSearch(false);
      }
    }
  }, [search]);

  const handleToggleChange = async (checked, row) => {
    const id = row?._id;
    if (!id) return;
    // When checked=false, we are unblocking (set status to 2)
    const nextStatus = checked ? 4 : 2;
    MySwal.fire({
      title: checked ? 'Are you sure you want to keep blocked?' : 'Are you sure you want to unblock this company?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: checked ? 'Yes' : 'Yes, Unblock',
      customClass: {
        popup: themeMode == 'dark' ? 'swal2-dark' : 'swal2-light',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const payload = { status: nextStatus };
        dispatch(updateCompany(id, payload)).then((res) => {
          if (res?.success) {
            toast.success(res.message || 'Updated');
            // Navigate to companyApprove when unblocking (checked=false)
            if (!checked) {
              navigate('/companyApprove');
            }
            dispatch(getPendingCompany(search, is_blocked_status, page, limit));
          }
        });
      }
    });
  };

  const columns = [
    {
      headerName: 'Company Name',
      field: 'companyName',
      width: 250,
      cellRenderer: (params) => <p>{params.data?.companyName}</p>,
    },
    {
      headerName: 'Email',
      field: 'email',
      flex: 1,
      cellRenderer: (params) => <p>{params.data?.email}</p>,
    },
    {
      headerName: 'Blocked',
      field: 'status',
      width: 140,
      cellRenderer: (params) => {
        const id = params?.data?._id;
        const status = params?.data?.status;
        const isBlocked = Number(status) === 4;
        return (
          <div className="flex items-center h-full">
            <Toggle size="sm" checked={isBlocked} onChange={(val) => handleToggleChange(val, params.data)} />
          </div>
        );
      },
    },
  ];

  const columnsLoad = [
    { headerName: 'Company Name', width: 250, cellRenderer: () => <Skeleton /> },
    { headerName: 'Email', flex: 1, cellRenderer: () => <Skeleton /> },
    { headerName: 'Blocked', width: 140, cellRenderer: () => <Skeleton /> },
  ];

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Blocked Company" />
      <div className="rounded-sm border border-b-0 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-1 table_no_overflow ">
        <header className="flex flex-col sm:flex-row justify-end items-center px-2">
          <TableSearch search={search} setSearch={setSearch} />
        </header>
      </div>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-1 table_no_overflow">
        <div className={`${themeMode == 'dark' ? 'ag-theme-quartz-dark ' : 'ag-theme-quartz'} `} style={{ width: '100%', height: '100%' }}>
          <AgGridReact
            rowData={loading ? Array(limit).fill({}) : data?.Companys || []}
            columnDefs={loading ? columnsLoad : columns}
            defaultColDef={{ resizable: true, minWidth: 200 }}
            animateRows={true}
            onGridReady={(params) => params.api.sizeColumnsToFit()}
          />
        </div>
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
    </DefaultLayout>
  );
};

export default CompanyBlocked;


