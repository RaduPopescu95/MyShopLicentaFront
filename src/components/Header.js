import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navbar, Nav, Container, NavItem, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { logout } from "../actions/userActions";

function Header() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();
  const navDropdownTitle = (
    <Link className="navDropTitle" to="">
      <i className="fas fa-user "></i>
      {userInfo && userInfo.name}
    </Link>
  );

  const logoutHandler = () => {
    console.log("logggout");
    dispatch(logout());
  };

  return (
    <header>
      <Navbar bg="dark" expand="lg" variant="dark" collapseOnSelect>
        <Container>
          <Link className="anchors" to="/">
            <Navbar.Brand>MyShop</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Link className="navl" to="/cart">
                <i className="fas fa-shopping-cart"></i>Cart
              </Link>

              {userInfo ? (
                <NavDropdown
                  className="navDrop "
                  title={navDropdownTitle}
                  id="username"
                >
                  <NavDropdown.Item className="navDropLink">
                    <Link className="text-decoration-none " to="/profile">
                      Profile
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={logoutHandler}
                    className="navDropLink"
                  >
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Link className="navl  mx-3" to="/login">
                  <i className="fas fa-user"></i>Login
                </Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
