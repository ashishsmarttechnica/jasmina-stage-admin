import React, { useState } from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import TableSearch from "../../components/TableSearch";
import { pageIds } from "../../common/Permission/PermissionData";
import usePermissions from "../../hooks/usePermissions";
import CustomPagination from "../../components/CustomPagination";
import useExpiredPlan from "../../hooks/ExperiedPlan/useExpiredPlan";
import ExpiredPlanTable from "./ExpiredPlanTable";

const ExpiredPlan = () => {
  const themeMode = useSelector((state) => state?.themeMode?.colorMode);
  const adminData = useSelector((state) => state.loginUser);
  const permission = usePermissions(pageIds.ExpiredPlan);
  const handleClose = () => setOpen(false);
  const {
    search,
    setSearch,
    page,
    setPage,
    limit,
    setLimit,
    data,
    loading,
    open,
    setOpen,
    handleEdit,
    handleToggleStatus,
  } = useExpiredPlan();
  const navigate = useNavigate();
console.log(data,"sdjfsdjkfdsfh");

  return (
    <>
      <Breadcrumb pageName="Expired Plan" />

      <div className="rounded-sm border border-b-0 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-1 table_no_overflow ">
        <header className="flex flex-col sm:flex-row justify-end items-center px-2">
          {/* {permission.add && permission.add.value && (
            <Button
              variant="contained"
              onClick={() => navigate("/Transaction/add-transaction")}
            >
              Add Transaction
            </Button>
          )} */}
          <TableSearch search={search} setSearch={setSearch} />
        </header>
      </div>

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-1 table_no_overflow">
        <ExpiredPlanTable
          data={data}
          loading={loading}
          search={search}
          themeMode={themeMode}
          limit={limit}
          permission={permission}
          handleToggleStatus={handleToggleStatus}
        />

        <div className="flex items-center justify-end">
          <CustomPagination
              page={page}
              limit={limit}
              setPage={setPage}
              setLimit={setLimit}
              count={data?.data?.total || 0}
            />
        </div>
      </div>
    </>
  );
};

export default ExpiredPlan; 