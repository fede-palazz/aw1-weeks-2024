import { Spinner } from "react-bootstrap";
import "./BgSpinner.css";

export default function BgSpinner() {
  return (
    <div className="d-flex justify-content-center align-items-center blur-background">
      <Spinner animation="border" role="status" style={{ width: "4rem", height: "4rem" }}>
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}
