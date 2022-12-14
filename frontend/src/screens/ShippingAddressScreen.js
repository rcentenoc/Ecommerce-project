import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/esm/Container';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { Store } from '../Store';
import CheckoutSteps from '../components/CheckoutSteps';

export default function ShippingAddressScreen() {

    const navigate = useNavigate();
    const { state, dispatch: contextDispatch } = useContext(Store);
    const { userInfo, cart: { shippingAddress }, } = state;

    const [fullName, setFullName] = useState(shippingAddress.fullName || '');
    const [address, setAddress] = useState(shippingAddress.address || '');
    const [city, setCity] = useState(shippingAddress.city || '');
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');

    useEffect(()=>{
        if(!userInfo){
            navigate('/signin?redirect=/shipping');
        }
    },[userInfo, navigate]);

    const [country, setCountry] = useState(shippingAddress.country || '');

    const submitHandler = (e) => {
        e.preventDefault();
        console.log(fullName, address, city, postalCode, country);
        contextDispatch({
            type: 'SAVE_SHIPPING_ADDRESS',
            payload: { fullName, address, city, postalCode, country },
        });
        localStorage.setItem(
            'shippingAddress',
            JSON.stringify({
                fullName,
                address,
                city,
                postalCode,
                country,
            })
        );
        navigate('/payment');
    }
    return (
        <div>
            <Helmet>
                <title>Amazona - Shipping Address</title>
            </Helmet>

            <CheckoutSteps step1 step2></CheckoutSteps>

            <Container fluid className="small-container">

                <h1 className="my-3">Shipping Address</h1>
                <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-3" controlId="fullName">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                            value={fullName}
                            type="text"
                            placeholder="Enter your full name"
                            onChange={(e) => setFullName(e.target.value)}
                            required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="address">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            value={address}
                            type="text"
                            placeholder="Enter your address"
                            onChange={(e) => setAddress(e.target.value)}
                            required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="city">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                            value={city}
                            type="text"
                            placeholder="Enter your city"
                            onChange={(e) => setCity(e.target.value)}
                            required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="postalCode">
                        <Form.Label>Postal Code</Form.Label>
                        <Form.Control
                            value={postalCode}
                            type="text"
                            placeholder="Enter your postal code"
                            onChange={(e) => setPostalCode(e.target.value)}
                            required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="country">
                        <Form.Label>Country</Form.Label>
                        <Form.Control
                            value={country}
                            type="text"
                            placeholder="Enter your country"
                            onChange={(e) => setCountry(e.target.value)}
                            required />
                    </Form.Group>
                    <div className="mb-3">
                        <Button type="submit" className="btn btn-primary">Continue</Button>
                    </div>
                </Form>
            </Container>

        </div>
    );
}
