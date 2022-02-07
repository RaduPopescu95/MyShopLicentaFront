import React from "react";

function themeHelper(dark, bg) {
  if (dark) {
    // let clasa = "black-content-txt";
    return "black-content-txt";
  } else {
    // let clasa = "white-content-txt";
    return "white-content-txt";
  }

  // if (dark || bg == "dark-content") {
  //   return document
  //     .getElementsByClassName("txtcl")
  //     .classList.add("black-content-txt");
  // } else {
  //   return document
  //     .getElementsByClassName("txtcl")
  //     .classList.remove(" white-content-txt");
  // }
}

export default themeHelper;
