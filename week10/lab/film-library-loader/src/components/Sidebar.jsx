import { Col } from "react-bootstrap";
import { NavLink, useLoaderData } from "react-router-dom";

function Sidebar({ filterItems }) {
  const { searchTerm } = useLoaderData();
  return (
    <Col xs md={3} xl={2} className="d-none d-md-block border py-3">
      <p className="fs-5">Filters</p>
      <div className={`list-group list-group-flush`} data-bs-theme="light">
        {filterItems.map((text, index) => (
          <NavLink
            to={`/films/${text}?search=${searchTerm}`}
            key={index}
            className={({ isActive }) =>
              `list-group-item list-group-item-action text-capitalize rounded-3 ${
                isActive ? "active" : "border-bottom-0"
              }`
            }
          >
            {text}
          </NavLink>
        ))}
      </div>
    </Col>
  );
}

function CollapsedSidebar({ filterItems, activeFilter }) {
  return (
    <Col className="d-md-none">
      <p className="fs-5 mt-3 text-light">Filters</p>
      <div
        className={`list-group list-group-flush rounded`}
        data-bs-theme="light"
      >
        {filterItems.map((text, index) => (
          <button
            type="button"
            key={index}
            className={`list-group-item list-group-item-action text-capitalize border text-dark
            ${
              activeFilter === index
                ? "active bg-dark-subtle"
                : "border-bottom-0"
            }
          `}
            onClick={() => handleFilterChange(index)}
          >
            {text}
          </button>
        ))}
      </div>
    </Col>
  );
}

export { Sidebar, CollapsedSidebar };
