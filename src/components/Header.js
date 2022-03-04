import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navbar, Nav, Container, NavItem, NavDropdown } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import SearchBox from "./SearchBox";
import { logout } from "../actions/userActions";
import ThemeChange from "./ThemeChange";

function Header() {
  const userLogin = useSelector((state) => state.userLogin);
  const theme = localStorage.getItem("theme");
  const [tema, setTheme] = useState(theme);
  const temaProfil = useSelector((state) => state.temaProfil);

  const { dark, light } = temaProfil;

  const { userInfo } = userLogin;
  const dispatch = useDispatch();
  const redirect = useNavigate();
  // const navDropdownTitle = (
  //   <Link className="navDropTitle" to="">
  //     <i className="fas fa-user "></i>
  //     {userInfo && userInfo.name}
  //   </Link>
  // );

  const logoutHandler = () => {
    console.log("logggout");
    dispatch(logout());
  };

  const handleSelect = (event) => redirect(event);

  useEffect(() => {
    setTheme(theme);
  }, [dark, light]);

  return (
    <header>
      <Navbar
        className="p-2"
        // bg={tema ? tema : "light"}
        bg={"dark"}
        expand="lg"
        // variant={tema ? tema : "light"}
        variant={"dark"}
        collapseOnSelect
      >
        <Container>
          {/* <Link className="anchors" to="/">
            <Navbar.Brand>MyShop</Navbar.Brand>
          </Link> */}

          <Nav.Link
            as={NavLink}
            to="/"
            style={{ width: "10em", Height: "10em" }}
          >
            <Navbar.Brand>MyShop</Navbar.Brand>
          </Nav.Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <SearchBox />
            <Nav className="mr-auto">
              {/* <Link className="navl" to="/cart">
                <i className="fas fa-shopping-cart"></i>Cart
              </Link> */}
              <Nav.Link as={NavLink} to="/cart">
                <i className="fas fa-shopping-cart"></i>Cart
              </Nav.Link>

              {userInfo ? (
                <NavDropdown title={userInfo.name}>
                  <NavDropdown.Item onClick={() => handleSelect("/profile")}>
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link as={NavLink} to="/login">
                  <i className="fas fa-user"></i>Login
                </Nav.Link>
              )}

              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <NavDropdown.Item
                    onClick={() => handleSelect("/admin/userlist")}
                  >
                    Users
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={() => handleSelect("/admin/productlist")}
                  >
                    Products
                  </NavDropdown.Item>

                  <NavDropdown.Item
                    onClick={() => handleSelect("/admin/orderlist")}
                  >
                    Orders
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
