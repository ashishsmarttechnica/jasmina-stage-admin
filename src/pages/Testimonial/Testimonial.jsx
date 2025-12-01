import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import { Button } from '@mui/material';
import TableSearch from '../../components/TableSearch';
import CustomPagination from '../../components/CustomPagination';
import usePermissions from '../../hooks/usePermissions';
import { pageIds } from '../../common/Permission/PermissionData';
import TestimonialTable from './TestimonialTable';
import useTestimonial from '../../hooks/Testimonial/useTestimonial';

const Testimonial = () => {
  const themeMode = useSelector((state) => state?.themeMode?.colorMode);
  const [open, setOpen] = useState(false);
  const permission = usePermissions(pageIds.Testimonial);
  // console.log(permission, 'permission232');
  
  const [TestimonialData, setTestimonialData] = useState(null);
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
    hendleEdit,
  } = useTestimonial();
  const navigate = useNavigate();

  console.log(data, 'data--------hhh------');
  const handleDisc = (id) => {
    // console.log(id, 'id');

    setOpen(true);
    setTestimonialData(id);
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Testimonial" />
      <div className="rounded-sm border border-b-0 border-stroke bg-white   shadow-default dark:border-strokedark dark:bg-boxdark p-1 table_no_overflow ">
        <header className=" flex  flex-col sm:flex-row justify-end items-center px-2 ">
          {permission?.add && permission?.add?.value && (
            <Button
              variant="contained"
              onClick={() =>
                navigate('/testimonial/add-testimonial')
              }
            >
              Add Testimonial
            </Button>
          )}
          {/* <TableSearch search={search} setSearch={setSearch} /> */}
        </header>
      </div>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-1 table_no_overflow">
          <TestimonialTable
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
        {/* {data?.total > 0 && ( */}
          <div className="flex items-center justify-end">
            <CustomPagination
              page={page}
              limit={limit}
              setPage={setPage}
              setLimit={setLimit}
              count={data?.total || 0}
            />
          </div>
        {/* )} */}
      </div>
      {/* <AdminModalPopup
        open={open}
        onClose={() => setOpen(false)}
        adminId={MembershipdesData}
      /> */}
    </DefaultLayout>
  );
};

export default Testimonial;
