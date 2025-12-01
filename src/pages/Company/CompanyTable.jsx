import React from 'react';
import { Skeleton } from '@mui/material';
import { AgGridReact } from 'ag-grid-react';
import { MdDelete, MdEdit, MdKey, MdVisibility } from 'react-icons/md';
import { Toggle } from 'rsuite';
import noImageIcon from '../../images/noImage2.webp';

const CompanyTable = ({
  data,
  loading,
  handleDelete,
  hendleEdit,
  search,
  themeMode,
  permission,
  handleDisc,
  limit,
  handleToggleChange,
}) => {
  // console.log(data,"compnaydat");
  
    const serverurl = import.meta.env.VITE_SERVERURL;
  const columns = [
    {
      headerName: 'Image',
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
      headerName: 'email',
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
      headerName: 'city',
      field: 'city',
      width: 300,
      cellRenderer: (params) => {
        return <p>{params.data?.city}</p>;
      },
    },
    {
      headerName: 'companyName',
      field: 'companyName',
      width: 320,
      cellRenderer: (params) => {
        return <p>{params.data?.companyName}</p>;
      },
    },  
    // {
    //   headerName: 'companyType',
    //   field: 'companyType',
    //   width: 100,
    //   cellRenderer: (params) => {
    //     return <p>{params.data?.companyType}</p>;
    //   },
    // },
    // {
    //   headerName: 'contact',
    //   field: 'contact',
    //   width: 100,
    //   cellRenderer: (params) => {
    //     return <p>{params.data?.contact}</p>;
    //   },
    // },
    // {
    //   headerName: 'firstName',
    //   field: 'firstName',
    //   width: 100,
    //   cellRenderer: (params) => {
    //     return <p>{params.data?.firstName}</p>;
    //   },
    // },

    // {
    //   headerName: 'contact',
    //   field: 'contact',
    //   width: 100,
    //   cellRenderer: (params) => {
    //     return <p>{params.data?.contact}</p>;
    //   },
    // },
    // {
    //   headerName: 'verified',
    //   field: 'verified',
    //   width: 270,
    //   cellRenderer: (params) => {
    //     return (
    //       <>
    //         <div className="flex h-full items-center ">
    //           <Toggle
    //             checked={params.data?.verified}
    //             onChange={(val) => handleToggleChange(val, params.data)}
    //           />
    //         </div>
    //       </>
    //     );
    //   },
    // },

    {
      headerName: 'View',
      width: 200,
      minWidth: 180,
      cellRenderer: (params) => (
        <div className="flex h-full items-start justify-start gap-4">
          <div
            className="cursor-pointer p-1 bg-primary hover:bg-blue-800 rounded-[4px] hover:scale-105"
            onClick={() => handleDisc(params.data?._id)}
          >
            <MdVisibility className="text-[20px] text-white" />
          </div>
        </div>
      ),
    },
  ];

  const columnsLoad = [
    { headerName: 'Name', flex: 1, cellRenderer: () => <Skeleton /> },
    { headerName: 'Email', flex: 1, cellRenderer: () => <Skeleton /> },
    { headerName: 'Action', width: 120, cellRenderer: () => <Skeleton /> },
  ];
  return (
    <div
      className={`${
        themeMode == 'dark' ? 'ag-theme-quartz-dark ' : 'ag-theme-quartz'
      } `}
      style={{ width: '100%', height: '100%' }}
    >
      <AgGridReact
        rowData={loading ? Array(limit).fill({}) : data?.Companys || []}
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

export default CompanyTable;
