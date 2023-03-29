import { useEffect, useState } from "react";
import { NavDropdown } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";

function Navbartop() {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);

  useEffect(() => {
    const item = JSON.parse(localStorage.getItem("user"));
    if (item) {
      setItems(item?.data);
      //  console.log(item)
    }
  }, []);

  const handleLogout = () => {
    // localStorage.removeItem('token-info');
    localStorage.removeItem("user");
    navigate("/");
  };
  // console.log(items,"HOME")
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
      <Container>
        <Navbar.Brand href="/home">Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/list">List</Nav.Link>
            <Nav.Link href="/upload">Upload</Nav.Link>
          </Nav>
          <Nav>
            {/* <Nav.Link href="#deets">More deets</Nav.Link> */}
            <NavDropdown
              title={
                items.length !== 0 ? (
                  <i className="bi bi-person-circle">
                    {" " + items.result[0].username}
                  </i>
                ) : items == undefined ? (
                  "User"
                ) : (
                  "User"
                )
              }
              id="collasible-nav-dropdown"
            >
              <NavDropdown.Item href="/users">Users</NavDropdown.Item>
              <NavDropdown.Item onClick={handleLogout}>logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbartop;
