import React from 'react';
import { Modal, Button } from 'rsuite';
import noImageIcon from '../images/noImage2.webp'; // Use correct path

const PostModelPopup = ({ open, onClose, post, serverurl }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      size="md"
      className="rounded-2xl bg-white xl:max-w-2xl sm:max-w-sm max-w-xs mx-auto shadow-lg overflow-hidden"
    >
      <Modal.Header className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-white">
        <h2 className="text-2xl font-semibold dark:text-white text-black">
          Post Detail
        </h2>
      </Modal.Header>

      <Modal.Body className="px-4 space-y-4">
        <div className="flex justify-center">
          <img
            src={`${serverurl}/${post?.postImg}`}
            alt="Post"
            className="max-h-64 object-contain rounded"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = noImageIcon;
            }}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-3 rounded shadow-sm">
            <p className="text-sm font-bold text-black dark:text-white">Full Name</p>
            <p className="text-md mt-1 text-gray-800 dark:text-white break-words">
              {post?.userId?.profile?.fullName || 'N/A'}
            </p>
          </div>

          <div className="bg-gray-50 p-3 rounded shadow-sm">
            <p className="text-sm font-bold text-black dark:text-white">Visibility</p>
            <p className="text-md mt-1 text-gray-800 dark:text-white">
              {post?.visible ? 'Visible' : 'Hidden'}
            </p>
          </div>
        </div>

        <div className="bg-gray-50 p-3 rounded shadow-sm">
          <p className="text-sm font-bold text-black dark:text-white">Description</p>
          <p className="text-md mt-1 text-gray-800 dark:text-white whitespace-pre-wrap break-words">
            {post?.postDesc || 'N/A'}
          </p>
        </div>

        {post?.adminReason && (
          <div className="bg-red-50 p-3 rounded shadow-sm border border-red-200">
            <p className="text-sm font-bold text-red-600">Admin Reason for Rejection</p>
            <p className="text-md mt-1 text-red-700 whitespace-pre-wrap break-words">
              {post.adminReason}
            </p>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-3 rounded shadow-sm">
            <p className="text-sm font-semibold text-gray-500">Likes</p>
            <p className="text-gray-700">{post?.totalLike || 0}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded shadow-sm">
            <p className="text-sm font-semibold text-gray-500">Comments</p>
            <p className="text-gray-700">{post?.totalComment || 0}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded shadow-sm">
            <p className="text-sm font-semibold text-gray-500">Shares</p>
            <p className="text-gray-700">{post?.totalShare || 0}</p>
          </div>
        </div>
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

export default PostModelPopup;
