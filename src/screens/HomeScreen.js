import React, { useState, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import Product from "../components/Product";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import ThemeChange from "../components/ThemeChange";
import ProductCarousel from "../components/ProductCarousel";
// import axios from 'axios' replaced using redux

function HomeScreen() {
  const dispatch = useDispatch();
  let location = useLocation();

  let keyword = location.search;

  const productList = useSelector((state) => state.productList);
  const {
    error: eroare,
    loading: incarcare,
    products: produse,
    page,
    pages,
  } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  // const key = () => {
  //   console.log("keyword:", keyword);
  // };

  return (
    <div>
      {!keyword && <ProductCarousel />}

      <h1 id="txtcl">latest products</h1>
      {/* <Button onClick={key}>asa</Button> */}
      {incarcare ? (
        <Loader />
      ) : eroare ? (
        <Message variant="danger">{eroare}</Message>
      ) : (
        <div>
          <Row>
            {produse.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product produs={product} />
              </Col>
            ))}
          </Row>
          <Paginate page={page} pages={pages} keyword={keyword} />
        </div>
      )}
    </div>
  );
}

export default HomeScreen;
