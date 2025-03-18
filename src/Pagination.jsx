import React from 'react';

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  return (
    <div className="pagination">

      <button type="button" 
      class="btn btn-primary"
      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}>
        Previous
        </button>
      <span>Page {currentPage} of {totalPages}</span>
      

      <button type="button" class="btn btn-primary btn-sm" onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}>Next</button>



    </div>
  );
};

export default Pagination;
