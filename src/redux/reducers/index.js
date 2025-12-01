
import { combineReducers } from "redux";
import { loginReducer } from "./loginReducer";
import darkModeReducer from "./DarkModeReducer";
import roleReducer from "./RoleReducer";
import AdminReducer from "./AdminReducer";
import UserReducer from "./UserReducer";
import CompanyReducer from "./CompanyReducer";
import ConnectionReducer from "./ConnectionReducer";
import PostReducer from "./PostReducer";
import SubscriptionReducer from "./SubscriptionReducer";
import CountryReducer from "./CountryReducer";
import JobReducer from "./JobReducer";
import UserReportReducer from "./UserReportReducer";
import pageReducer from "./PageSectionReducer";
import TransactionReducer from "./TransactionReducer";
import ChangePlanReducer from "./ChangePlanReducer";
import ExpiredPlanReducer from "./ExpiredPlanReducer";
import UpcomingExpiredPlanReducer from "./UpcomingExpiredReducer";
import TodaysNewCompanyReducer from "./TodaysNewCompanyReducer";
import TodaysNewRequestReducer from "./TodaysNewRequestReducer";
import SettingReducer from "./SettingReducer";
import ContactReducer from "./ContactReducer";
import TestimonialReducer from "./TestimonialReducer";

const reducers = combineReducers({
  loginUser: loginReducer,
  themeMode: darkModeReducer,
  roleDetails: roleReducer,
  adminDetails: AdminReducer,
  UserReducerDetails: UserReducer,
  CompanyReducerDetails: CompanyReducer,
  ConnectionReducerDetails: ConnectionReducer,
  PostReducerDetails: PostReducer,
  SubscriptionReducerDetails: SubscriptionReducer,
  CountryReducerDetails: CountryReducer,
  JobReducerDetails: JobReducer,
  UserReportReducerDetails: UserReportReducer,
  pageReducerDetails:pageReducer,
  TransactionReducerDetails: TransactionReducer,
  ChangePlanReducerDetails: ChangePlanReducer,
  ExpiredPlanReducerDetail: ExpiredPlanReducer,
  UpcomingExpiredPlanReducerDetail: UpcomingExpiredPlanReducer,
  TodaysNewCompanyReducerDetail: TodaysNewCompanyReducer,
  TodaysNewRequestReducerDetail: TodaysNewRequestReducer,
  settingReducerDetails: SettingReducer,
  ContactReducerDetails: ContactReducer,
  TestimonialReducer: TestimonialReducer,
});

export default reducers;
