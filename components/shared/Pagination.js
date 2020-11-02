import { useState } from "react";
import Pagination from "react-js-pagination";

const AppPagination = ({ count }) => {
  const [activePage, setActivePage] = useState(1);
  return (
    <Pagination
      activePage={activePage}
      itemsCountPerPage={10}
      totalItemsCount={count || 0}
      pageRangeDisplayed={5}
      onChange={(page) => setActivePage(page)}
      itemClass="page-item"
      linkClass="page-link"
    />
  );
};

export default AppPagination;
