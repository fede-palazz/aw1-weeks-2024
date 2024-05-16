import { Col } from "react-bootstrap";

function Sidebar({ filterItems, activeFilter, handleFilterChange }) {
  return (
    <Col xs md={3} xl={2} className="d-none d-md-block border py-3">
      <p className="fs-5">Filters</p>
      <div className={`list-group list-group-flush`} data-bs-theme="light">
        {filterItems.map((text, index) => (
          <button
            type="button"
            key={index}
            className={`list-group-item list-group-item-action text-capitalize rounded-3
            ${activeFilter === index ? "active" : "border-bottom-0"}
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

function CollapsedSidebar({ filterItems, activeFilter, handleFilterChange }) {
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
