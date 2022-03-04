import React from "react";
import { Pagination, Nav } from "react-bootstrap";

import { Link, NavLink, useNavigate } from "react-router-dom";

function Paginate({ pages, page, keyword = "", isAdmin = false }) {
  if (keyword) {
    keyword = keyword.split("?keyword=")[1].split("&")[0];
  }

  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          <Link
            key={x + 1}
            to={
              !isAdmin
                ? `/?keyword=${keyword}&page=${x + 1}`
                : `/admin/productlist/?keyword=${keyword}&page=${x + 1}`
            }
            className={x + 1 === page ? "blocks activa" : "blocks"}
          >
            {x + 1}
          </Link>
        ))}
      </Pagination>
    )
  );
}

export default Paginate;
