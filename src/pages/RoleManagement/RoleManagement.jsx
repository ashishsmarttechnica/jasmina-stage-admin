import React from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { Button } from "@mui/material";

import useRoleManagement from "../../hooks/RoleManagement/useRoleManagement";
import { useNavigate } from "react-router-dom";
import RoleManagementTable from "./RoleManagementTable";
import { useSelector } from "react-redux";
import TableSearch from "../../components/TableSearch";
// import CustomPagination from "../../components/CustomPagination";
import usePermissions from "../../hooks/usePermissions";
import { pageIds } from "../../common/Permission/PermissionData";
import CustomPagination from "../../components/CustomPagination";

const RoleManagement = () => {
  const themeMode = useSelector((state) => state?.themeMode?.colorMode);
  const permission = usePermissions(
    pageIds.RoleManagement.id,
    pageIds.RoleManagement.Role
  );
  // console.log(permission,"hello permiossomn=============================");
  
  const {
    search,
    setSearch,
    page,
    setPage,
    limit,
    setLimit,
    data,
    loading,
    handleDelete,
    hendleEdit, 
  } = useRoleManagement();
  const navigate = useNavigate();

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Role" />
      <div className="rounded-sm border border-b-0 border-stroke bg-white   shadow-default dark:border-strokedark dark:bg-boxdark p-1 table_no_overflow ">
        <header className=" flex  flex-col sm:flex-row justify-end items-center px-2 ">
          {permission?.add && permission?.add?.value && (
            <Button
              variant="contained"
              onClick={() => navigate("/role-management/role/add-role")}
            >
              Add Role
            </Button>
          )}
          {/* <TableSearch search={search} setSearch={setSearch} /> */}
        </header>
      </div>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-1 table_no_overflow">
        <RoleManagementTable
          data={data}
          loading={loading}
          handleDelete={handleDelete}
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
    </DefaultLayout>
  );
};

export default RoleManagement;
