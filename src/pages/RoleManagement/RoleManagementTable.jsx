import { Skeleton } from '@mui/material';
import { AgGridReact } from 'ag-grid-react';
import { MdDelete, MdEdit } from 'react-icons/md';

const RoleManagementTable = ({
  data,
  loading,
  handleDelete,
  hendleEdit,
  search,
  permission,
  themeMode,
  limit,
  
}) => {
  const columns = [
    {
      headerName: 'ROLE',
      field: 'role',
      flex: 1,
      cellRenderer: (params) => {
        const searchTerm = search.trim().toLowerCase();
        const title = params.data?.role || '';
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
    ...( permission?.remove?.value || permission?.update?.value
        ? [
            {
              headerName: 'ACTION',
              width: 120,
              cellRenderer: (params) => (
                <div className="flex h-full items-center justify-center gap-x-2">
                  { "Superadmin" === params.data.role ? [] : permission.update && permission.update.value && (
                    <div
                      className=" p-1 transition-all duration-200 bg-boxdark hover:bg-boxdark-2 dark:bg-[#2c74cc] dark:hover:bg-[#005dce]  rounded-[4px]"
                      onClick={() => hendleEdit(params.data)}
                    >
                      <MdEdit className="text-[20px] cursor-pointer text-white" />
                    </div>
                  )}
                  { "Superadmin" == params.data.role ? [] : permission.remove && permission.remove.value && (
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
    { headerName: 'Name', flex: 1, cellRenderer: () => <Skeleton /> },
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
        rowData={loading ? Array(limit).fill({}) : data.data || []}
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

export default RoleManagementTable;
