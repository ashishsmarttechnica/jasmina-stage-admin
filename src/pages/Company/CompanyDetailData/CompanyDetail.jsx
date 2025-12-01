// Updated CompanyDetail.js
import React, { useEffect, useState } from 'react';
import {
  Box,
  Tabs,
  Tab,
  useMediaQuery
} from '@mui/material';
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLinkedin,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaEye,
  FaSuitcase,
  FaBuilding,
  FaGlobe,
  FaMoneyBillWave,
  FaLanguage,
  FaTools,
  FaGlobeAmericas,
  FaUsers,
  FaExternalLinkAlt
} from 'react-icons/fa';
import { IoSearchOutline } from 'react-icons/io5';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import DefaultLayout from '../../../layout/DefaultLayout';
import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import { getSingleCompany } from '../../../redux/actions/CompanyAction';
import { Info, Section } from '../../../common/UserDetailsCommon/UserDetailsCommon';
import noImageIcon from '../../../images/noImage2.webp';
import UserConnection from '../../User/UserProfileData/Connection/UserConnection';
import CompanyConnection from '../../User/UserProfileData/Connection/CompanyConnection';
import CompanyPost from './CompanyPost/CompanyPost';
import ComapanyTransaction from './CompanyTransaction';
import CompanyFeedPost from './CompanyFeedPost';
const serverurl = import.meta.env.VITE_SERVERURL;

const CompanyDetail = () => {
  const [search, setSearch] = useState('');
  const [debounceTimer, setDebounceTimer] = useState(null);
  const [selectedTab, setSelectedTab] = useState(0);
  const [userType, setUserType] = useState('Company');
  const isMobile = useMediaQuery('(max-width:1476px)');
  
  const dispatch = useDispatch();
  const location = useLocation();
  const user = location.state || {};
  console.log(user, 'user+++++++');
  const companyData =user;
  console.log(companyData, 'companyData+++++++');
  
  const companyId = user?._id;
  const viewerId = localStorage.getItem('userId');

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  // useEffect(() => {
  //   dispatch(getSingleCompany(viewerId,companyId));
  // }, []);

  // useEffect(() => {
  //   if (search !== '') {
  //     if (debounceTimer) clearTimeout(debounceTimer);
  //     const timer = setTimeout(() => {
  //       dispatch(getSingleCompany(viewerId,companyId));
  //     }, 400);
  //     setDebounceTimer(timer);
  //     return () => clearTimeout(timer);
  //   } else {
  //     dispatch(getSingleCompany(viewerId,companyId));
  //   }
  // }, [search]);

  return (
    <DefaultLayout>
      <Breadcrumb pageName={`Company Details`} />
      <div className="dark:bg-boxdark dark:text-white">
        <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 2, height: '100%', p: 1 }}>
          {/* Sidebar */}
          <Box
            sx={{ width: isMobile ? '100%' : '30%', backgroundColor: '#fff', borderRadius: 3, padding: 1, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}
          >
            <div className="flex flex-col items-center">
              <div className="w-28 h-28 mb-4">
                <img
                  src={`${serverurl}/${companyData?.logoUrl}`}
                  alt="company logo"
                  onError={(e) => { e.target.onerror = null; e.target.src = noImageIcon; }}
                  className="rounded-full w-full h-full object-cover shadow-md"
                />
              </div>

              <div className="w-full dark:bg-boxdark bg-gray-50 rounded-lg shadow-sm p-5 space-y-6 text-gray-800 text-sm">
                <Section title="Company Information">
                  <Info icon={<FaBuilding />} label="Company Name" value={companyData?.companyName} />
                  <Info icon={<FaSuitcase />} label="Company Type" value={companyData?.companyType} />
                  <Info icon={<FaBuilding />} label="Industry Type" value={companyData?.industryType?.join(', ')} />
                  <Info icon={<FaEnvelope />} label="Email" value={companyData?.email} />
                  <Info icon={<FaPhone />} label="Phone" value={companyData?.phoneNumber} />
                  <Info icon={<FaMapMarkerAlt />} label="Location" value={companyData?.country} />
                  <Info icon={<FaUsers />} label="Employees" value={companyData?.numberOfEmployees} />
                  <Info icon={<FaCheckCircle />} label="Status" value={companyData?.status === 1 ? 'Active' : 'Inactive'} />
                  <Info icon={<FaEye />} label="Profile Complete" value={companyData?.profileComplete ? 'Yes' : 'No'} />
                </Section>

                <Section title="Online Presence">
                  <Info icon={<FaGlobeAmericas />} label="Website" value={<a href={companyData?.website} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">{companyData?.website}</a>} />
                  <Info icon={<FaLinkedin />} label="LinkedIn" value={companyData?.linkedin || 'N/A'} />
                </Section>

                <Section title="Other">
                  <Info icon={<FaExternalLinkAlt />} label="Social Links" value={companyData?.socialLinks || 'N/A'} />
                  <Info icon={<FaTools />} label="DND Enabled" value={companyData?.dndEnabled ? 'Yes' : 'No'} />
                </Section>
              </div>
            </div>
          </Box>

          {/* Main Content */}
          <Box sx={{ flex: 1, padding: 1 }}>
            <Box>
              <div className="flex items-center justify-between dark:bg-boxdark dark:text-white bg-white p-1 rounded-sm">
                <Tabs
                  value={selectedTab}
                  onChange={handleTabChange}
                  variant="scrollable"
                  allowScrollButtonsMobile
                  sx={{
                    '.MuiTabs-flexContainer': {
                      justifyContent: isMobile ? 'space-evenly' : 'flex-start',
                      gap: 1,
                    },
                    '& .MuiTab-root': {
                      textTransform: 'capitalize',
                      '&.Mui-selected': {
                        backgroundColor: '#eee',
                        color: 'textSecondary',
                        borderRadius: 2,
                        borderBottom: 2,
                      },
                    },
                  }}
                >
                  <Tab label="User Connection" />
                  <Tab label="Company Connection" />
                  <Tab label="Job Post" />
                  <Tab label="Transaction History" />
                    {user?.companyType === "ngo" ? <Tab label="Company Post" /> : null}
                  {/* <Tab label="Applied Jobs" /> */}
                </Tabs>

                <div className="flex items-center justify-end ml-10 xsm:mt-0 pt-1 mb-2 xsm:ml-5 sm:min-w-[320px]">
                  <div className="relative w-full">
                    <input
                      type="text"
                      id="search"
                      placeholder="Search.."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="rounded border-[1.5px] xsm:w-[300px] border-stroke bg-transparent py-2 px-5 pl-10 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    <IoSearchOutline className="absolute top-[30%] left-3 text-gray-400" />
                  </div>
                </div>
              </div>
            </Box>

            <Box sx={{ mt: 2, borderRadius: 2, backgroundColor: 'white' }}>
              {/* Content Tabs */}
              {selectedTab === 0 && <UserConnection userType={userType} id={companyId} />}
              {selectedTab === 1 && <CompanyConnection userType={userType} id={companyId}/>}
              {selectedTab === 2 && <CompanyPost id={companyId}/>}
              {selectedTab === 3 && <ComapanyTransaction id={companyId}/>}
              {user?.companyType === "ngo" ? selectedTab === 4 && <CompanyFeedPost id={companyId}/> : null}
              {/* {selectedTab === 3 && <AppliedJob />} */}
            </Box>
          </Box>
        </Box>
      </div>
    </DefaultLayout>
  );
};

export default CompanyDetail;
