declare module 'react-paginate' {
    import { Component } from 'react';
  
    export interface ReactPaginateProps {
      pageCount: number;
      pageRangeDisplayed?: number;
      marginPagesDisplayed?: number;
      previousLabel?: string | React.ReactNode;
      nextLabel?: string | React.ReactNode;
      breakLabel?: string | React.ReactNode;
      breakClassName?: string;
      breakLinkClassName?: string;
      onPageChange?: (selectedItem: { selected: number }) => void;
      initialPage?: number;
      forcePage?: number;
      disableInitialCallback?: boolean;
      containerClassName?: string;
      pageClassName?: string;
      pageLinkClassName?: string;
      activeClassName?: string;
      activeLinkClassName?: string;
      previousClassName?: string;
      nextClassName?: string;
      previousLinkClassName?: string;
      nextLinkClassName?: string;
      disabledClassName?: string;
      hrefBuilder?: (pageIndex: number) => void;
      extraAriaContext?: string;
    }
  
    export default class ReactPaginate extends Component<ReactPaginateProps> {}
  }