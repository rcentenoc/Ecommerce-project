import React, { useEffect, useReducer, useState } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { getError } from '../Utils';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Rating from '../components/Rating';
import Button from 'react-bootstrap/Button';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Product from '../components/Product';
import { LinkContainer } from 'react-router-bootstrap';


const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return {
                ...state,
                loading: false,
                products: action.payload.products,
                page: action.payload.page,
                pages: action.payload.pages,
                countProducts: action.payload.countProducts,
            };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}

const prices = [
    {
        name: 'S/ 1 - S/ 50',
        value: '1-50',
    },
    {
        name: 'S/ 51 - S/ 100',
        value: '51-100',
    },
    {
        name: 'S/ 101 - S/ 150',
        value: '101-150',
    },
    {
        name: 'S/ 151 - S/ 200',
        value: '151-200',
    },
    {
        name: 'S/ 201 - S/ 300',
        value: '201-300',
    },
];

const ratings = [
    {
        name: '4 stars & up',
        rating: '4',
    },
    {
        name: '3 stars & up',
        rating: '3',
    },
    {
        name: '2 stars & up',
        rating: '2',
    },
    {
        name: '1 stars & up',
        rating: '1',
    },
];

export default function SearchScreen() {
    const navigate = useNavigate();
    const { search } = useLocation();
    const temporal = new URLSearchParams(search);
    // console.log(temporal.get('temporal'));
    const category = temporal.get('category') || 'all';
    const query = temporal.get('query') || 'all';
    const price = temporal.get('price') || 'all';
    const rating = temporal.get('rating') || 'all';
    const order = temporal.get('order') || 'newest';
    const page = temporal.get('page') || 1;

    const [{ loading, error, products, pages, countProducts }, dispatch] =
        useReducer(reducer,
            {
                loading: true,
                error: '',
            });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(
                    `/api/products/search?page=${page}&query=${query}&category=${category}&price=${price}&rating=${rating}&order=${order}`
                );
                dispatch({ type: 'FETCH_SUCCESS', payload: data });
            } catch (error) {
                dispatch({
                    type: 'FETCH_FAIL',
                    payload: getError(error),
                });
            }
        };
        fetchData();
    }, [page, query, category, price, rating, order, error]);

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
    }, [dispatch]);

    const getFilterUrl = (filter) => {
        const filterPage = filter.page || page;
        const filterCategory = filter.category || category;
        const filterQuery = filter.query || query;
        const filterPrice = filter.price || price;
        const filterRating = filter.rating || rating;
        const sortOrder = filter.order || order;

        return `/search?page=${filterPage}&category=${filterCategory}&query=${filterQuery}&price=${filterPrice}&rating=${filterRating}&order=${sortOrder}`;
    };

    return (
        <div>
            <Helmet>
                <title>Search Results</title>
            </Helmet>
            <Row>
                <Col md={3}>

                    <div>
                        <h3>Departament</h3>
                        <ul>
                            <li>
                                <Link
                                    className={'all' === category ? 'text-bold' : ''}
                                    to={getFilterUrl({ category: 'all' })}
                                >Any</Link>
                            </li>
                            {categories.map((c) => (
                                <li key={c}>
                                    <Link
                                        className={c === category ? 'text-bold' : ''}
                                        to={getFilterUrl({ category: c })}
                                    >{c}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3>Price</h3>
                        <ul>
                            <li>
                                <Link
                                    className={'all' === price ? 'text-bold' : ''}
                                    to={getFilterUrl({ price: 'all' })}
                                >Any</Link>
                            </li>
                            {prices.map((p) => (
                                <li key={p.value}>
                                    <Link
                                        to={getFilterUrl({ price: p.value })}
                                        className={p.value === price ? 'text-bold' : ''}
                                    >{p.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3>Ratings</h3>
                        <ul>
                            {ratings.map((r) => (
                                <li key={r.value}>
                                    <Link
                                        to={getFilterUrl({ rating: r.rating })}
                                        className={`${r.rating}` === `${rating}` ? 'text-bold' : ''}
                                    >
                                        <Rating caption={' & up'} rating={r.rating}></Rating>
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <Link
                                    to={getFilterUrl({ rating: 'all' })}
                                    className={'all' === rating ? 'text-bold' : ''}
                                >
                                    <Rating caption={' & up'} rating={0}></Rating>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </Col>
                <Col md={9}>
                    {loading ? (
                        <LoadingBox></LoadingBox>
                    ) : error ? (
                        <MessageBox variant="danger">{error}</MessageBox>
                    ) : (
                        <>
                            <Row className="justify-content-between mb-3">
                                <Col md={6}>
                                    <div>
                                        {countProducts === 0 ? 'No' : countProducts} Results
                                        {query !== 'all' && ' : ' + query}
                                        {category !== 'all' && ' : ' + category}
                                        {price !== 'all' && ' : Price ' + price}
                                        {rating !== 'all' && ' : Rating ' + rating + ' & up'}
                                        {query !== 'all' ||
                                            category !== 'all' ||
                                            price !== 'all' ||
                                            rating !== 'all' ? (
                                            <Button
                                                variant="light"
                                                onClick={() => { navigate('/search'); }}
                                            >
                                                <i className="fas fa-times-circle"></i>
                                            </Button>
                                        ) : null}
                                    </div>
                                </Col>
                                <Col className="text-end">
                                    Sort by{' '}
                                    <select
                                        value={order}
                                        onChange={(e) => {
                                            navigate(getFilterUrl({ order: e.target.value }));
                                        }}
                                    >
                                        <option value="newest">Newest Arrivals</option>
                                        <option value="lowest">Price: Low to High</option>
                                        <option value="highest">Price: High to Low</option>
                                        <option value="toprated">Customer Reviews</option>
                                    </select>
                                </Col>
                            </Row>
                            {products.length === 0 && (
                                <MessageBox>No Product Found</MessageBox>
                            )};
                            <Row>
                                {products.map((product) => (
                                    <Col sm={6} lg={4} className="mb-3" key={product._id}>
                                        <Product product={product}></Product>
                                    </Col>
                                ))}
                            </Row>

                            <div>
                                {[...Array(pages).keys()].map((x) => (
                                    <LinkContainer
                                        key={x + 1}
                                        className="mx-1"
                                        to={getFilterUrl({ page: x + 1 })}
                                    >
                                        <Button
                                            className={Number(page) === x + 1 ? 'btn-dark' : 'btn-light'}
                                        >{x + 1}</Button>
                                    </LinkContainer>
                                ))}
                            </div>
                        </>
                    )}
                </Col>
            </Row>
        </div>
    )
}
