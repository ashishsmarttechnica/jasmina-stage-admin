import React from 'react';
import { Modal } from 'rsuite';
import { Button, Chip } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LanguageIcon from '@mui/icons-material/Language';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Tooltip } from '@mui/material';

const JobDetailsModal = ({ isOpen, onClose, jobData }) => {
  if (!jobData) return null;

  return (
    <Modal size="lg" open={isOpen} onClose={onClose} className="!w-full md:!w-[800px]">
      <Modal.Header>
        <Tooltip title={jobData?.jobTitle || ''} arrow placement="bottom">
          <h2 className="text-2xl font-semibold dark:text-white text-black truncate max-w-full">
            {jobData?.jobTitle?.length > 70
              ? jobData?.jobTitle.slice(0, 70) + '...'
              : jobData?.jobTitle}
          </h2>
        </Tooltip>
      </Modal.Header>

      <Modal.Body>
        <div className="text-sm text-black dark:text-white space-y-4">

          <section>
            <h3 className="text-lg font-semibold mb-1">Job Information</h3>
            <hr className="mb-2 border-gray-300" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <p><strong>Company ID:</strong> {jobData?.companyId}</p>
              <p><WorkIcon className="inline-block mr-1 text-gray-500" /> <strong>Employee Type:</strong> {jobData?.employeeType}</p>
              <p><strong>Department:</strong> {jobData?.department}</p>
              <p><LocationOnIcon className="inline-block mr-1 text-gray-500" /> <strong>Location:</strong> {jobData?.jobLocation}</p>
              <p><strong>Seniority Level:</strong> {jobData?.seniorityLevel}</p>
              <p><strong>Salary Range:</strong> {jobData?.salaryRange}</p>
              <p><strong>Work Hours:</strong> {jobData?.workHours}</p>
              <p><strong>Contact:</strong> {jobData?.contactNumber}</p>
              <p><strong>Experience:</strong> {jobData?.experience} years</p>
              <p><strong>Education:</strong> {jobData?.education}</p>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold mt-4 mb-1">Requirements</h3>
            <hr className="mb-2 border-gray-300" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <strong>Required Languages:</strong>
                <div className="flex flex-wrap gap-2 mt-1">
                  {jobData?.requiredLanguages?.map((lang, idx) => (
                    <Chip key={idx} label={lang} size="small" variant="outlined" />
                  ))}
                </div>
              </div>

              <div>
                <strong>Required Skills:</strong>
                <div className="flex flex-wrap gap-2 mt-1">
                  {jobData?.requiredSkills?.map((skill, idx) => (
                    <Chip key={idx} label={skill} size="small" color="primary" />
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold mt-4 mb-1">Application Info</h3>
            <hr className="mb-2 border-gray-300" />
            <p><strong>Apply via:</strong> {jobData?.applyVia}</p>
            <p>
              <LanguageIcon className="inline-block mr-1 text-gray-500" />
              <strong>Career Website:</strong>{' '}
              <a
                href={jobData?.careerWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                {jobData?.careerWebsite}
              </a>
            </p>
            <p>
              <CalendarMonthIcon className="inline-block mr-1 text-gray-500" />
              <strong>Deadline:</strong>{' '}
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">
                {new Date(jobData?.deadline).toLocaleDateString()}
              </span>
            </p>
            <p><strong>Status:</strong> {jobData?.status === 1 ? 'Active' : 'Inactive'}</p>
          </section>

          <section>
            <h3 className="text-lg font-semibold mt-4 mb-1">Job Description</h3>
            <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded prose prose-sm dark:prose-invert">
              <div dangerouslySetInnerHTML={{ __html: jobData?.description }} />
            </div>

            <h3 className="text-lg font-semibold mt-4 mb-1">Responsibilities</h3>
            <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded prose prose-sm dark:prose-invert">
              <div dangerouslySetInnerHTML={{ __html: jobData?.responsibilities }} />
            </div>
          </section>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <div className="flex justify-end gap-2 items-center mt-2">
          <Button onClick={onClose} variant="outlined" color="error">
            Close
          </Button>
          {/* <Button onClick={onClose} variant="contained" color="primary">
            Apply
          </Button> */}
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default JobDetailsModal;
