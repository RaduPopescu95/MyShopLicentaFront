import React from "react";
import { Card } from "react-bootstrap";
import products from "../products";
import Rating from "./Rating";
import { Link } from "react-router-dom";

function Product({ produs }) {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${produs._id}`}>
        <Card.Img src={produs.image} />
      </Link>

      <Card.Body>
        <Link className="anchors" to={`/product/${produs._id}`}>
          <Card.Title as="div">
            <strong id="txtcl">{produs.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <div className="my-3">
            <Rating
              value={produs.rating}
              text={`${produs.numReviews} ${
                produs.numReviews === 1 ? "review" : "reviews"
              }`}
              color={"#f8e825"}
              numarRev={produs.numReviews}
            />
          </div>
        </Card.Text>

        <Card.Text as="h3">${produs.price}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Product;
