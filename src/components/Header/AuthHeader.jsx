import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

function AuthHeader() {
  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#">
          <img
            alt=""
            src="/icons/logo.jpg"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
          Company name
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default AuthHeader;
