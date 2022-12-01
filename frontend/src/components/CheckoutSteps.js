import React from 'react';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import { Link } from "react-router-dom";


export default function CheckoutSteps(props) {
    return (
        <Row className="checkout-steps">
            <Col className={props.step1 ? 'active' : ''}>Sign in</Col>
            <Col className={props.step2 ? 'active' : ''}><Link to="/shipping">Shipping</Link></Col>
            <Col className={props.step3 ? 'active' : ''}>Payment</Col>
            <Col className={props.step4 ? 'active' : ''}>Place Order</Col>
        </Row>
    )
}
