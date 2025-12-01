import React from 'react';
import { Skeleton } from '@mui/material';
import { AgGridReact } from 'ag-grid-react';
import { format } from 'date-fns';

const ExpiredPlanTable = ({
  data,
  loading,
  search,
  themeMode,
  permission,
  limit,
}) => {
  const columns = [
    {
      field: 'company_name',
      headerName: 'Company Name',
      width: 250,
      cellRenderer: (params) => (
        <div>{params?.data?.companyId?.companyName || '-'}</div>
      ),
    },
    // {
    //   field: 'transactionId',
    //   headerName: 'Transaction ID',
    //   flex: 1,
    // },
    {
      field: 'title',
      headerName: 'Plan Title',
      width: 250,
      cellRenderer: (params) => (
        <div>{params?.data?.title || '-'}</div>
      ),
    },
    {
      field: 'purchase_date',
      headerName: 'Purchase Date',
      width: 180,
      cellRenderer: (params) => (
        <div>
          {params?.data?.purchase_date
            ? format(new Date(params.data.purchase_date), 'MMM dd, yyyy')
            : ''}
        </div>
      ),
    },
    {
      field: 'expire_date',
      headerName: 'Expiry Date',
      width: 180,
      cellRenderer: (params) => (
        <div>
          {params?.data?.expire_date
            ? format(new Date(params.data.expire_date), 'MMM dd, yyyy')
            : ''}
        </div>
      ),
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 150,
      cellRenderer: (params) => (
        <p>${params?.data?.price || 0}</p>
      ),
    },
    // {
    //   field: 'payment_status',
    //   headerName: 'Payment Status',
    //   width: 150,
    //   cellRenderer: (params) => (
    //     <div className="flex h-full items-center">
    //       <span
    //         className={`inline-flex rounded-full border py-1 px-3 text-sm font-medium ${
    //           params?.data?.payment_status === 'success'
    //             ? 'border-[#3CA745] text-[#3CA745]'
    //             : 'border-[#DC3545] text-[#DC3545]'
    //         }`}
    //       >
    //         {params?.data?.payment_status}
    //       </span>
    //     </div>
    //   ),
    // },
    
  ];

  const columnsLoad = columns.map((col) => ({
    ...col,
    cellRenderer: () => <Skeleton />,
  }));

  return (
    <div
      className={`${
        themeMode === 'dark' ? 'ag-theme-quartz-dark' : 'ag-theme-quartz'
      }`}
      style={{ width: '100%', height: '100%' }}
    >
      <AgGridReact
        rowData={loading ? Array(limit).fill({}) : data?.data?.planData || []}
        columnDefs={loading ? columnsLoad : columns}
        defaultColDef={{ resizable: true, minWidth: 120, maxWidth:170 }}
        animateRows={true}
        onGridReady={(params) => {
          params.api.sizeColumnsToFit();
        }}
      />
    </div>
  );
};

export default ExpiredPlanTable;
