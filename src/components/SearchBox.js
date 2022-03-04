import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

function SearchBox() {
  const [keyword, setKeyword] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(location);
    console.log(navigate);
    if (keyword) {
      navigate(`/?keyword=${keyword}&page=1`);
    } else {
      navigate(-1);
    }
  };
  return (
    <Form onSubmit={submitHandler} inline className="d-flex my-1 ">
      <Form.Control
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        className="mr-sm-2 ml-sm-5"
      ></Form.Control>

      <Button type="submit" variant="outline-success" className="p-2">
        Submit
      </Button>
    </Form>
  );
}

export default SearchBox;
