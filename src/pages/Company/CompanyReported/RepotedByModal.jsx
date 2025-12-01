import React, { useState, useEffect } from "react";
import { Modal } from "rsuite";
import { useDispatch, useSelector } from "react-redux";
import { getRepoterData } from "../../../redux/actions/ReportedUserAction";
import TableSearch from "../../../components/TableSearch";
import CustomPagination from "../../../components/CustomPagination";
import { Skeleton } from "@mui/material";
import noImageIcon from '../../../images/noImage2.webp';

const RepotedByModal = ({ open, onClose, id, isStatus }) => {
  const serverurl = import.meta.env.VITE_SERVERURL;
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [lastserch, setLastSearch] = useState(false);
  const [debounceTimer, setDebounceTimer] = useState(null);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);

  // Reset modal state when it closes
  useEffect(() => {
    if (!open) {
      setSearch("");
      setLastSearch(false);
      setPage(0);
      setLimit(10);
      if (debounceTimer) {
        clearTimeout(debounceTimer);
        setDebounceTimer(null);
      }
    }
  }, [open]);

  const { repoterData, loading } = useSelector(
    (state) => state?.UserReportReducerDetails
  );

  //#region Get Data
  useEffect(() => {
    if (open && id) {
      dispatch(getRepoterData(search, isStatus, page, limit, id));
    }
  }, [page, limit, open, id]);

  useEffect(() => {
    if (open && id) {
      if (search !== "") {
        setLastSearch(true);
        if (debounceTimer) clearTimeout(debounceTimer);
        const timer = setTimeout(() => {
          dispatch(getRepoterData(search.trim(), isStatus, page, limit, id));
        }, 400);
        setDebounceTimer(timer);
        return () => clearTimeout(timer);
      } else {
        if (lastserch) {
          dispatch(getRepoterData(search, isStatus, page, limit, id));
          setLastSearch(false);
        }
      }
    }
  }, [search, id, open]);
  //#endregion

  return (
    <Modal open={open} onClose={onClose} centered size="md" backdrop="static">
      <Modal.Header>
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-white">
          <h5 className="text-lg font-semibold m-0">Reported By List</h5>
        </div>
      </Modal.Header>

      <Modal.Body>
        {/* Search bar */}
        {/* <div className="rounded-md border border-stroke bg-white dark:bg-boxdark p-2 mb-3 shadow-sm">
          <TableSearch search={search} setSearch={setSearch} />
        </div> */}

        {/* List */}
        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
          {loading
            ? Array(limit)
                .fill({})
                .map((_, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 border rounded-lg p-3 shadow-sm bg-white dark:bg-boxdark"
                  >
                    <Skeleton variant="circular" width={40} height={40} />
                    <div className="flex-1 space-y-1">
                      <Skeleton width={120} />
                      <Skeleton width={80} />
                      <Skeleton width={150} />
                    </div>
                  </div>
                ))
            : repoterData?.data?.reports?.map((item, i) => {
                const src =
                  item?.reporterUserId?.profile?.photo ||
                  item?.reporterUserId?.logoUrl;
                return (
                  <div
                    key={i}
                    className="flex items-start gap-3 border border-stroke rounded-lg p-3 shadow-sm hover:shadow-md transition bg-white dark:bg-boxdark"
                  >
                    <img
                      src={`${serverurl}/${src}`}
                      alt="logo"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = noImageIcon;
                      }}
                      
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-gray-800 dark:text-gray-100">
                        {item?.reporterUserId?.companyName ||
                          item?.reporterUserId?.profile?.fullName}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        <span className="font-semibold">Reason:</span>{" "}
                        {item?.reason}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        <span className="font-semibold">Description:</span>{" "}
                        {item?.description}
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>

        {/* Pagination */}
        {repoterData?.data?.total > 0 && (
          <div className="flex items-center justify-end mt-4">
            <CustomPagination
              page={page}
              limit={limit}
              setPage={setPage}
              setLimit={setLimit}
              count={repoterData?.data?.total || 0}
            />
          </div>
        )}
      </Modal.Body>

      <Modal.Footer>
        <button className="btn btn-secondary" onClick={onClose}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default RepotedByModal;
