import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {
  deleteUser,
  getUsersList,
  getUserDetails,
} from "../actions/userActions";

function UserListScreen() {
  const redirect = useNavigate();
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const userLogin = useSelector((state) => state.userLogin);
  const userDelete = useSelector((state) => state.userDelete);
  const { loading, users, error } = userList;
  const { userInfo } = userLogin;
  const { success: successDelete, error: eroareStergere } = userDelete;
  const [currentAdmin, setCurrentAdmin] = useState(false);

  const deleteHandler = (id) => {
    if (id === userInfo._id) {
      setCurrentAdmin(true);
      setTimeout(() => {
        setCurrentAdmin(false);
      }, 3000);
    } else if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(id));
    }
  };

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getUsersList());
      // dispatch(getUserDetails(userInfo._id));
    } else {
      redirect("/");
    }
    console.log(userInfo._id);
  }, [dispatch, userInfo, successDelete, currentAdmin]);
  return (
    <div>
      <h1>Users</h1>
      {currentAdmin && (
        <Message variant="danger">Cannot delete current logged admin!</Message>
      )}
      {loading ? (
        <Loader />
      ) : error || eroareStergere ? (
        <Message variant="danger">
          {eroareStergere ? eroareStergere : error ? error : "Unknown error"}
        </Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
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
                    to={`/admin/userlist/${user._id}/edit`}
                  >
                    {
                      <i
                        className="fas fa-edit"
                        style={{ fontSize: "1rem" }}
                      ></i>
                    }
                  </Link>
                  <Button
                    className="btn btn-sm btn-danger mx-2 "
                    onClick={() => deleteHandler(user._id)}
                  >
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
