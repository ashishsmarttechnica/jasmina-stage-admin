import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Loader from './common/Loader/index.jsx';
import PageTitle from './components/PageTitle.jsx';
import SignIn from './pages/Authentication/SignIn.jsx';
import SignUp from './pages/Authentication/SignUp.jsx';
import ECommerce from './pages/Dashboard/ECommerce.jsx';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TokenAdmin } from './redux/actions/loginAction.js';
import { useDispatch } from 'react-redux';
import 'rsuite/dist/rsuite.min.css';
import 'ag-grid-community/styles/ag-grid.css'; // Mandatory CSS required by the grid
import 'ag-grid-community/styles/ag-theme-quartz.css';
import ForgotPassword from './pages/Authentication/ForgotPassword.jsx';
import RoleManagement from './pages/RoleManagement/RoleManagement.jsx';
import AddRoleManagement from './pages/RoleManagement/AddRoleManagement.jsx';
import EditRoleManagement from './pages/RoleManagement/EditRoleManagement.jsx';
import AdminManagement from './pages/AdminManagement/AdminManagement.jsx';
import AddAdminManagement from './pages/AdminManagement/AddAdminManagement.jsx';
import EditAdminManagement from './pages/AdminManagement/EditAdminManagement.jsx';
import EditUser from './pages/User/EditUser.jsx';
import AddUser from './pages/User/AddUser.jsx';
import CompanyPending from './pages/Company/CompanyPending.jsx';
import CompanyRejected from './pages/Company/CompanyRejected.jsx';
import UserProfileData from './pages/User/UserProfileData/UserProfileData.jsx';
import GetAllPost from './pages/Post/GetAllPost.jsx';
import Subscription from './pages/Subscription/Subscription.jsx';
import AddSubscription from './pages/Subscription/AddSubscription.jsx';
import EditSubscription from './pages/Subscription/EditSubscription.jsx';
import PostApprove from './pages/Post/PostApprove.jsx';
import PostReported from './pages/Post/PostReported.jsx';
import PostRejected from './pages/Post/PostRejected.jsx';
import CompanyApprove from './pages/Company/CompanyApprove.jsx';
import CompanyBlocked from './pages/Company/CompanyBlocked.jsx';
import ReportedCompany from './pages/Company/CompanyReported/ReportedCompany.jsx';
import UserActive from './pages/User/UserActive.jsx';
import UserPending from './pages/User/UserPending.jsx';
import PostPending from './pages/Post/PostPending.jsx';
import Country from './pages/Countrys/Country.jsx';
import AddCountry from './pages/Countrys/AddCountry.jsx';
import EditCountry from './pages/Countrys/EditCountry.jsx';
import ReportedUser from './pages/User/UserReported/ReportedUser.jsx';
import AddReportedUser from './pages/User/UserReported/AddReportedUser.jsx';
import PageSection from './pages/PageSection/PageSection.jsx';
import PageSectionForm from './components/Forms/PageSectionForm.jsx';
import AddPageSection from './pages/PageSection/AddPageSection.jsx';
import Job from './pages/JobManagement/job.jsx';
import Transaction from './pages/Transaction/Transaction.jsx';
import EditTransaction from './pages/Transaction/EditTransaction.jsx';
import RequestPlanTable from './pages/ChangeRequestPlan/RequestPlanTable.jsx';
// import Post from "./pages/Post/Post.jsx";
import PlanRequestApprove from './pages/ChangeRequestPlan/PlanRequestApprove.jsx';
import PlanRequestPending from './pages/ChangeRequestPlan/PlanRequestPending.jsx';
import PlanRequestRejected from './pages/ChangeRequestPlan/PlanRequestRejected.jsx';
import Ecommerce from './pages/Dashboard/ECommerce.jsx';
import CompanyDetail from './pages/Company/CompanyDetailData/CompanyDetail.jsx';
import Settings from './pages/Settings.jsx';
import ContactUs from './pages/Contact/ContactUs.jsx';
import UserBlocked from './pages/User/UserBlockedTable.jsx';
import Testimonial from './pages/Testimonial/Testimonial.jsx';
import AddTestimonial from './pages/Testimonial/AddTestimonial.jsx';
import EditTestimonial from './pages/Testimonial/EditTestimonial.jsx';
import BackupImport from './pages/BackupImport/BackupImport.jsx';
import ImageCleaning from './pages/ImageCleaning/ImageCleaning.jsx';
import EditJob from './pages/JobManagement/EditJob.jsx';


