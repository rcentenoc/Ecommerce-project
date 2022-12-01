import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import { useContext } from 'react';
import { Store } from '../Store';
import axios from 'axios';

function Product(props) {
    const { product } = props;
    const { state, dispatch: contextDispatch } = useContext(Store);
    const {
        cart: { cartItems },
    } = state;

    const addToCartHandler = async (item) => {
        const existItem = cartItems.find((x) => x._id === product._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/products/${item._id}`);

        if (data.countInStock < quantity) {
            window.alert('Sorry. The product is out of stock');
            return;
        }

        contextDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...item, quantity },
        });
    };

    return (
        <Card >
            <Link to={`/product/${product.slug}`}>
                <img src={product.image} className="card-img-top" alt={product.name} />
            </Link>
            <Card.Body>
                <Link to={`/product/${product.slug}`}>
                    <Card.Title>{product.name}</Card.Title>
                </Link>
                <Rating rating={product.rating} numReviews={product.numReviews} />
                <Card.Text>
                    S/ {product.price}
                </Card.Text>

                {product.countInStock === 0 ?
                    (<Button variant="light" disabled>Out of stock</Button>)
                    : (<Button onClick={() => addToCartHandler(product)} className="btn-add-cart" >Add to cart</Button>)
                }

            </Card.Body>
        </Card>
    )
}

export default Product;