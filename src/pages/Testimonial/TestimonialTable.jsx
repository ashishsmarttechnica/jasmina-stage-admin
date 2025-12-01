import React from 'react';
import { Skeleton } from '@mui/material';
import { AgGridReact } from 'ag-grid-react';
import { MdDelete, MdEdit, MdKey } from 'react-icons/md';
import { Toggle } from 'rsuite';

const TestimonialTable = ({
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
      headerName: 'Name',
      field: 'name',
      width: 200,
      cellRenderer: (params) => {
        const searchTerm = search.trim().toLowerCase();
        const name = params.data?.name || '';

        if (searchTerm && name.toLowerCase().includes(searchTerm)) {
          const regex = new RegExp(`(${searchTerm})`, 'gi');
          const highlighted = name.replace(
            regex,
            `<span class='bg-[#ff0] text-black-2 rounded-[4px]'>$1</span>`,
          );
          return <div dangerouslySetInnerHTML={{ __html: highlighted }} />;
        }

        return <div>{name}</div>;
      },
    },
    {
      headerName: 'Message',
      field: 'message',
      flex: 1,
      minWidth: 200,
      cellRenderer: (params) => {
        const message = params.data?.message || params.data?.testimonial || '';
        return (
          <div className="line-clamp-2" title={message}>
            {message}
          </div>
        );
      },
    },
    // {
    //   headerName: 'Image',
    //   field: 'image',
    //   width: 150,
    //   cellRenderer: (params) => {
    //     const imagePath = params.data?.image || '';
    //     if (imagePath) {
    //       // Construct full image URL if needed
    //       const baseURL = import.meta.env.VITE_SERVERURL || '';
    //       const apiBase = baseURL ? `${baseURL}/api/v1` : '';
    //       const imageUrl = imagePath.startsWith('http') 
    //         ? imagePath 
    //         : imagePath.startsWith('/')
    //         ? `${apiBase}${imagePath}`
    //         : `${apiBase}/${imagePath.replace(/\\/g, '/')}`;
    //       return (
    //         <div className="flex items-center h-full">
    //           <img 
    //             src={imageUrl} 
    //             alt={params.data?.name || 'Testimonial'} 
    //             className="w-12 h-12 object-cover rounded"
    //             onError={(e) => {
    //               e.target.style.display = 'none';
    //             }}
    //           />
    //         </div>
    //       );
    //     }
    //     return <div className="text-gray-400">No image</div>;
    //   },
    // },
    {
      headerName: 'Status',
      field: 'status',
      width: 120,
      minWidth: 100,
      cellRenderer: (params) => {
        const isActive = params.data?.status !== undefined 
          ? params.data?.status 
          : params.data?.isActive;
        return (
          <>
            <div className="flex h-full items-start justify-start ">
              <Toggle
                checked={isActive}
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
      headerName: 'Name',
      field: 'name',
      width: 200,
    },
    {
      headerName: 'Message',
      field: 'message',
      flex: 1,
    },
    {
      headerName: 'Image',
      field: 'image',
      width: 150,
    },
    {
      headerName: 'Status',
      field: 'status',
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
        rowData={loading ? Array(limit).fill({}) : (Array.isArray(data) ? data : [])}
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

export default TestimonialTable;
