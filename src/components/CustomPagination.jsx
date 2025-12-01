import React, { useState } from 'react';
import TablePagination from '@mui/material/TablePagination';

const CustomPagination = ({ page, limit, setPage, setLimit, count }) => {
  const handleChangeRowsPerPage = (e) => {
    setLimit(parseInt(e.target.value, 10));
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <div>
      <TablePagination
        component="div"
        count={count}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={limit}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 15, 20, 50]}
      />
    </div>
  );
};

export default CustomPagination;
