import React from 'react';
import { Skeleton } from '@mui/material';
import { AgGridReact } from 'ag-grid-react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { Toggle } from 'rsuite';

const CountryTable = ({
  data,
  loading,
  handleDelete,
  hendleEdit,
  handleToggleChange,
  search,
  themeMode,
  permission,
  limit,
}) => {
  const columns = [
    {
      headerName: 'COUNTRY',
      field: 'country',
      flex: 1,
      cellRenderer: (params) => {
        const searchTerm = search.trim().toLowerCase();
        const country = params.data?.country || '';

        if (searchTerm && country.toLowerCase().includes(searchTerm)) {
          const regex = new RegExp(`(${searchTerm})`, 'gi');
          const highlighted = country.replace(
            regex,
            `<span class='bg-[#ff0] text-black-2 rounded-[4px]'>$1</span>`,
          );
          return <div dangerouslySetInnerHTML={{ __html: highlighted }} />;
        }

        return <div>{country}</div>;
      },
    },
    {
      headerName: 'LGBTQ FRIENDLY',
      field: 'isLGBTQ',
      flex: 1,
      cellRenderer: (params) => {
        return (
          <div className="flex h-full items-start justify-start ">
            <Toggle
              checked={params.data?.isLGBTQ}
              onChange={(val) => handleToggleChange(val, params.data)}
            />
          </div>
        );
      },
    },
   
    ...(permission?.remove?.value ||
    permission?.update?.value ||
    permission?.view?.value
      ? [
          {
            headerName: 'ACTION',
            width: 120,
            cellRenderer: (params) => (
              <div className="flex h-full items-center justify-start gap-x-2">
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
              </div>
            ),
          },
        ]
      : []),
  ];

  const columnsLoad = [
    {
      headerName: 'Country',
      field: 'country',
      width: 250,
    },
    {
      headerName: 'LGBTQ Friendly',
      field: 'isLGBTQ',
      width: 150,
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

export default CountryTable;
