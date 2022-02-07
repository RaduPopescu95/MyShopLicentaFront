import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { Container, Button, Row, Col, InputGroup } from "react-bootstrap";
import { updateTheme } from "../actions/userActions";

function ThemeChange() {
  const dispatch = useDispatch();
  const temaProfil = useSelector((state) => state.temaProfil);

  const { dark, light } = temaProfil;
  const theme = localStorage.getItem("theme");
  const [design, setDesign] = useState();

  const handleThemeChange = () => {
    dispatch(updateTheme());
  };

  useEffect(() => {
    if (dark) {
      setDesign("white");
    } else {
      setDesign("black");
    }
  }, [dark, light]);

  return (
    <InputGroup>
      <Button
        style={{ backgroundColor: `${design}` }}
        color="link"
        onClick={handleThemeChange}
      >
        <i
          className={!dark ? "fas fa-sun" : "fas fa-moon"}
          style={
            !dark
              ? { fontSize: "2rem", color: "white" }
              : { fontSize: "2rem", color: "black" }
          }
        ></i>
      </Button>
    </InputGroup>
  );
}

export default ThemeChange;
