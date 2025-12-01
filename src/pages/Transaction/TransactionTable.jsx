import React from 'react';
import { Button, Skeleton } from '@mui/material';
import { AgGridReact } from 'ag-grid-react';
import { format } from 'date-fns';

const TransactionTable = ({
  data,
  loading,
  handleDelete,
  handleEdit,
  handleDetails,
  search,
  themeMode,
  permission,
  limit,
}) => {
  // console.log(data);
  const columns = [
    {
      field:'company_name',
      headerName:'Company Name',
      width:250,
      cellRenderer: (params) => {
        const searchTerm = search.trim().toLowerCase();
        const title = params?.data.companyId.companyName || '';

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
      field: 'transactionId',
      headerName: 'Transaction ID',
      flex:1,
    },
    {
      field: 'title',
      headerName: 'Plan Title',
      width: 250,
      cellRenderer: (params) => {
        const searchTerm = search.trim().toLowerCase();
        const title = params?.data.title || '';

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
      field: 'price',
      headerName: 'Price',
      width: 150,
      cellRenderer: (params) => (
        <p>${params?.data.price}</p>
      ),
    },
    {
      field: 'payment_status',
      headerName: 'Payment Status',
      width: 150,
      cellRenderer: (params) => (
        <div className="flex h-full items-center">
          <span className={`inline-flex rounded-full border py-1 px-3 text-sm font-medium ${
            params.data?.payment_status === 'success' 
              ? 'border-[#3CA745] text-[#3CA745]' 
              : 'border-[#DC3545] text-[#DC3545]'
          }`}>
            {params.data?.payment_status}
          </span>
        </div>
      ),
    },
    {
      field: 'purchase_date',
      headerName: 'Purchase Date',
      width: 180,
      cellRenderer: (params) => (
        <div>
          {params.data?.purchase_date ? format(new Date(params.data.purchase_date), 'MMM dd, yyyy') : ''}
        </div>
      ),
    },
    {
      field: 'expire_date',
      headerName: 'Expiry Date',
      width: 180,
      cellRenderer: (params) => (
        <div>
          {params.data?.expire_date ? format(new Date(params.data.expire_date), 'MMM dd, yyyy') : ''}
        </div>
      ),
    },
  
  ];

  const columnsLoad = [
    {
      headerName: 'Transaction ID',
      width: 150,
      cellRenderer: () => <Skeleton />,
    },
    {
      headerName: 'Plan Title',
      flex: 1,
      cellRenderer: () => <Skeleton />,
    },
    {
      headerName: 'Price',
      width: 120,
      cellRenderer: () => <Skeleton />,
    },
    {
      headerName: 'Payment Status',
      width: 130,
      cellRenderer: () => <Skeleton />,
    },
    {
      headerName: 'Purchase Date',
      width: 150,
      cellRenderer: () => <Skeleton />,
    },
    {
      headerName: 'Expiry Date',
      width: 150,
      cellRenderer: () => <Skeleton />,
    },
   
  ];

  return (
    <div
      className={`${
        themeMode == 'dark' ? 'ag-theme-quartz-dark' : 'ag-theme-quartz'
      }`}
      style={{ width: '100%', height: '100%' }}
    >
      <AgGridReact
        rowData={loading ? Array(limit).fill({}) : data?.data || []}
        columnDefs={loading ? columnsLoad : columns}
        defaultColDef={{ resizable: true, minWidth: 120 }}
        animateRows={true}
        onGridReady={(params) => {
          params.api.sizeColumnsToFit();
        }}
      />
    </div>
  );
};

export default TransactionTable; 