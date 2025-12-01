import React, { useState } from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import TableSearch from "../../components/TableSearch";
import { pageIds } from "../../common/Permission/PermissionData";
import usePermissions from "../../hooks/usePermissions";
// import MebershipTable from "./MebershipTable";
import CustomPagination from "../../components/CustomPagination";
import PageSectionTable from "./PageSectionTable";
import usePageSection from "../../hooks/PageSection/usePageSection";
import PageDescriptionModal from "../../Model/PageDescriptionModal";

const PageSection = () => {
  const themeMode = useSelector((state) => state?.themeMode?.colorMode);
  const adminData = useSelector((state) => state.loginUser);
  const permission = usePermissions(pageIds.PageSection);
  //   const [MembershipdesData, setMembershipdesData] = useState(null);
  //   const [open, setOpen] = useState(false);
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
    handleDelete,
    handleDiscd,
    handleToggleChange,
    MembershipdesData,
    open,
    setOpen,
    handleEdit,
    handleToggleStatus,
  } = usePageSection();
  const navigate = useNavigate();

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Page Section" />

      

      <div className="rounded-sm border border-b-0 border-stroke bg-white   shadow-default dark:border-strokedark dark:bg-boxdark p-1 table_no_overflow ">
        <header className=" flex  flex-col sm:flex-row justify-end items-center px-2 ">
          {permission.add && permission.add.value && (
            <Button
              variant="contained"
              onClick={() => navigate("/PageSection/add-page")}
            >
              Add Page
            </Button>
          )}
          <TableSearch search={search} setSearch={setSearch} />
        </header>
      </div>

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-1 table_no_overflow">
        <PageSectionTable
          data={data}
          loading={loading}
          handleDelete={handleDelete}
          handleToggleChange={handleToggleChange}
          handleDiscd={handleDiscd}
          handleEdit={handleEdit}
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
            count={data?.total || 0}
          />
        </div>
      </div>
      {open && (
        <PageDescriptionModal
          open={open}
          onClose={handleClose}
          description={MembershipdesData}
        />
      )}
    </DefaultLayout>
  );
};

export default PageSection;
