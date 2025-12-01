import React from 'react';
import { Button, Skeleton } from '@mui/material';
import { AgGridReact } from 'ag-grid-react';
import { MdDelete, MdEdit, MdEditSquare, MdKey } from 'react-icons/md';

const RequestPlanTable = ({
  data,
  loading,
  handleDelete,
  handleEdit,
  search,
  themeMode,
  handleDiscd,
  permission,
  limit,
}) => {
  const columns = [
    {
      field: 'information_name',
      headerName: 'Name',
      flex: 1,

      cellRenderer: (params) => {
        // Check if the search term exists and is not empty
        const searchTerm = search.trim().toLowerCase();
        const page_title = params?.data.page_title || '';

        // If search term is found in the URL, highlight it
        if (searchTerm && page_title.toLowerCase().includes(searchTerm)) {
          // Split the URL around the search term
          const regex = new RegExp(`(${searchTerm})`, 'gi');
          const highlightedURL = page_title.replace(
            regex,
            `<span class=' bg-[#ff0] text-black-2 rounded-[4px] '>$1</span>`,
          );

          return <div dangerouslySetInnerHTML={{ __html: highlightedURL }} />;
        }

        return <div>{page_title}</div>;
      },
    },
    {
      field: 'path',
      headerName: 'Path',
      width: 300,
      cellRenderer: (params) => <p>{params?.data.path}</p>,
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 230,
      cellRenderer: (params) => (
        <div className="flex h-full items-center ">
          {/* <Button
            onClick={() => handleDiscd(params.data?._id)}
            variant="contained"
            size="small"
          >
            Description
          </Button> */}
           <p>{params?.data.description}</p>
        </div>
      ),
    },
    {
      headerName: 'Active',
      field: 'isActive',
      width: 120,
      cellRenderer: (params) => (
        <div className="flex h-full items-center ">
          <label className="relative inline-flex  cursor-pointer">
            {params.data?.status === 1 ? (
              <span className="inline-flex rounded-full border border-[#3CA745] py-1 px-3 text-sm font-medium text-[#3CA745] hover:opacity-80">
                Active
              </span>
            ) : (
              <span className="inline-flex rounded-full border border-[#DC3545] py-1 px-3 text-sm font-medium text-[#DC3545] hover:opacity-80">
                Inactive
              </span>
            )}
          </label>
        </div>
      ),
    },
    // 
    ...(permission?.remove?.value || permission?.edit?.value
      ? [
          {
            field: 'action',
            headerName: 'Action',
            width: 120,
            cellRenderer: (params) => {
              console.log("Action Cell Params:", params.data._id); // 👈 Console log added here
              return (
                <div className="flex items-center h-full gap-2">
                  {permission.edit && permission.edit.value && (
                    <div
                      className="p-1 transition-all duration-200 bg-boxdark hover:bg-boxdark-2 dark:bg-[#2c74cc] dark:hover:bg-[#005dce] rounded-[4px]"
                      onClick={() => handleEdit(params.data)}
                    >
                      <MdEdit className="text-[20px] cursor-pointer text-white" />
                    </div>
                  )}
                  {permission.remove && permission.remove.value && (
                    <div
                      className="p-1 transition-all duration-200 bg-red-500 hover:bg-red-600 rounded-[4px]"
                      onClick={() => handleDelete(params.data._id)}
                    >
                      <MdDelete className="text-[20px] cursor-pointer text-white" />
                    </div>
                  )}
                </div>
              );
            },
          },
        ]
      : []),
    
  ];

  const columnsLoad = [
    {
      headerName: 'Name',
      flex: 1,
      cellRenderer: () => <Skeleton />,
    },
    {
      headerName: 'Path',
      width: 300,
      cellRenderer: () => <Skeleton />,
    },
    {
      headerName: 'Description',
      width: 230,
      cellRenderer: () => <Skeleton />,
    },
    {
      field: 'isActive',
      width: 120,
      cellRenderer: () => <Skeleton />,
    },
    {
      field: 'action',
      width: 120,
      cellRenderer: () => <Skeleton />,
    },
  ];

  return (
    <div
      className={`${
        themeMode == 'dark' ? 'ag-theme-quartz-dark ' : 'ag-theme-quartz'
      } `}
      style={{ width: '100%', height: '100%' }}
    >
      <AgGridReact
        rowData={loading ? Array(limit).fill({}) : data?.data || []}
        columnDefs={loading ? columnsLoad : columns}
        defaultColDef={{ resizable: true, minWidth: 200 }}
        animateRows={true}
        onGridReady={(params) => {
          params.api.sizeColumnsToFit();
        }}
      />
    </div>
  );
};

export default RequestPlanTable;