function App() {
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  useEffect(() => {
    if (pathname !== '/') {
      if (pathname === '/forgot-password') {
        navigate('/forgot-password');
      } else {
        const adminId = localStorage.getItem('adminId');
        if (adminId) {
          dispatch(TokenAdmin(adminId)).then((res) => {
            if (res.success == false) {
              localStorage.clear();
              navigate('/');
              toast.error('Your LogIn Session Expired.');
            }
          });
        } else {
          navigate('/');
        }
      }
    }
  }, [pathname]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <PageTitle title="Login Dashboard | Jasmina " />
              <SignIn />
            </>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <>
              <PageTitle title="Forgot Password Dashboard | Jasmina " />
              <ForgotPassword />
            </>
          }
        />
        {/*  */}
        <Route
          path="/dashboard"
          element={
            <>
              <PageTitle title="Dashboard | Jasmina " />
              <Ecommerce />
            </>
          }
        />
        {/* <Route
          path="/upcomingexpirdplan"
          element={
            <>
              <PageTitle title="Experied Plan | Jasmina " />
              <UpcomingExpiredPlan/>
            </>
          }
        /> */}

        <Route
          path="/planrequest/approved"
          element={
            <>
              <PageTitle title="Approved Plan Requests | Jasmina " />
              <PlanRequestApprove />
            </>
          }
        />

        <Route
          path="/planrequest/pending"
          element={
            <>
              <PageTitle title="Pending Plan Requests | Jasmina " />
              <PlanRequestPending />
            </>
          }
        />

        <Route
          path="/planrequest/rejected"
          element={
            <>
              <PageTitle title="Rejected Plan Requests | Jasmina " />
              <PlanRequestRejected />
            </>
          }
        />

        <Route
          path="/role-management"
          element={
            <>
              <PageTitle title="Role | Jasmina " />
              <RoleManagement />
            </>
          }
        />
        <Route
          path="/role-management/role/add-role"
          element={
            <>
              <PageTitle title="Add Role | Jasmina " />
              <AddRoleManagement />
            </>
          }
        />
        <Route
          path="/role-management/role/edit-role"
          element={
            <>
              <PageTitle title="Edit Role | Jasmina " />
              <EditRoleManagement />
            </>
          }
        />
        <Route
          path="/admin-management"
          element={
            <>
              <PageTitle title="Admin | Jasmina " />
              <AdminManagement />
            </>
          }
        />

        <Route
          path="/admin-management/add-admin"
          element={
            <>
              <PageTitle title="Add Admin | Jasmina " />
              <AddAdminManagement />
            </>
          }
        />
        <Route
          path="/admin-management/edit-admin"
          element={
            <>
              <PageTitle title="Edit Admin | Jasmina " />
              <EditAdminManagement />
            </>
          }
        />

        <Route
          path="/useractive"
          element={
            <>
              <PageTitle title="User | Jasmina " />
              <UserActive />
            </>
          }
        />

        <Route
          path="/userpending"
          element={
            <>
              <PageTitle title="User | Jasmina " />
              <UserPending />
            </>
          }
        />
        <Route
          path="/reporteduser"
          element={
            <>
              <PageTitle title="Reported User | Jasmina " />
              <ReportedUser />
            </>
          }
        />
        <Route
          path="/reported-user/add-reported-user"
          element={
            <>
              <PageTitle title="Add Reported User | Jasmina " />
              <AddReportedUser />
            </>
          }
        />
        <Route
          path="/edituser"
          element={
            <>
              <PageTitle title="User | Jasmina " />
              <EditUser />
            </>
          }
        />

        <Route
          path="/user/add-user"
          element={
            <>
              <PageTitle title="Add user | Jasmina " />
              <AddUser />
            </>
          }
        />
        <Route
          path="/userdetail"
          element={
            <>
              <PageTitle title="Add user | Jasmina " />
              <UserProfileData />
            </>
          }
        />
        <Route
          path="/PageSection"
          element={
            <>
              <PageTitle title="PageSection | Book Strut " />
              <PageSection />
            </>
          }
        />
        <Route
          path="/PageSection/EditPageSection"
          element={
            <>
              <PageTitle title="PageSection | Book Strut " />
              <PageSectionForm />
            </>
          }
        />
        <Route
          path="/pageSection/add-page"
          element={
            <>
              <PageTitle title="PageSection | Book Strut " />
              <AddPageSection />
            </>
          }
        />
        <Route
          path="/companyApprove"
          element={
            <>
              <PageTitle title="Company | Jasmina " />
              <CompanyApprove />
            </>
          }
        />
        <Route
          path="/companyblocked"
          element={
            <>
              <PageTitle title="Company | Jasmina " />
              <CompanyBlocked />
            </>
          }
        />
        <Route
          path="/userblocked"
          element={
            <>
              <PageTitle title="Company | Jasmina " />
              <UserBlocked />
            </>
          }
        />
        <Route
          path="/companypending"
          element={
            <>
              <PageTitle title="Company | Jasmina " />
              <CompanyPending />
            </>
          }
        />
        <Route
          path="/companyrejected"
          element={
            <>
              <PageTitle title="Company | Jasmina " />
              <CompanyRejected />
            </>
          }
        />
        <Route
          path="/reportedcompany"
          element={
            <>
              <PageTitle title="Reported Company | Jasmina " />
              <ReportedCompany />
            </>
          }
        />
        <Route
          path="/companydetail"
          element={
            <>
              <PageTitle title="Reported Company | Jasmina " />
              <CompanyDetail />
            </>
          }
        />
        <Route
          path="/post"
          element={
            <>
              <PageTitle title="Post | Jasmina " />
              <GetAllPost />
            </>
          }
        />
        <Route
          path="/postapprove"
          element={
            <>
              <PageTitle title="Post | Jasmina " />
              <PostApprove />
            </>
          }
        />
        <Route
          path="/postrejected"
          element={
            <>
              <PageTitle title="Post | Jasmina " />
              <PostRejected />
            </>
          }
        />
        <Route
          path="/postpending"
          element={
            <>
              <PageTitle title="Post | Jasmina " />
              <PostPending />
            </>
          }
        />
        <Route
          path="/postreported"
          element={
            <>
              <PageTitle title="postreported | Jasmina " />
              <PostReported />
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Settings | Jasmina " />
              <Settings />
            </>
          }
        />
        {/*  */}
        <Route
          path="/subscription"
          element={
            <>
              <PageTitle title="subscription | Jasmina " />
              <Subscription />
            </>
          }
        />
        <Route
          path="/subscription/add-subscription"
          element={
            <>
              <PageTitle title="subscription | Jasmina " />
              <AddSubscription />
            </>
          }
        />
        <Route
          path="/subscription/edit-subscription"
          element={
            <>
              <PageTitle title="subscription | Jasmina " />
              <EditSubscription />
            </>
          }
        />
        <Route
          path="/country"
          element={
            <>
              <PageTitle title="Country | Jasmina " />
              <Country />
            </>
          }
        />
        <Route
          path="/country/add-country"
          element={
            <>
              <PageTitle title="Country | Jasmina " />
              <AddCountry />
            </>
          }
        />
        <Route
          path="/country/edit-country"
          element={
            <>
              <PageTitle title="Country | Jasmina " />
              <EditCountry />
            </>
          }
        />
        <Route
          path="/job"
          element={
            <>
              <PageTitle title="job | Jasmina " />
              <Job />
            </>
          }
        />
        <Route
          path="/job/edit-job"
          element={
            <>
              <PageTitle title="job | Jasmina " />
              <EditJob />
            </>
          }
        />
        <Route
          path="/transaction"
          element={
            <>
              <PageTitle title="transaction | Jasmina " />
              <Transaction />
            </>
          }
        />
        <Route
          path="/transaction/edit-transaction"
          element={
            <>
              <PageTitle title="transaction | Jasmina " />
              <EditTransaction />
            </>
          }
        />
        <Route
          path="/Contact"
          element={
            <>
              <PageTitle title="ContactUs | Jasmina " />
              <ContactUs />
            </>
          }
        />
        <Route
          path="/testimonial"
          element={
            <>
              <PageTitle title="testimonial | Jasmina " />
              <Testimonial />
            </>
          }
        />
        <Route
          path="/testimonial/add-testimonial"
          element={
            <>
              <PageTitle title="testimonial | Jasmina " />
              <AddTestimonial />
            </>
          }
        />
        <Route
          path="/testimonial/edit-testimonial"
          element={
            <>
              <PageTitle title="testimonial | Jasmina " />
              <EditTestimonial />
            </>
          }
        />
        <Route
          path="/backup-import"
          element={
            <>
              <PageTitle title="Backup & Import | Jasmina " />
              <BackupImport />
            </>
          }
        />
        <Route
          path="/image-cleaning"
          element={
            <>
              <PageTitle title="Image Cleaning | Jasmina " />
              <ImageCleaning />
            </>
          }
        />
      </Routes>

      <ToastContainer
        position="bottom-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
