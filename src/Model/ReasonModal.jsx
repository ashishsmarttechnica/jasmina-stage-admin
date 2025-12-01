import React from 'react';
import { Modal } from 'rsuite';
import { Button } from '@mui/material';

const ReasonModal = ({ open, onClose, reason }) => {
  return (
    <Modal size="sm" open={open} onClose={onClose} className="">
      <Modal.Header>
        <h2 className="text-xl font-semibold text-red-600">Reason for Rejection</h2>
      </Modal.Header>
      <Modal.Body>
        <div className="bg-red-50 p-4 rounded shadow-sm border border-red-200">
          <p className="text-md text-red-700 whitespace-pre-wrap break-words">
            {reason || 'No reason provided.'}
          </p>
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

export default ReasonModal; 