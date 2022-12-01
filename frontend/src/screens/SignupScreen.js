import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from 'react-bootstrap/Container';
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Store } from '../Store.js';
import { toast } from "react-toastify";
import { getError } from "../Utils.js";

export default function SingupScreen() {
    const navigate = useNavigate();

    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';

    const { state, dispatch: contextDispatch } = useContext(Store);
    const { userInfo } = state;


    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Password and Confirm Password Are Not Matched');
            return;
        }
        try {
            const { data } = await Axios.post('/api/users/signup', {
                name, 
                email, 
                password,
            });
            contextDispatch({ type: 'USER_SIGNIN', payload: data });
            localStorage.setItem('userInfo', JSON.stringify(data));
            navigate(redirect || '/');
            console.log(data);
        } catch (error) {
            toast.error(getError(error));
            // alert('Invalid email or password');
            console.log(error);
        }
    };

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo]);

    return (
        <Container fluid className="small-container">
            <Helmet>
                <title>Amazona - Sign Up</title>
            </Helmet>

            <h1 className="my-3">Sign Up</h1>
            <Form onSubmit={submitHandler}>

                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="name" placeholder="Enter your name" required
                        onChange={(e) => setName(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter your email" required
                        onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter your password" required
                        onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="confirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter again your password" required
                        onChange={(e) => setConfirmPassword(e.target.value)} />
                </Form.Group>

                <div className="mb-3">
                    <Button type="submit">Sign Un</Button>
                </div>

                <div className="mb-3">
                    Already have an account? {' '}
                    <Link to={`/signin?redirect=${redirect}`}>Sign In</Link>
                </div>
            </Form>
        </Container>
    )

}