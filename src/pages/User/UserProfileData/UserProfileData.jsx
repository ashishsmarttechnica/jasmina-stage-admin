import React, { useEffect, useState } from 'react';
import {
  Box,
  Tabs,
  Tab,
  useMediaQuery,
  AvatarGroup,
  Button,
} from '@mui/material';
import {
  FaUser,
  FaEnvelope,
  FaUserCircle,
  FaVenusMars,
  FaCheckCircle,
  FaPhone,
  FaLinkedin,
  FaMapMarkerAlt,
  FaBirthdayCake,
  FaSuitcase,
  FaBuilding,
  FaGlobe,
  FaMoneyBillWave,
  FaLanguage,
  FaGraduationCap,
  FaTools,
  FaEye,
} from 'react-icons/fa';

// import DefaultLayout from '../../layout/DefaultLayout';
import { useSelector } from 'react-redux';
// import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { IoSearchOutline } from 'react-icons/io5';
import { Input } from 'rsuite';
import { Skeleton } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import noImageIcon from '../../../images/noImage2.webp';
import DefaultLayout from '../../../layout/DefaultLayout';
import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import { toast } from 'react-toastify';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { getSingleUser } from '../../../redux/actions/UserAction';
import {
  Info,
  Section,
} from '../../../common/UserDetailsCommon/UserDetailsCommon';
import UserConnection from './Connection/UserConnection';
import CompanyConnection from './Connection/CompanyConnection';
import UserPost from './UserPost/UserPost';
import AppliedJob from './AppliedJob/AppliedJob';
const serverurl = import.meta.env.VITE_SERVERURL;
const UserProfileData = () => {
  const [search, setSearch] = useState('');
  const [debounceTimer, setDebounceTimer] = useState(null);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [selectedTab, setSelectedTab] = useState(0);
  const isMobile = useMediaQuery('(max-width:1476px)');
  const UserData = useSelector(
    (state) => state?.UserReducerDetails?.singleData,
  );

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state || {};

  const MySwal = withReactContent(Swal);
  const userId = user._id;
  const [userType, setUserType] = useState('User');
  const searchMyData = async () => {
    try {
      if (search.trim()) {
        dispatch(getSingleUser(userId));
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    dispatch(getSingleUser(userId));
  }, []);

  useEffect(() => {
    if (search != '') {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
      const timer = setTimeout(() => {
        searchMyData();
      }, 400);
      setDebounceTimer(timer);
      return () => {
        clearTimeout(timer);
      };
    } else {
      dispatch(getSingleUser(userId));
    }
  }, [search]);
// console.log("user",user)
  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName={`User Details`} />
        <div className="dark:bg-boxdark dark:text-white">
          <Box
            sx={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              gap: 2,
              height: '100%',
              p: isMobile ? 1 : 1,
            }}
          >
            {/* Sidebar */}
            <Box
              sx={{
                width: isMobile ? '100%' : '30%',
                backgroundColor: '#fff',
                borderRadius: 3,
                padding: 1,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              }}
            >
              {/* Profile Section */}
              <div className="flex flex-col items-center">
                <div className="w-28 h-28 mb-4">
                  <img
                    src={`${serverurl}/${user?.profile?.photo}`}
                    alt="profile"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = noImageIcon;
                    }}
                    className="rounded-full w-full h-full object-cover shadow-md"
                  />
                </div>

                {/* Main Info */}
                <div className="w-full dark:bg-boxdark bg-gray-50 rounded-lg shadow-sm p-5 space-y-6 text-gray-800 text-sm">
                  <Section title="Basic Information">
                    <Info
                      icon={<FaUser />}
                      label="Full Name"
                      value={user?.fullName}
                    />
                    <Info
                      icon={<FaUserCircle />}
                      label="Username"
                      value={user?.profile?.userName}
                    />
                    <Info
                      icon={<FaEnvelope />}
                      label="Email"
                      value={user?.email}
                    />
                    <Info
                      icon={<FaVenusMars />}
                      label="Gender"
                      value={user?.profile?.gender}
                    />
                    <Info
                      icon={<FaPhone />}
                      label="Phone"
                      value={user?.profile?.phone}
                    />
                    <Info
                      icon={<FaLinkedin />}
                      label="LinkedIn"
                      value={
                        <a
                          href={user?.profile?.linkedin}
                          className="text-blue-600 underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {user?.profile?.linkedin}
                        </a>
                      }
                    />
                    <Info
                      icon={<FaMapMarkerAlt />}
                      label="Location"
                      value={user?.profile?.location}
                    />
                    <Info
                      icon={<FaBirthdayCake />}
                      label="Date of Birth"
                      value={new Date(user?.profile?.dob).toLocaleDateString()}
                    />
                    <Info
                      icon={<FaCheckCircle />}
                      label="Status"
                      value={user?.status === 1 ? 'Active' : 'Inactive'}
                    />
                    <Info
                      icon={<FaEye />}
                      label="Public Profile"
                      value={user?.visibility?.isPublic ? 'Yes' : 'No'}
                    />
                  </Section>

                  <Section title="Preferences">
                    <Info
                      icon={<FaSuitcase />}
                      label="Job Type"
                      value={user?.preferences?.jobType.join(', ')}
                    />
                    <Info
                      icon={<FaMoneyBillWave />}
                      label="Expected Salary"
                      value={user?.preferences?.expectedSalaryRange}
                    />
                    <Info
                      icon={<FaBuilding />}
                      label="Industry"
                      value={user?.preferences?.preferredIndustry}
                    />
                    <Info
                      icon={<FaGlobe />}
                      label="Preferred Location"
                      value={user?.preferences?.preferredLocation}
                    />
                    <Info
                      icon={<FaTools />}
                      label="Experience"
                      value={`${user?.preferences?.yearsOfExperience} years`}
                    />
                  </Section>

                  <Section title="Education" icon={<FaGraduationCap />}>
                    {user?.education.map((edu) => (
                      <div key={edu?._id} className="ml-4">
                        <p>
                          <strong>{edu?.degreeName.toUpperCase()}</strong> from{' '}
                          {edu?.schoolOrCollege}, {edu?.universityOrBoard} (
                          {edu?.passingYear})
                        </p>
                      </div>
                    ))}
                  </Section>

                  <Section title="Skills" icon={<FaTools />}>
                    {user?.skills.map((skill) => (
                      <div key={skill?._id} className="ml-4">
                        <p>
                          {skill?.name} - {skill?.proficiencyLevel} (
                          {skill?.yearsOfExperience} year)
                        </p>
                      </div>
                    ))}
                  </Section>

                  <Section title="Languages" icon={<FaLanguage />}>
                    {user?.languages.map((lang) => (
                      <div key={lang?._id} className="ml-4">
                        <p>
                          {lang?.name.charAt(0).toUpperCase() +
                            lang?.name.slice(1)}{' '}
                          - {lang?.proficiency}
                        </p>
                      </div>
                    ))}
                  </Section>
                </div>
              </div>
            </Box>

            {/* Main Content */}
            <Box
              sx={{
                flex: 1,
                padding: isMobile ? 1 : 0,
              }}
            >
              <Box sx={{}}>
                <div className="flex items-center justify-between dark:bg-boxdark dark:text-white bg-white p-1 rounded-sm">
                  <Tabs
                    value={selectedTab}
                    onChange={handleTabChange}
                    variant="scrollable"
                    allowScrollButtonsMobile
                    sx={{
                      '.MuiTabs-flexContainer': {
                        justifyContent: isMobile
                          ? 'space-evenly'
                          : 'flex-start',
                        gap: isMobile ? 1 : 1,
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
                    <Tab label="User Post" />
                    <Tab label="Applied Jobs" />
                  </Tabs>

                  <div className="flex items-center justify-end ml-10 xsm:mt-0 pt-1 mb-2 xsm:ml-5 sm:min-w-[320px]">
                    <div className="relative w-full">
                      <input
                        type="text"
                        id="search"
                        placeholder="Search.."
                        value={search}
                        onChange={(val) => setSearch(val.target.value)}
                        className="rounded border-[1.5px] xsm:w-[300px] border-stroke bg-transparent py-2 px-5 pl-10  text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary rs-input"
                      />
                      <IoSearchOutline className="absolute top-[30%] left-3 text-gray-400" />
                    </div>
                  </div>
                </div>
              </Box>

              <Box sx={{ mt: 2, borderRadius: 2, backgroundColor: 'white' }}>
                {selectedTab === 0 && <UserConnection userType={userType} id={userId}/>}
                {selectedTab === 1 && <CompanyConnection userType={userType} id={userId}/>}
                {selectedTab === 2 && <UserPost />}
                {selectedTab === 3 && <AppliedJob />}
              </Box>
            </Box>
          </Box>
        </div>
      </DefaultLayout>
    </>
  );
};
export default UserProfileData;
