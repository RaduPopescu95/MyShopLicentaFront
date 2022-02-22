import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { Container, Form, Button, Row, Col, Table } from "react-bootstrap";
// import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { getUserDetails, updateUserDetails } from "../actions/userActions";
import {
  USER_UPDATE_PROFILE_RESET,
  USER_DETAILS_RESET,
} from "../constants/userConstants";
import { getUserOrders, getUserOrdersList } from "../actions/orderActions";
import ThemeChange from "../components/ThemeChange";

import themeHelper from "../utils/themeHelper";

function ProfileScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [clasa, setClasa] = useState("");

  const dispatch = useDispatch();

  const location = useLocation();
  const redirect = useNavigate();

  const userDetails = useSelector((state) => state.userDetails);
  const userUpdate = useSelector((state) => state.userUpdate);
  const userOrders = useSelector((state) => state.userOrders);
  const temaProfil = useSelector((state) => state.temaProfil);
  const userLogin = useSelector((state) => state.userLogin);

  const { dark, light } = temaProfil;
  const { user, error, loading } = userDetails;
  const { userInfo: infoUser } = userLogin;
  const { succes } = userUpdate;
  const {
    loading: incarcareComenzi,
    error: eroareComenzi,
    orders: comenzi,
    success: successComenzi,
  } = userOrders;
  let backg = localStorage.getItem("bg");
  useEffect(() => {
    if (!infoUser) {
      redirect("/login");
    } else {
      if (!user || !user.name || succes || infoUser._id !== user._id) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });

        dispatch(getUserDetails("profile"));
        dispatch(getUserOrdersList());
        console.log("dispatching...");
      } else {
        setName(user.name);
        setEmail(user.email);
        console.log("Settingsss......");
      }
    }

    if (backg == "dark-content") {
      setClasa("white-content-txt");
    } else {
      setClasa("");
    }
  }, [infoUser, dispatch, user, redirect, succes, dark, light]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords don't match!");
    } else {
      dispatch(
        updateUserDetails({
          id: user._id,
          name: name,
          email: email,
          password: password,
        })
      );

      setMessage("");
      console.log("Updating..");
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2 className={clasa}>User Profile</h2>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label className={clasa}>Name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label className={clasa}>Email address</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="paswword">
            <Form.Label className={clasa}>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="paswwordConfirm">
            <Form.Label className={clasa}>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          {/* <Container className="d-flex justify-content-center"> */}
          <Button className="my-3 " type="submit" variant="primary">
            Update
          </Button>
          <ThemeChange />
          {/* </Container> */}
        </Form>
      </Col>
      <Col md={9}>
        <h2 className={clasa}>My Orders</h2>
        {incarcareComenzi ? (
          <Loader />
        ) : eroareComenzi ? (
          <Message variant="danger">{eroareComenzi}</Message>
        ) : (
          <Table striped responsive className="table-sm">
            <thead>
              <tr>
                <th className={clasa}>ID</th>
                <th className={clasa}>Date</th>
                <th className={clasa}>Total</th>
                <th className={clasa}>Paid</th>
                <th className={clasa}>Delivered</th>
              </tr>
            </thead>
            <tbody>
              {comenzi.map((comanda) => (
                <tr key={comanda._id}>
                  <td>{comanda._id}</td>
                  <td>{comanda.createdAt.substring(0, 10)}</td>
                  <td>${comanda.totalPrice}</td>
                  <td>
                    {comanda.isPaid ? (
                      comanda.paidAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>

                  <td>
                    <Link
                      className="btn btn-sm btn-primary "
                      to={`/order/${comanda._id}`}
                    >
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
}

export default ProfileScreen;
