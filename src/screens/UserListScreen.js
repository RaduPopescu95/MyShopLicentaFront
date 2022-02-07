import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { getUsersList } from "../actions/userActions";

function UserListScreen() {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList);
  const { loading, users, error } = userList;

  useEffect(() => {
    dispatch(getUsersList());
  }, [dispatch]);
  return (
    <div>
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <th>ID</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>ADMIN</th>
            <th></th>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.isAdmin ? (
                    <i
                      className="fas fa-check"
                      style={{ color: "green", fontSize: "1.5rem" }}
                    ></i>
                  ) : (
                    <i
                      className="fas fa-times "
                      style={{ color: "red", fontSize: "1.5rem" }}
                    ></i>
                  )}
                </td>
                <td>
                  <Link
                    className="btn btn-sm btn-primary "
                    to={`/admin/user/${user._id}`}
                  >
                    {
                      <i
                        className="fas fa-edit"
                        style={{ fontSize: "1rem" }}
                      ></i>
                    }
                  </Link>
                  <Button className="btn btn-sm btn-danger mx-2 ">
                    {" "}
                    <i
                      className="fas fa-trash"
                      style={{ fontSize: "1rem" }}
                    ></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default UserListScreen;
