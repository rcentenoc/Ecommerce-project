import React from 'react';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';


export default function CheckoutStepsDelivery(props) {
    return (
        <Row className="checkout-steps-delivery">
            <Col className={props.step1 ? 'active' : ''}>Order received</Col>
            <Col className={props.step2 ? 'active' : ''}>Confirmed order</Col>
            <Col className={props.step3 ? 'active' : ''}>Order shipped</Col>
            <Col className={props.step4 ? 'active' : ''}>Ready for delivery</Col>
            <Col className={props.step5 ? 'recived' : ''}>Order delivered</Col>
        </Row>
    )
}

