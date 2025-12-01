import React from 'react';
import { Skeleton } from '@mui/material';
import { AgGridReact } from 'ag-grid-react';
import { format } from 'date-fns';

const TodaysNewCompanyTable = ({ data, loading, search, themeMode, limit }) => {
  const columns = [
    {
      field: 'companyName',
      headerName: 'Company Name',
      width: 220,
      cellRenderer: (params) => <div>{params?.data?.companyName || '-'}</div>,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 240,
      cellRenderer: (params) => <div>{params?.data?.email || '-'}</div>,
    },
    {
      field: 'phoneNumber',
      headerName: 'Phone',
      width: 160,
      cellRenderer: (params) => <div>{params?.data?.phoneNumber || '-'}</div>,
    },
    {
      field: 'country',
      headerName: 'Country',
      width: 160,
      cellRenderer: (params) => <div>{params?.data?.country || '-'}</div>,
    },
    {
      field: 'companyType',
      headerName: 'Company Type',
      width: 160,
      cellRenderer: (params) => <div>{params?.data?.companyType || '-'}</div>,
    },
    {
      field: 'numberOfEmployees',
      headerName: 'Employees',
      width: 150,
      cellRenderer: (params) => <div>{params?.data?.numberOfEmployees || '-'}</div>,
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
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      cellRenderer: (params) => <div>{params?.data?.status ?? '-'}</div>,
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

export default TodaysNewCompanyTable;


