import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Badge from "react-bootstrap/Badge";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { Store } from "./Store";
import CartScreen from "./screens/CartScreen";
import SinginScreen from "./screens/SigninScreen";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import SingupScreen from "./screens/SignupScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import ProfileScreen from "./screens/ProfileScreen";
import Button from "react-bootstrap/Button";
import { useEffect } from "react";
import { getError } from "./Utils";
import axios from "axios";
import SearchBox from "./components/SearchBox";
import SearchScreen from "./screens/SearchScreen";

function App() {
  //cart
  const { state, dispatch: contextDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    contextDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
    window.location.href = '/signin';
  }
  //-----------------------
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get('/api/products/categories');
        setCategories(data);
      } catch (error) {
        toast.error(getError(error));
      }
    };
    fetchCategories();
  }, []);

 
  //-----------------------
  return (
    <BrowserRouter>
      <div className={sidebarIsOpen ?
        "d-flex flex-column site-container active-cont" :
        "d-flex flex-column site-container"} >
        <ToastContainer position="bottom-center" limit="1" />
        <header className="App-header">
          <Navbar bg="dark" variant="dark" expand="lg">
            <Container>

              <Button
                variant="dark"
                onClick={() => setSidebarIsOpen(!sidebarIsOpen)}>
                <i className="fas fa-bars"></i>
              </Button>

              <LinkContainer to="/">
                <Navbar.Brand>Amazona</Navbar.Brand>
              </LinkContainer>

              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">

                <SearchBox />

                <Nav className="me-auto w-100  justify-content-end">
                  <Link to="/cart" className="navbar-shopping-cart">
                    <i className="fas fa-shopping-cart"></i>
                    {
                      cart.cartItems.length > 0 ? (
                        <Badge pill bg="danger">
                          {cart.cartItems.reduce((accumulator, currentItem) =>
                            accumulator + currentItem.quantity, 0)}
                        </Badge>
                      ) : (
                        <Badge pill bg="primary">
                          {cart.cartItems.reduce((accumulator, currentItem) =>
                            accumulator + currentItem.quantity, 0)}
                        </Badge>
                      )
                    }
                  </Link>
                  {userInfo ? (
                    <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                      <LinkContainer to="/profile">
                        <NavDropdown.Item>User Profile</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/orderhistory">
                        <NavDropdown.Item>Order History</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Divider />
                      {/* <LinkContainer to="#signout" onClick={signoutHandler}>
                      <NavDropdown.Item>Sign Out</NavDropdown.Item>
                    </LinkContainer> */}
                      <Link className="dropdown-item" to="#signout" onClick={signoutHandler}>
                        Sign out
                      </Link>
                    </NavDropdown>
                  ) : (
                    <Link className="nav-link" to="/signin">
                      Sign In
                    </Link>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>

        <div
          className={
            sidebarIsOpen ?
              "active-nav side-navbar d-flex justify-content-between flex-wrap flex-column" :
              "side-navbar d-flex justify-content-between flex-wrap flex-column"
          }>
          <Nav className="flex-column text-white w-100 p-2">
            <Nav.Item>
              <strong>Categories</strong>
            </Nav.Item>
            {categories.map((category) => (
              <Nav.Item key={category}>
                <LinkContainer
                  to={`/search?category=${category}`}
                  onClick={() => setSidebarIsOpen(false)}>
                  <Nav.Link className="text-warning text-bold">{category}</Nav.Link>
                </LinkContainer>
              </Nav.Item>
            ))}
          </Nav>

          {/* <Nav className="flex-column text-white w-100 p-2">
            <Nav.Item>
              <strong>Brands</strong>
            </Nav.Item>
            {brands.map((brand) => (
              <Nav.Item key={brand}>
                <LinkContainer
                  to={`/search?brand=${brand}`}
                  onClick={() => setSidebarIsOpen(false)}>
                  <Nav.Link className="text-warning text-bold">{brand}</Nav.Link>
                </LinkContainer>
              </Nav.Item>
            ))}
          </Nav> */}
        </div>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/product/:slug" element={<ProductScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/search" element={<SearchScreen />} />
              <Route path="/signin" element={<SinginScreen />} />
              <Route path="/signup" element={<SingupScreen />} />
              <Route path="/shipping" element={<ShippingAddressScreen />} />
              <Route path="/payment" element={<PaymentMethodScreen />} />
              <Route path="/placeorder" element={<PlaceOrderScreen />} />
              <Route path="/order/:id" element={<OrderScreen />} />
              <Route path="/orderhistory" element={<OrderHistoryScreen />} />
              <Route path="/profile" element={<ProfileScreen />} />
              <Route path="/" element={<HomeScreen />} />
            </Routes>
          </Container>
        </main>
        <footer>
          <div className="text-center">All rights reserved®</div>
        </footer>
      </div>
    </BrowserRouter >
  );
}

export default App;
