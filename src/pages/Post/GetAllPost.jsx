import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import TableSearch from '../../components/TableSearch';
import CustomPagination from '../../components/CustomPagination';
import PostTable from './PostTable';
import usePermissions from '../../hooks/usePermissions';
import { pageIds } from '../../common/Permission/PermissionData';
import usePostManagement from '../../hooks/Post/usePostManagement';

const GetAllPost = () => {
  const themeMode = useSelector((state) => state?.themeMode?.colorMode);
  const permission = usePermissions(
    pageIds.RoleManagement.id,
    pageIds.RoleManagement.AdminManagement,
  );

  const [open, setOpen] = useState(false);
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
    handleToggleChange,
    handleDelete,
    handleClose,
    hendleEdit,
  } = usePostManagement();
  const handleDisc = (id) => {
    setOpen(true);
    setMembershipdesData(id);
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Post Management" />
      <div className="rounded-sm border border-b-0 border-stroke bg-white   shadow-default dark:border-strokedark dark:bg-boxdark p-1 table_no_overflow ">
        <header className=" flex  flex-col sm:flex-row justify-end items-center px-2 ">
          {/* {permission?.add && permission?.add?.value && (
            <Button
              variant="contained"
              onClick={() =>
                navigate('/admin-management/add-admin')
              }
            >
              Add Company
            </Button>
          )} */}
          <TableSearch search={search} setSearch={setSearch} />
        </header>
      </div>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-1 table_no_overflow">
        <PostTable
          data={data}
          loading={loading}
          handleDelete={handleDelete}
          handleToggleChange={handleToggleChange}
          handleDisc={handleDisc}
          hendleEdit={hendleEdit}
          search={search}
          themeMode={themeMode}
          permission={permission}
          limit={limit}
        />
          <div className="flex items-center justify-end">
            <CustomPagination
              page={page}
              limit={limit}
              setPage={setPage}
              setLimit={setLimit}
              count={data?.total || 0}
            />
          </div>
      </div>
    
    </DefaultLayout>
  );
};

export default GetAllPost;
