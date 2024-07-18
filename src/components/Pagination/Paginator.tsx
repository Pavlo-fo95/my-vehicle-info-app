import React from 'react';
import ReactPaginate from 'react-paginate';
import './Paginator.css';

interface PaginatorProps {
  pageCount: number;
  onPageChange: (selectedItem: { selected: number }) => void;
}

const Paginator: React.FC<PaginatorProps> = ({ pageCount, onPageChange }) => {
  return (
    <ReactPaginate
      previousLabel={'previous'}
      nextLabel={'next'}
      breakLabel={'...'}
      breakClassName={'break-me'}
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={onPageChange}
      containerClassName={'pagination'}
      activeClassName={'active'}
    />
  );
};

export default Paginator;