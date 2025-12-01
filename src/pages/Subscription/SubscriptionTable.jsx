import React from 'react';
import { Skeleton } from '@mui/material';
import { AgGridReact } from 'ag-grid-react';
import { MdDelete, MdEdit, MdKey } from 'react-icons/md';
import { Toggle } from 'rsuite';

const SubscriptionTable = ({
  data,
  loading,
  handleDelete,
  hendleEdit,
  handleDisc,
  handleToggleChange,
  search,
  themeMode,
  permission,
  limit,
}) => {
  // console.log(data, 'data');

  const columns = [
    {
      headerName: 'Title',
      field: 'title',
      width: 250,
      cellRenderer: (params) => {
        const searchTerm = search.trim().toLowerCase();
        const title = params.data?.title || '';

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
      headerName: 'Price',
      field: 'price',
      width: 80,
      cellRenderer: (params) => {
        return <p>{params.data?.price}</p>;
      },
    },

    {
      headerName: 'Eligibility',
      field: 'eligibility',
      flex: 1,
      cellRenderer: (params) => {
        return <p>{params.data?.eligibility}</p>;
      },
    },
    {
      headerName: 'Employee Range (min-max)',
      field: 'employeeRange',
      width: 250,
      cellRenderer: (params) => {
        return (
          <p>
            {params.data?.employeeRange?.min}-
            {params.data?.employeeRange?.max || 'More than '}
          </p>
        );
      },
    },
    {
      headerName: 'Active',
      field: 'isActive',
      width: 120,
      minWidth: 100,
      cellRenderer: (params) => {
        return (
          <>
            <div className="flex h-full items-start justify-start ">
              <Toggle
                checked={params.data?.isActive}
                onChange={(val) => handleToggleChange(val, params.data)}
              />
            </div>
          </>
        );
      },
    },

    ...(permission?.remove?.value ||
    permission?.update?.value ||
    permission?.view?.value
      ? [
          {
            headerName: 'Action',
            width: 120,
            cellRenderer: (params) => (
              <div className="flex h-full items-center justify-start gap-x-2">
                {/* <div
                className=" p-1 transition-all duration-200 bg-[#c26e29] hover:bg-[#c28a29] dark:bg-[#c28a29] dark:hover:bg-[#a16906]  rounded-[4px]"
                onClick={() => hendleEdit(params.data)}
              >
                <MdKey className="text-[20px] cursor-pointer text-white" />
              </div> */}
                {permission.update && permission.update.value && (
                  <div
                    className=" p-1 transition-all duration-200 bg-boxdark hover:bg-boxdark-2 dark:bg-[#2c74cc] dark:hover:bg-[#005dce]  rounded-[4px]"
                    onClick={() => hendleEdit(params.data)}
                  >
                    <MdEdit className="text-[20px] cursor-pointer text-white" />
                  </div>
                )}
                {permission.remove && permission.remove.value && (
                  <div
                    className=" p-1 transition-all duration-200 bg-red-500 hover:bg-red-600  rounded-[4px]"
                    onClick={() => handleDelete(params.data._id)}
                  >
                    <MdDelete className="text-[20px] cursor-pointer text-white" />
                  </div>
                )}
                {/* {permission.view && permission.view.value && (
                  <div
                    className=" p-1 transition-all duration-200 bg-[#c26e29] hover:bg-[#c28a29] dark:bg-[#c28a29] dark:hover:bg-[#a16906]  rounded-[4px]"
                    onClick={() => handleDisc(params.data?._id)}
                  >
                    <MdKey className="text-[20px] cursor-pointer text-white" />
                  </div>
                )} */}
              </div>
            ),
          },
        ]
      : []),
  ];

  const columnsLoad = [
    {
      headerName: 'Title',
      field: 'title',
      width: 250,
    },
    {
      headerName: 'Price',
      field: 'price',
      width: 80,
    },
    {
      headerName: 'Eligibility',
      field: 'eligibility',
      flex: 1,
    },
    {
      headerName: 'Employee Range (min-max)',
      field: 'employeeRange',
      width: 250,
    },
    {
      headerName: 'Active',
      field: 'isActive',
      width: 120,
    },
    {
      headerName: 'Action',
      width: 120,
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
        rowData={loading ? Array(limit).fill({}) : data || []}
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

export default SubscriptionTable;
