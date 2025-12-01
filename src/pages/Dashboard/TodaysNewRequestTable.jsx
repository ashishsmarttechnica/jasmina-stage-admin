import React from 'react';
import { Skeleton } from '@mui/material';
import { AgGridReact } from 'ag-grid-react';
import { format } from 'date-fns';

const TodaysNewRequestTable = ({ data, loading, search, themeMode, limit }) => {
  const statusMap = { 1: 'Pending', 2: 'Approved', 3: 'Rejected' };
  const columns = [
    {
      field: 'companyName',
      headerName: 'Company Name',
      width: 220,
      cellRenderer: (params) => <div>{params?.data?.companyId?.companyName || '-'}</div>,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 240,
      cellRenderer: (params) => <div>{params?.data?.companyId?.email || '-'}</div>,
    },
    {
      field: 'oldEmployeeSize',
      headerName: 'Old Employees',
      width: 150,
      cellRenderer: (params) => {
        const min = params?.data?.oldEmployeeSize?.min;
        const max = params?.data?.oldEmployeeSize?.max;
        return <div>{min != null && max != null ? `${min}-${max}` : '-'}</div>;
      },
    },
    {
      field: 'newEmployeeSize',
      headerName: 'New Employees',
      width: 150,
      cellRenderer: (params) => {
        const min = params?.data?.newEmployeeSize?.min;
        const max = params?.data?.newEmployeeSize?.max;
        return <div>{min != null && max != null ? `${min}-${max}` : '-'}</div>;
      },
    },
    {
      field: 'oldMembershipId',
      headerName: 'Old Membership',
      width: 180,
      cellRenderer: (params) => <div>{params?.data?.oldMembershipId?.title || '-'}</div>,
    },
    {
      field: 'newMembershipId',
      headerName: 'New Membership',
      width: 180,
      cellRenderer: (params) => <div>{params?.data?.newMembershipId?.title || '-'}</div>,
    },
    {
      field: 'companyReason',
      headerName: 'Reason',
      width: 200,
      cellRenderer: (params) => <div>{params?.data?.companyReason || '-'}</div>,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      cellRenderer: (params) => <div>{statusMap[params?.data?.status] ?? '-'}</div>,
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      width: 180,
      cellRenderer: (params) => (
        <div>
          {params?.data?.createdAt ? format(new Date(params.data.createdAt), 'MMM dd, yyyy') : ''}
        </div>
      ),
    },
  ];

  const columnsLoad = columns.map((col) => ({
    ...col,
    cellRenderer: () => <Skeleton />,
  }));

  return (
    <div
      className={`${themeMode === 'dark' ? 'ag-theme-quartz-dark' : 'ag-theme-quartz'}`}
      style={{ width: '100%', height: '100%' }}
    >
      <AgGridReact
        rowData={loading ? Array(limit).fill({}) : data?.data?.planData || []}
        columnDefs={loading ? columnsLoad : columns}
        defaultColDef={{ resizable: true, minWidth: 120, maxWidth: 170 }}
        animateRows={true}
        onGridReady={(params) => {
          params.api.sizeColumnsToFit();
        }}
      />
    </div>
  );
};

export default TodaysNewRequestTable;


