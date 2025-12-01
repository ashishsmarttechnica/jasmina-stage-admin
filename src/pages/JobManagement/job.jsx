import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import { Button } from '@mui/material';
import CustomPagination from '../../components/CustomPagination';
import usePermissions from '../../hooks/usePermissions';
import { pageIds } from '../../common/Permission/PermissionData';
import JobTable from './JobTable';
import useJob from '../../hooks/Job/useJob';
import TableSearch from '../../components/TableSearch';
import JobDetailsModal from '../../Model/JobDetailModal';

const Job = () => {
  const themeMode = useSelector((state) => state?.themeMode?.colorMode);
  // const [open, setOpen] = useState(false);
  const permission = usePermissions(pageIds.Job);
  // console.log(permission, 'permission232');
  
  
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
    handleDiscd,
    hendleEdit,
    open,
    setOpen,
    MembershipdesData
  } = useJob();
  const navigate = useNavigate();
  console.log(MembershipdesData);
  // const handleDisc = (id) => {
  //   console.log(id, 'id');

  //   // setOpen(setOpen);
  //   setMembershipdesData(id);
  // };
console.log(data?.pagination,"pagination");

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Job" />
      <div className="rounded-sm border border-b-0 border-stroke bg-white   shadow-default dark:border-strokedark dark:bg-boxdark p-1 table_no_overflow ">
        <header className=" flex  flex-col sm:flex-row justify-end items-center px-2 ">
          {/* {permission?.add && permission?.add?.value && (
            <Button
              variant="contained"
              onClick={() =>
                navigate('/job/add-job')
              }
            >
              Add job
            </Button>
          )} */}
          <TableSearch search={search} setSearch={setSearch} />
        </header>
      </div>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-1 table_no_overflow">
        <JobTable
          data={data}
          loading={loading}
          handleDelete={handleDelete}
          handleToggleChange={handleToggleChange}
          handleDisc={handleDiscd}
          hendleEdit={hendleEdit}
          search={search}
          themeMode={themeMode}
          permission={permission}
          limit={limit}
        />
        {data?.pagination?.totalPages > 0 && (
          <div className="flex items-center justify-end">
            <CustomPagination
              page={page}
              limit={limit}
              setPage={setPage}
              setLimit={setLimit}
              count={data?.pagination?.totalPages || 0}
            />
          </div>
        )}
      </div>
      {/* <AdminModalPopup
        open={open}
        onClose={() => setOpen(false)}
        adminId={MembershipdesData}
      /> */}
      <JobDetailsModal
        isOpen={open}
        onClose={() => setOpen(false)}
        jobData={MembershipdesData}
      />
    </DefaultLayout>
  );
};

export default Job;
