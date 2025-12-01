import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal } from 'rsuite';
import { getSingleUser } from '../redux/actions/UserAction';

const UserDetailModelPopup = ({ open, onClose, description }) => {
  const dispatch = useDispatch();
  const loading = useSelector(
    (state) => state?.UserReducerDetails?.singleLoadingData,
  );

  const singleData = useSelector(
    (state) => state?.UserReducerDetails?.singleData?.data,
  );
  

  useEffect(() => {
    if (description) {
      dispatch(getSingleUser(description));
    }
  }, [description]);

  const infoFields = [{ label: 'First Name', value: singleData?.firstName }];

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="md"
      className="rounded-2xl bg-white xl:max-w-2xl sm:max-w-sm max-w-xs mx-auto shadow-lg overflow-hidden"
    >
      <Modal.Header className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-white">
        {loading ? (
          <div className="h-6 w-32 bg-gray-300 dark:bg-gray-600 animate-pulse rounded" />
        ) : (
          <h2 className="text-2xl font-semibold dark:text-white text-black">
            Company Detail
          </h2>
        )}
      </Modal.Header>

      <Modal.Body className="px-4 space-y-4">
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <span className="text-gray-700 dark:text-white animate-pulse">
              Loading...
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
                    {item.label}
                  </p>
                  <p className="text-md mt-1 text-gray-800 dark:text-white break-words">
                    {item.value || 'N/A'}
                  </p>
                </div>
              ))}
            </div>

            {singleData?.description && (
              <div className="p-4 rounded-lg shadow-sm bg-gray-50">
                <p className="text-sm font-medium dark:text-white text-black">
                  Description
                </p>
                <p className="text-md dark:text-white text-gray-800 mt-2 leading-relaxed">
                  {singleData.description}
                </p>
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

export default UserDetailModelPopup;
