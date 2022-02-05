import React, { useEffect, useState } from 'react';
import { Row, Col, Image, Button, Card, Form, FloatingLabel, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSingleProduct } from '../redux/actions/productActions/fetchSingleProduct';
import { addReviews } from '../redux/actions/productActions/addReviews';
import { addToCart } from '../redux/actions/cartActions/AddToCart';

function ProductDetails({ match, history }) {
    const token = localStorage.getItem("token")
    const [comment, setComment] = useState('')
    const [rating, setRating] = useState(0)
    const [quantity, setQuantity] = useState(1)
    const id = match.params.id
    const { product, error } = useSelector(state => state.products)
    const dispatch = useDispatch()

    const addComm = () => {
        dispatch(addReviews(id, { rating, comment }))
    }

    const addToCartt = () => {
        dispatch(addToCart(id, quantity))
        history.push(`/cart`)

    }

    useEffect(() => {
        dispatch(fetchSingleProduct(id))
    }, [dispatch, product, id])
    return (
        <div>
            <Link className='btn btn-light my-3' to='/'>
                Go Back
            </Link>
            <Row>
                <Col md={6}>
                    <Image src={`http://localhost:5000/${product?.image}`} alt={product?.name} fluid />
                </Col>
                <Col md={3}>
                    <h4> {product?.name} </h4>
                    <p>{product?.numReviews} reviews</p>
                    <p> {product?.description} </p>
                    <p> Price: {product?.price} $ </p>
                </Col>
                <Col md={3}>
                    <Card className='p-2'>
                        <h3
                            style={{ textAlign: 'center', fontWeight: '700', color: 'red' }}>
                            {product?.brand}
                        </h3>
                        <p> Price: {product?.price} $ </p>
                        <hr></hr>
                        <span>
                            <h6>Choose Qty</h6>
                            <Form.Select
                                className="me-sm-2" id="inlineFormCustomSelect"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                            >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </Form.Select></span>
                        <hr></hr>
                        <Button
                            variant="secondary"
                            onClick={addToCartt}>
                            ADD TO CART
                        </Button>
                    </Card>
                </Col>
            </Row>
            <Row className='mt-5'>
                <Col md={8}>
                    <h3>REVIEWS({product?.numReviews})</h3>
                    {product?.reviews?.map(review => (
                        <Card key={review._id} className='m-2 p-2'>
                            <h6>{review.name}</h6>
                            <p>{review.rating}</p>
                            <p>{review.comment}</p>
                        </Card>
                    ))}
                    {token && (<>
                        <hr></hr>
                        {
                            error && (
                                <Alert variant='danger'>{error}</Alert>
                            )
                        }
                        <h2>Add reviews</h2>
                        <FloatingLabel controlId="floatingTextarea2" label="Comments" className="mb-3">
                            <Form.Control
                                as="textarea"
                                placeholder="Leave a comment here"
                                style={{ height: '100px' }}
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                        </FloatingLabel>
                        <h5>Rating</h5>
                        <Form.Select className="me-sm-2 mb-2"
                            id="inlineFormCustomSelect"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                        >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </Form.Select>
                        <Button variant="secondary"
                            onClick={() => addComm()}
                        >ADD COMMENT</Button>
                    </>)}
                </Col>
            </Row>
        </div>
    );
}

export default ProductDetails;