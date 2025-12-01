import { Button } from '@mui/material';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Modal } from 'rsuite';
import { getSinglePages } from '../redux/actions/PageSectionAction';

const PageDescriptionModal = ({ open, onClose, description }) => {
  const dispatch = useDispatch();
  const loading = useSelector(
    (state) => state?.pageReducerDetails?.singleLoadingData,
  );
  console.log(loading, 'loading');

  const singleData = useSelector(
    (state) => state?.pageReducerDetails?.singleData,
  );
  console.log(singleData, 'singleData');

  useEffect(() => {
    if (description) {
      dispatch(getSinglePages(description));
    }
  }, [description]);

  return (
    <Modal size="lg" open={open} onClose={onClose} className="">
      <Modal.Header>
        {loading ? (
          <div className="h-6 w-32 bg-gray-300 dark:bg-gray-600 animate-pulse rounded" />
        ) : (
          <h2 className="text-2xl font-semibold dark:text-white text-black">
            {singleData?.sections?.information_name}
          </h2>
        )}
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <div className="flex justify-center items-center h-150">
            <span className="text-gray-700 dark:text-white animate-pulse">
              Loading...
            </span>
          </div>
        ) : (
          <>
            <div
              dangerouslySetInnerHTML={{
                __html: singleData?.sections?.information_Description,
              }}
              className="text-black dark:text-white indesc"
            ></div>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <div className="flex justify-end gap-2 items-center mt-2">
          <Button onClick={onClose} variant="outlined">
            Cancel
          </Button>
          <Button onClick={onClose} variant="contained">
            Ok
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default PageDescriptionModal;
