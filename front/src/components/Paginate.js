import React from 'react';
import { Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const Paginate = ({
  pageIndex,
  pageCount,
  canPreviousPage,
  canNextPage,
  previousPage,
  nextPage,
  pageSize,
  setPageSize,
}) => {
  const handlePageSizeChange = (event) => {
    setPageSize(Number(event.target.value));
  };

  return (
    <div>
      <Button onClick={previousPage} disabled={!canPreviousPage}>
        Previous
      </Button>
      <Button onClick={nextPage} disabled={!canNextPage}>
        Next
      </Button>
      <div>
        Страница{' '}
        <strong>
          {pageIndex + 1} of {pageCount}
        </strong>
      </div>
    </div>
  );
};

export default Paginate;
