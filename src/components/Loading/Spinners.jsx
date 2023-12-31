import Spinner from "react-bootstrap/Spinner";

function Spinners() {
  return (
    <div className="spinner">
      <Spinner style={{ margin: 2 }} animation="grow" variant="primary" />
      <Spinner style={{ margin: 2 }} animation="grow" variant="success" />
      <Spinner style={{ margin: 2 }} animation="grow" variant="danger" />
      <Spinner style={{ margin: 2 }} animation="grow" variant="warning" />
      <Spinner style={{ margin: 2 }} animation="grow" variant="info" />
    </div>
  );
}

export default Spinners;
