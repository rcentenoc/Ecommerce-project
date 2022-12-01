import axios from "axios";
import { useContext } from "react";
import { Store } from "../Store";

function BtnAddCart() {
    const { state, dispatch: contextDispatch } = useContext(Store);
    const {
        cart: { cartItems },
    } = state;

    const addToCartHandler = async (item) => {
        const existItem = cartItems.find((item) => item._id === product._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/products/${item._id}`)

        if (data.countInStock < quantity) {
            window.alert('Sorry. The product is out of stock');
            return;
        }

        contextDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...item, quantity },
        });
    }

    return (
        <div className="d-grid">
            <button >Add to cart</button>
        </div>
    )
}

export default BtnAddCart;