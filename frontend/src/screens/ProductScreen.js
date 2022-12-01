import axios from "axios";
import { useContext, useEffect, useReducer } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Rating from "../components/Rating";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { getError } from "../Utils";
import { Store } from "../Store";

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, product: action.payload };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

function ProductScreen() {
    const params = useParams();
    const navigate = useNavigate();
    const { slug } = params;

    const [{ loading, error, product }, dispatch] = useReducer(reducer, {
        product: [],
        loading: true,
        error: '',
    })
    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' })
            try {
                const result = await axios.get(`/api/products/slug/${slug}`);
                dispatch({ type: 'FETCH_SUCCESS', payload: result.data })
            } catch (error) {
                dispatch({ type: 'FETCH_FAIL', payload: getError(error) });
            }
        };
        fetchData();
    }, [slug]);

    // ------------------ Add to cart ------------------
    const { state, dispatch: contextDispatch } = useContext(Store);
    console.log(state);
    const { cart } = state;
    const addToCartHandler = async () => {
        const existItem = cart.cartItems.find((item) => item._id === product._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/products/${product._id}`);

        if (data.countInStock < quantity) {
            window.alert('Sorry. The product is out of stock');
            return;
        }

        contextDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...product, quantity },
        });

        navigate('/cart');
    };

    return (
        loading ? (
            <LoadingBox />
        ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
        )
            : (
                <div>
                    <Row>
                        <Col md={6}>
                            <Image src={product.image} alt={product.name} fluid></Image>
                        </Col>
                        <Col md={3}>
                            <ListGroup variant="flush">

                                <ListGroup.Item>
                                    <Helmet>
                                        <title>{product.name}</title>
                                    </Helmet>
                                    <h1>{product.name}</h1>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Rating
                                        rating={product.rating}
                                        numReviews={product.numReviews}
                                    ></Rating>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    S/ {product.price}
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <strong>Description:</strong><br />
                                    {product.description}
                                </ListGroup.Item>

                            </ListGroup>
                        </Col>
                        <Col md={3}>
                            <Card>
                                <Card.Body>
                                    <ListGroup variant="flush">

                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Price:</Col>
                                                <Col><strong>S/. {product.price}</strong></Col>
                                            </Row>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Status:</Col>
                                                <Col>
                                                    {product.countInStock > 0 ?
                                                        (<Badge bg="success">In stock</Badge>)
                                                        : (<Badge bg="danger">Unavailable</Badge>)
                                                    }
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>

                                        {product.countInStock > 0 && (
                                            <ListGroup.Item>
                                                <div className="d-grid">
                                                    <Button onClick={addToCartHandler}>Add to cart</Button>
                                                </div>
                                            </ListGroup.Item>
                                        )}
                                    </ListGroup>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </div>)
    );
}

export default ProductScreen;