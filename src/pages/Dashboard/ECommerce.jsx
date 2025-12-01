import React, { useEffect } from "react";
import CardDataStats from "../../components/CardDataStats.jsx";
import ChartOne from "../../components/Charts/ChartOne.jsx";
import ChartThree from "../../components/Charts/ChartThree.jsx";
import ChartTwo from "../../components/Charts/ChartTwo.jsx";
import ChatCard from "../../components/Chat/ChatCard.jsx";
import MapOne from "../../components/Maps/MapOne.jsx";
import TableOne from "../../components/Tables/TableOne.jsx";
import DefaultLayout from "../../layout/DefaultLayout.jsx";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UnderMaintenance from "../UnderMaintenance/UnderMaintenance.jsx";
import mainimg from "../../images/hellacast-Banner/Admin_Panel_Image.png";
import ExpiredPlan from "./ExpiredPlan.jsx";
import UpcomingExpiredPlan from "./UpcomingExpiredplan.jsx";
import TodaysNewCompany from "./TodaysNewCompany.jsx";
import TodaysNewRequest from "./TodaysNewRequest.jsx";

export function ECommerce() {
  const navigate = useNavigate();

  const user = useSelector((state) => state?.loginUser);
  // console.log(user);
  const { data, loading } = useSelector((state) => state?.ExpiredPlanReducerDetail?.data);
  console.log(data, "data123456");
  
  useEffect(() => {
    const adminId = localStorage.getItem("adminId");
    if (!adminId || !user) {
      navigate("/");
    }
  }, [user]);

  return (
    <DefaultLayout>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Total Users */}
        <div className="rounded-xl bg-white p-6 shadow-md border border-gray-100">
          <h4 className="text-sm font-medium text-gray-500 mb-2">Total Users</h4>
          <p className="text-2xl font-semibold text-gray-800">
            {data?.statistics?.totalUser || 0}
          </p>
        </div>

        {/* Total Companies */}
        <div className="rounded-xl bg-white p-6 shadow-md border border-gray-100">
          <h4 className="text-sm font-medium text-gray-500 mb-2">Total Companies</h4>
          <p className="text-2xl font-semibold text-gray-800">{data?.statistics?.totalCompany || 0}</p>
        </div>

        {/* Active Plans */}
        <div className="rounded-xl bg-white p-6 shadow-md border border-gray-100">
          <h4 className="text-sm font-medium text-gray-500 mb-2">Active Plans</h4>
          <p className="text-2xl font-semibold text-green-600">{data?.statistics?.activePlan || 0}</p>
        </div>

        {/* Expired Plans */}
        <div className="rounded-xl bg-white p-6 shadow-md border border-gray-100">
          <h4 className="text-sm font-medium text-gray-500 mb-2">Expired Plans</h4>
          <p className="text-2xl font-semibold text-red-500">{data?.statistics?.expiredPlan || 0}</p>
        </div>
      </div>
      <div className="dashbord-outer">
        <div className="table-outer">
          <ExpiredPlan />
        </div>
        <div className="table-outer">
          <UpcomingExpiredPlan />
        </div>

      </div>
      <div className="dashbord-outer">

        <div className="table-outer">
          <TodaysNewCompany />
        </div>
        <div className="table-outer">
          <TodaysNewRequest />
        </div>
      </div>
    </DefaultLayout>
  );
}

export default ECommerce;
