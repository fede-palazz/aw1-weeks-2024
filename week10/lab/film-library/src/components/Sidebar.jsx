import { Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function Sidebar({ filters }) {
  return (
    <Col xs md={3} xl={2} className="d-none d-md-block border py-3">
      <p className="fs-5">Filters</p>
      <div className={`list-group list-group-flush`} data-bs-theme="light">
        {filters.map((filter, index) => (
          <NavLink
            to={filter.url}
            key={index}
            className={({
              isActive,
            }) => `list-group-item list-group-item-action text-capitalize rounded-3
            ${isActive ? "active" : "border-bottom-0"}
          `}
          >
            {filter.label}
          </NavLink>
        ))}
      </div>
    </Col>
  );
}

function CollapsedSidebar({ filters }) {
  return (
    <Col className="d-md-none">
      <p className="fs-5 mt-3 text-light">Filters</p>
      <div
        className={`list-group list-group-flush rounded`}
        data-bs-theme="light"
      >
        {filters.map((filter, index) => (
          <NavLink
            type="button"
            key={index}
            className={({
              isActive,
            }) => `list-group-item list-group-item-action text-capitalize border text-dark
            ${isActive ? "active bg-dark-subtle" : "border-bottom-0"}
          `}
          >
            {filter.label}
          </NavLink>
        ))}
      </div>
    </Col>
  );
}

export { Sidebar, CollapsedSidebar };
