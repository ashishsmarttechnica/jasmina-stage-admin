import React, { useState } from 'react';
import { Skeleton } from '@mui/material';
import { AgGridReact } from 'ag-grid-react';
import { MdDelete, MdEdit, MdKey, MdOutlineReport, MdVisibility } from 'react-icons/md';
import { Toggle } from 'rsuite';
import { useDispatch } from 'react-redux';
import { getSingleUser } from '../../../redux/actions/UserAction';
import UserProfileModal from '../../../Model/UserProfileModal';
import RepotedByModal from '../../Company/CompanyReported/RepotedByModal';
import { TruncatedTextWithTooltip } from '../../../components/TruncatedTextWithTooltip';
const ReportedTable = ({
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
  const dispatch = useDispatch();
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [selectedUserData, setSelectedUserData] = useState(null);
  console.log(selectedUserData, 'selectedUserData');
  const [reportedModalOpen, setReportedModalOpen] = useState(false);
    const [selectedReportedId, setSelectedReportedId] = useState(null);
  // console.log(data, 'companydata');

  const columns = [
    {
      headerName: 'Reported User Name',
      field: 'reportedUserId',
      width: 250,
      cellRenderer: (params) => {
      const value = params.data?.reportedUserId;
      const searchTerm = search.trim().toLowerCase();

      if (!value) return null;

      // if (typeof value === 'object') {
      //   const display = value.companyName || value.profile.fullName || JSON.stringify(value);

      //   return <div>{display}</div>;
      // }
        const title = value.companyName || value.profile.fullName || JSON.stringify(value);;

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
      headerName: 'Reporter User Name',
      field: 'reporterUserId',
      width: 250,
      cellRenderer: (params) => {
        const value = params.data?.reporterUserId;
         const searchTerm = search.trim().toLowerCase();
        if (!value) return null;
        // if (typeof value === 'object') {
        //   return <div>{value.companyName || value.profile.fullName  || JSON.stringify(value)}</div>;
        // }
        const title = value.companyName || value.profile.fullName || JSON.stringify(value);;

        if (searchTerm && title.toLowerCase().includes(searchTerm)) {
          const regex = new RegExp(`(${searchTerm})`, 'gi');
          const highlighted = title.replace(
            regex,
            `<span class='bg-[#ff0] text-black-2 rounded-[4px]'>$1</span>`,
          );
          return <div dangerouslySetInnerHTML={{ __html: highlighted }} />;
        }

      return <div>{title}</div>;;
      },
    },
    {
      headerName: 'Reason',
      field: 'reason',
      width: 200,
      cellRenderer: (params) => {
        const title = params.data?.reason || '';
        return <div>{title}</div>;
      },
    },
    {
      headerName: 'Description',
      field: 'description',
      flex: 1,
      cellRenderer: (params) => {
        return (
          <TruncatedTextWithTooltip 
            text={params.data?.description || ''} 
            maxWords={10}
            className="text-sm"
          />
        );
      },
    },
    {
      headerName: 'Reported By',
      field: 'reportedUserId._id',
      width: 100,
      cellRenderer: (params) => {
        const reportedData = params.data?.reportedUserId?._id;
        console.log(reportedData, 'reporterData');
        const showReporterData = () => {
          setSelectedReportedId(reportedData);
          setReportedModalOpen(true);
        };
        return (
          // <span
          //   className="hover:text-blue-600 cursor-pointer "
          //   onClick={showReporterData}
          // >
          //   {params.data?.totalReports}
          // </span>
           <div className="flex h-full items-start justify-start gap-4 mt-1">
           <div
           className="cursor-pointer p-1  bg-red-600 hover:bg-red-700 rounded-[4px] hover:scale-105"
           onClick={showReporterData}
         >
           <MdOutlineReport className="text-[20px] text-white" />
         </div>
         </div>
        );
      },
    },
    {
      headerName: 'Reported Details',
      field: 'reportedUserId._id',
      width: 100,
      cellRenderer: (params) => {
        const id = params?.data?.reportedUserId?._id;
        console.log(id, 'params');
        
        const handleProfileClick = async () => {
          console.log('Clicking on User ID:', id);
          console.log('ID type:', typeof id);
          console.log('ID value:', id);
          
          if (!id) {
            console.error('No User ID found');
            return;
          }
          
          try {
            console.log('Dispatching getSingleUser with ID:', id);
            const result = await dispatch(getSingleUser(id));
            console.log('API Result:', result);
            console.log('Result data:', result?.data);
            
            if (result?.data?.success) {
              console.log('Success! Setting user data:', result.data);
              setSelectedUserData(result.data);
              setProfileModalOpen(true);
            } else {
              setSelectedUserData(result);
              setProfileModalOpen(true);
            }
          } catch (error) {
            console.error('Error fetching user data:', error);
            console.error('Error details:', error.response?.data);
            setSelectedUserData({ error: error.response?.data?.message || 'An unexpected error occurred' });
            setProfileModalOpen(true);
          }
        };

        return (
          <div className="flex h-full items-start justify-start gap-4 mt-1">
          <div 
               className="cursor-pointer p-1  bg-primary hover:bg-blue-800 rounded-[4px] hover:scale-105"
            onClick={handleProfileClick}
          >
             <MdVisibility className="text-[20px] text-white" />
          </div>
          </div>
        );
      },
    },
    {
      headerName: 'Blocked/Unblocked',
      field: 'status',
      width: 10,
      cellRenderer: (params) => {
        const id = params?.data?.reportedUserId?._id;
        const status = params?.data?.reportedUserId?.status;
        const isBlocked = (status) === 4;

        const onToggle = (val) => {
          if (!id) return;
          // Pass the isBlocked status in the body
          const newStatus = val ? 4 : 1; // 4 for blocked, 1 for active
          
          const formData = new FormData();
          formData.append('status', newStatus);
          
          handleToggleChange(val, { 
            _id: id, 
            status: newStatus,
            isBlocked: val,
            formData: formData
          });
        };

        return (
          <div className="flex items-center h-full">
            <Toggle checked={isBlocked} onChange={onToggle} size="sm" />
          </div>
        );
      },
    },
  ];

  const columnsLoad = [
    {
      headerName: 'Reported Details',
      field: 'reportedUserId._id',
      width: 150,
    },
    {
      headerName: 'Reported User Name',
      field: 'reportedUserId',
      width: 250,
    },
    {
      headerName: 'Reporter User Name',
      field: 'reporterUserId',
      width: 250,
    },
    {
      headerName: 'Reason',
      field: 'reason',
      width: 200,
    },
    {
      headerName: 'Description',
      field: 'description',
      flex: 1,
    },
    {
      headerName: 'Created At',
      field: 'createdAt',
      width: 200,
    },
    {
      headerName: 'Action',
      width: 120,
    },
  ];
  return (
    <>
      <div
        className={`${
          themeMode == 'dark' ? 'ag-theme-quartz-dark ' : 'ag-theme-quartz'
        } `}
        style={{ width: '100%', height: '100%' }}
      >
        <AgGridReact
          rowData={loading ? Array(limit).fill({}) : data?.data?.reports || []}
          columnDefs={loading ? columnsLoad : columns}
          defaultColDef={{ resizable: true, minWidth: 200 }}
          animateRows={true}
          onGridReady={(params) => {
            params.api.sizeColumnsToFit();
          }}
        />
      </div>
      
      <UserProfileModal
        open={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        userData={selectedUserData}
      />
      <RepotedByModal
        open={reportedModalOpen}
        onClose={() => setReportedModalOpen(false)}
        id={selectedReportedId}
        isStatus={1}
      />
    </>
  );
};

export default ReportedTable;
