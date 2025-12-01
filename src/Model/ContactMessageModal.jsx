import React from 'react';
import { Modal } from 'rsuite';
import { Button } from '@mui/material';
import { FaUser, FaEnvelope, FaFileAlt, FaComments } from 'react-icons/fa';

const ContactMessageModal = ({ open, onClose, contactData }) => {
  if (!contactData) return null;

  return (
    <Modal size="md" open={open} onClose={onClose} className="">
      <Modal.Header>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
          <FaComments className="text-primary" />
          Contact Message Details
        </h2>
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-4">
          {/* Name */}
          <div className="flex items-start gap-3">
            <FaUser className="text-primary mt-1 flex-shrink-0" />
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                Name
              </label>
              <p className="text-gray-800 dark:text-gray-200 font-medium">
                {contactData.name || 'N/A'}
              </p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start gap-3">
            <FaEnvelope className="text-primary mt-1 flex-shrink-0" />
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                Email
              </label>
              <p className="text-gray-800 dark:text-gray-200 font-medium">
                {contactData.email || 'N/A'}
              </p>
            </div>
          </div>

          {/* Subject */}
          <div className="flex items-start gap-3">
            <FaFileAlt className="text-primary mt-1 flex-shrink-0" />
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                Subject
              </label>
              <p className="text-gray-800 dark:text-gray-200 font-medium">
                {contactData.subject || 'N/A'}
              </p>
            </div>
          </div>

          {/* Message */}
          <div className="flex items-start gap-3">
            <FaComments className="text-primary mt-1 flex-shrink-0" />
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                Message
              </label>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap break-words leading-relaxed">
                  {contactData.message || 'No message content.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="flex justify-end gap-2 items-center mt-2">
          <Button onClick={onClose} variant="outlined">
            Close
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default ContactMessageModal;
