import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import useAdminManagement from '../../hooks/AdminManagement/useAdminManagement';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import { Button } from '@mui/material';
import TableSearch from '../../components/TableSearch';
import AdminManagementTable from './AdminManagementTable';
import CustomPagination from '../../components/CustomPagination';
import AdminModalPopup from '../../Model/AdminModelPopup';
import usePermissions from '../../hooks/usePermissions';
import { pageIds } from '../../common/Permission/PermissionData';

const AdminManagement = () => {
  const themeMode = useSelector((state) => state?.themeMode?.colorMode);
  const [open, setOpen] = useState(false);
  const permission = usePermissions(pageIds.RoleManagement.id,pageIds.RoleManagement.AdminManagement);
  // console.log(permission, 'permission232');
  
  const [MembershipdesData, setMembershipdesData] = useState(null);
  const {
    search,
    setSearch,
    page,
    setPage,
    limit,
    setLimit,
    data,
    roledata,
    loading,

    handleDelete,
    hendleEdit,
  } = useAdminManagement();
  const navigate = useNavigate();

  const handleDisc = (id) => {
    // console.log(id, 'id');

    setOpen(true);
    setMembershipdesData(id);
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Admin Management" />
      <div className="rounded-sm border border-b-0 border-stroke bg-white   shadow-default dark:border-strokedark dark:bg-boxdark p-1 table_no_overflow ">
        <header className=" flex  flex-col sm:flex-row justify-end items-center px-2 ">
          {permission?.add && permission?.add?.value && (
            <Button
              variant="contained"
              onClick={() =>
                navigate('/admin-management/add-admin')
              }
            >
              Add Admin
            </Button>
          )}
          <TableSearch search={search} setSearch={setSearch} />
        </header>
      </div>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-1 table_no_overflow">
        <AdminManagementTable
          data={data}
          loading={loading}
          handleDelete={handleDelete}
          handleDisc={handleDisc}
          hendleEdit={hendleEdit}
          search={search}
          themeMode={themeMode}
          permission={permission}
          limit={limit}
        />
        {data?.total > 0 && (
          <div className="flex items-center justify-end">
            <CustomPagination
              page={page}
              limit={limit}
              setPage={setPage}
              setLimit={setLimit}
              count={data?.total || 0}
            />
          </div>
        )}
      </div>
      <AdminModalPopup
        open={open}
        onClose={() => setOpen(false)}
        adminId={MembershipdesData}
      />
    </DefaultLayout>
  );
};

export default AdminManagement;
