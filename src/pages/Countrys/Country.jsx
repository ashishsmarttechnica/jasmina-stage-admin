import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import { Button } from '@mui/material';
import CustomPagination from '../../components/CustomPagination';
import usePermissions from '../../hooks/usePermissions';
import { pageIds } from '../../common/Permission/PermissionData';
import useCountry from '../../hooks/Country/useCountry';
import CountryTable from './CountryTable';
import TableSearch from '../../components/TableSearch';

const Country = () => {
  const themeMode = useSelector((state) => state?.themeMode?.colorMode);
  const [open, setOpen] = useState(false);
  const permission = usePermissions(pageIds.Country);
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
handleToggleChange,
    handleDelete,
    hendleEdit,
  } = useCountry();
  const navigate = useNavigate();

  const handleDisc = (id) => {
    // console.log(id, 'id');

    setOpen(true);
    setMembershipdesData(id);
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Countries" />
      <div className="rounded-sm border border-b-0 border-stroke bg-white   shadow-default dark:border-strokedark dark:bg-boxdark p-1 table_no_overflow ">
        <header className=" flex  flex-col sm:flex-row justify-end items-center px-2 ">
          {permission?.add && permission?.add?.value && (
            <Button
              variant="contained"
              onClick={() =>
                navigate('/country/add-country')
              }
            >
              Add Country
            </Button>
          )}
          <TableSearch search={search} setSearch={setSearch} />
        </header>
      </div>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-1 table_no_overflow">
        <CountryTable
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

export default Country;
