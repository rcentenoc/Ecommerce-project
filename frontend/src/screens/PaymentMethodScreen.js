import React, { useContext, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import { Store } from '../Store';

export default function PaymentMethodScreen() {

    const navigate = useNavigate();

    const { state, dispatch: contextDispatch } = useContext(Store);

    const { cart: { shippingAddress, paymentMethod }, } = state;

    const [paymentMethodName, setPaymentMethod] = useState(paymentMethod || 'Paypal');

    useEffect(() => {
        if (!shippingAddress.address) {
            navigate('/shipping');
        }
    }, [shippingAddress, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();
        contextDispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName });
        localStorage.setItem('paymentMethod', paymentMethodName);
        navigate('/placeorder');
    }

    return (
        <div>
            <CheckoutSteps step1 step2 step3></CheckoutSteps>

            <Container fluid className="small-container">

                <Helmet>
                    <title>Amazona - Payment Method</title>
                </Helmet>

                <h1 className="my-3">Payment Method</h1>

                <Form onSubmit={submitHandler}>
                    <Form.Group>
                        <Form.Label as="legend">Select Method</Form.Label>
                        <Col>
                            <Form.Check
                                type="radio"
                                label="PayPal or Credit Card"
                                id="PayPal"
                                value="PayPal"
                                checked={paymentMethodName === 'PayPal'}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                            <Form.Check
                                type="radio"
                                label="Stripe"
                                id="Stripe"
                                value="Stripe"
                                checked={paymentMethodName === 'Stripe'}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                        </Col>
                    </Form.Group>
                    <Button type="submit" variant="primary">Continue</Button>

                </Form>

            </Container>

        </div>
    )
}
