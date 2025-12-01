import React from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { useSelector } from "react-redux";
import TableSearch from "../../components/TableSearch";
import CustomPagination from "../../components/CustomPagination";
import TodaysNewRequestTable from "./TodaysNewRequestTable";
import useTodaysNewRequest from "../../hooks/ExperiedPlan/useTodaysNewRequest";

const TodaysNewRequest = () => {
  const themeMode = useSelector((state) => state?.themeMode?.colorMode);

  const {
    search,
    setSearch,
    page,
    setPage,
    limit,
    setLimit,
    data,
    loading,
  } = useTodaysNewRequest();

  return (
    <>
      <Breadcrumb pageName="Today's New Plan Request" />

      <div className="rounded-sm border border-b-0 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-1 table_no_overflow ">
        <header className="flex flex-col sm:flex-row justify-end items-center px-2">
          <TableSearch search={search} setSearch={setSearch} />
        </header>
      </div>

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-1 table_no_overflow">
        <TodaysNewRequestTable
          data={data}
          loading={loading}
          search={search}
          themeMode={themeMode}
          limit={limit}
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

export default TodaysNewRequest;


