import Pagination from "react-js-pagination";

const AppPagination = ({ count, pageSize, pageNum, onChange }) => {
  return (
    <Pagination
      activePage={pageNum}
      itemsCountPerPage={pageSize}
      totalItemsCount={count}
      pageRangeDisplayed={5}
      onChange={(page) => {
        onChange(page, pageSize);
      }}
      itemClass="page-item"
      linkClass="page-link"
    />
  );
};

export default AppPagination;
