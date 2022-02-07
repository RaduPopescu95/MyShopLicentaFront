import React, { useState, useEffect } from "react";
import {
  useParams,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
import { Container, Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { savePaymentMethod } from "../actions/cartActions";

function PaymentScreen() {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const location = useLocation();
  const redirect = useNavigate();
  const dispatch = useDispatch();

  const [paymentMethod, setPaymentMethod] = useState(
    cart.paymentMethod ? cart.paymentMethod : ""
  );

  if (!shippingAddress.address) {
    redirect("/shipping");
  }

  const handleChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const resetRadioState = () => {
    setPaymentMethod("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    redirect("/placeorder");
    console.log("Submit PAYMENT");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="PayPal"
              id="paypal"
              checked={paymentMethod === "PayPal"}
              name="paymentMethod"
              value="PayPal"
              onChange={handleChange}
            ></Form.Check>
            <Form.Check
              type="radio"
              label="Credit Card"
              id="Credit Card"
              checked={paymentMethod === "Credit Card"}
              name="paymentMethod"
              value="Credit Card"
              onChange={handleChange}
            ></Form.Check>
          </Col>
        </Form.Group>

        <Button className="my-3 " type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
}

export default PaymentScreen;
