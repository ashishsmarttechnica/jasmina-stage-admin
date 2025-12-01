import React from 'react';
import { Skeleton } from '@mui/material';
import { AgGridReact } from 'ag-grid-react';
import { MdDelete, MdEdit, MdKey, MdVisibility } from 'react-icons/md';
import { Toggle } from 'rsuite';


const JobTable = ({
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
  console.log(data, 'data');

  const columns = [
    {
      headerName: 'JOB TITLE',
      field: 'jobTitle',
      width: 200,
      cellRenderer: (params) => {
        const searchTerm = search.trim().toLowerCase();
        const title = params.data?.jobTitle || '';

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
      headerName: 'SALARY RANGE',
      field: 'salaryRange',
      width: 120,
      cellRenderer: (params) => <p>{params.data?.salaryRange}</p>,
    },
    {
      headerName: 'EDUCATION',
      field: 'education',
      width: 120,
      cellRenderer: (params) => <p>{params.data?.education}</p>,
    },
    {
      headerName: 'DEPARTMENT',
      field: 'department',
      width: 120,
      cellRenderer: (params) => <p>{params.data?.department}</p>,
    },
    {
      headerName: 'LOCATION',
      field: 'jobLocation',
      width: 120,
      cellRenderer: (params) => <p>{params.data?.jobLocation}</p>,
    },
    {
      headerName: 'SENIORITY LEVEL',
      field: 'seniorityLevel',
      width: 120,
      cellRenderer: (params) => <p>{params.data?.seniorityLevel}</p>,
    },
    {
      headerName: 'APPLICANTS',
      field: 'applicants',
      width: 30,
      cellRenderer: (params) => <p>{params.data?.applicants}</p>,
    },
    {
      headerName: 'DEADLINE',
      field: 'deadline',
      width: 100,
      cellRenderer: (params) => <p>{params.data?.deadline ? new Date(params.data.deadline).toLocaleDateString() : ''}</p>,
    },
    ...(permission?.view?.value
          ? [
            {
              headerName: 'VIEW',
              width: 200,
              minWidth: 180,
              cellRenderer: (params) => (
                <div className="flex h-full items-start justify-start gap-4">
                  {permission.view?.value && (
                    <div
                      className="cursor-pointer p-1 bg-primary hover:bg-blue-800 rounded-[4px] hover:scale-105"
                      onClick={() => handleDisc(params.data?._id)}
                    >
                      <MdVisibility className="text-[20px] text-white" />
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
      headerName: 'JOB TITLE',
      field: 'jobTitle',
      width: 250,
    },
    {
      headerName: 'SALARY RANGE',
      field: 'salaryRange',
      width: 80,
    },
    {
      headerName: 'EDUCATION',
      field: 'education',
      flex: 1,
    },
    {
      headerName: 'DEPARTMENT',
      field: 'department',
      width: 250,
    },
    {
      headerName: 'LOCATION',
      field: 'jobLocation',
      width: 120,
    },
    {
      headerName: 'SENIORITY LEVEL',
      field: 'seniorityLevel',
      width: 120,
    },
    {
      headerName: 'APPLICANTS',
      field: 'applicants',
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
        rowData={loading ? Array(limit).fill({}) : Array.isArray(data) ? data : (data?.data || [])}
        columnDefs={loading ? columnsLoad : columns}
        defaultColDef={{ resizable: true, minWidth: 170 }}
        animateRows={true}
        onGridReady={(params) => {
          params.api.sizeColumnsToFit();
        }}
      />
    </div>
  );
};

export default JobTable;
