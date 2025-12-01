import React from 'react';
import { Button, Modal } from 'rsuite';

const UserProfileModal = ({ open, onClose, userData }) => {
  if (!open) return null;

  // Extract the actual user data from the API response
  const actualUserData = userData?.data || userData;
  const { profile, preferences, visibility, education, skills, languages, experience, email, status, role, views, connectionCount, createdAt } = actualUserData || {};

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusText = (status) => {
    return status === 1 ? 'Active' : 'Inactive';
  };

  const infoFields = [
    { label: 'Full Name', value: profile?.fullName },
    { label: 'Username', value: profile?.userName },
    { label: 'Email', value: email },
    { label: 'Phone', value: profile?.phone },
    { label: 'Date of Birth', value: formatDate(profile?.dob) },
    { label: 'Gender', value: profile?.gender },
    { label: 'Location', value: profile?.location },
    { label: 'Availability', value: profile?.availabilty },
    { label: 'Status', value: getStatusText(status) },
    { label: 'Profile Views', value: views || 0 },
    { label: 'Connections', value: connectionCount || 0 },
    { label: 'Member Since', value: formatDate(createdAt) },
    { label: 'Profile Public', value: visibility?.isPublic ? 'Yes' : 'No' },
    { label: 'LGBTQ+ Friendly Only', value: visibility?.onlyLGBTQFriendlyCompanies ? 'Yes' : 'No' },
  ];

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="md"
      className="rounded-2xl bg-white xl:max-w-2xl sm:max-w-sm max-w-xs mx-auto shadow-lg overflow-hidden"
    >
      <Modal.Header className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-white">
        <h2 className="text-2xl font-semibold dark:text-white text-black">
          User Profile Details
        </h2>
      </Modal.Header>

      <Modal.Body className="px-4 space-y-4">
        {!userData ? (
          <div className="flex justify-center items-center h-40">
            <span className="text-gray-700 dark:text-white">
              No user data available
            </span>
          </div>
        ) : userData.error ? (
          <div className="flex justify-center items-center h-40">
            <div className="text-center">
              <div className="text-red-500 text-lg mb-2">⚠️ Error</div>
              <span className="text-gray-700 dark:text-white">{userData.error}</span>
            </div>
          </div>
        ) : !actualUserData ? (
          <div className="flex justify-center items-center h-40">
            <span className="text-gray-700 dark:text-white">
              No user data available
            </span>
          </div>
        ) : (
          <>
            <div className="grid xl:grid-cols-2 grid-cols-1 gap-3">
              {infoFields.map((item, index) => (
                <div
                  key={index}
                  className="p-3 rounded-lg shadow-sm bg-gray-50"
                >
                  <p className="text-sm font-bold text-black dark:text-white">
                    {item?.label}
                  </p>
                  <p className="text-md mt-1 text-gray-800 dark:text-white break-words">
                    {item?.value || 'N/A'}
                  </p>
                </div>
              ))}
            </div>

            {profile?.short_bio && (
              <div className="p-4 rounded-lg shadow-sm bg-gray-50">
                <p className="text-sm font-medium dark:text-white text-black">
                  Bio
                </p>
                <p className="text-md dark:text-white text-gray-800 mt-2 leading-relaxed">
                  {profile.short_bio}
                </p>
              </div>
            )}

            {/* Education */}
            {education && education.length > 0 && education[0]?.degreeName && education[0]?.degreeName !== "" && (
              <div className="p-4 rounded-lg shadow-sm bg-gray-50">
                <p className="text-sm font-medium dark:text-white text-black mb-3">
                  Education
                </p>
                <div className="space-y-3">
                  {education.map((edu, index) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-3">
                      <p className="text-sm font-semibold text-gray-800 dark:text-white">{edu.degreeName}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-300">{edu.schoolOrCollege}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{edu.passingYear} • {edu.universityOrBoard}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills */}
            {skills && skills.length > 0 && skills[0]?.name && skills[0]?.name !== "" && (
              <div className="p-4 rounded-lg shadow-sm bg-gray-50">
                <p className="text-sm font-medium dark:text-white text-black mb-3">
                  Skills
                </p>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <div key={index} className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full text-xs">
                      <span className="font-medium">{skill.name}</span>
                      {skill.proficiencyLevel && (
                        <span className="ml-1">({skill.proficiencyLevel})</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Experience */}
            {experience && experience.length > 0 && experience[0]?.jobTitle && experience[0]?.jobTitle !== "" && (
              <div className="p-4 rounded-lg shadow-sm bg-gray-50">
                <p className="text-sm font-medium dark:text-white text-black mb-3">
                  Experience
                </p>
                <div className="space-y-3">
                  {experience.map((exp, index) => (
                    <div key={index} className="border-l-4 border-green-500 pl-3">
                      <p className="text-sm font-semibold text-gray-800 dark:text-white">{exp.jobTitle}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-300">{exp.companyName}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{exp.location} • {exp.position}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Languages */}
            {languages && languages.length > 0 && languages[0]?.name && languages[0]?.name !== "" && (
              <div className="p-4 rounded-lg shadow-sm bg-gray-50">
                <p className="text-sm font-medium dark:text-white text-black mb-3">
                  Languages
                </p>
                <div className="flex flex-wrap gap-2">
                  {languages.map((lang, index) => (
                    <div key={index} className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded-full text-xs">
                      <span className="font-medium">{lang.name}</span>
                      {lang.proficiency && (
                        <span className="ml-1">({lang.proficiency})</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Social Media */}
            {(profile?.facebook || profile?.instagram || profile?.linkedin || profile?.x) && 
             (profile?.facebook !== "" || profile?.instagram !== "" || profile?.linkedin !== "" || profile?.x !== "") && (
              <div className="p-4 rounded-lg shadow-sm bg-gray-50">
                <p className="text-sm font-medium dark:text-white text-black mb-3">
                  Social Media
                </p>
                <div className="flex flex-wrap gap-2">
                  {profile.facebook && (
                    <a href={profile.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 text-xs">
                      Facebook
                    </a>
                  )}
                  {profile.instagram && (
                    <a href={profile.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-800 text-xs">
                      Instagram
                    </a>
                  )}
                  {profile.linkedin && (
                    <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900 text-xs">
                      LinkedIn
                    </a>
                  )}
                  {profile.x && (
                    <a href={profile.x} target="_blank" rel="noopener noreferrer" className="text-black dark:text-white hover:text-gray-600 text-xs">
                      X (Twitter)
                    </a>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </Modal.Body>

      <Modal.Footer className="flex justify-end space-x-4 p-5 border-t border-gray-200 bg-gray-50">
        <Button
          onClick={onClose}
          appearance="ghost"
          className="border dark:text-white border-gray-300 text-gray-600 hover:bg-gray-200 rounded-lg px-5 py-2"
        >
          Cancel
        </Button>
        <Button
          onClick={onClose}
          appearance="primary"
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-6 py-2"
        >
          Done
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserProfileModal;
