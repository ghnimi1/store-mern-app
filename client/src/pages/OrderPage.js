import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { PayPalButton } from 'react-paypal-button-v2'
import { Row, Col, ListGroup, Image, Card, Button, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleOrder } from '../redux/actions/orderActions/fetchOrder';
import { updateOrderToDelivered } from '../redux/actions/orderActions/updateOrderToDelivered';
import axios from 'axios';
import { payOrder } from '../redux/actions/orderActions/payOrder';

function OrderPage({ match, history }) {
    const id = match.params?.id
    const [sdkReady, setSdkReady] = useState(false)

    const dispatch = useDispatch()
    const { currentUser } = useSelector(state => state.users)
    const { order } = useSelector(state => state.orders)

    useEffect(() => {
        const addPayPalScript = async () => {
            const { data: clientId } = await axios.get('/api/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }
        if (!order || order._id !== id) {
            dispatch(fetchSingleOrder(id))
        } else if (!order?.isPaid) {
            if (!window.paypal) {
                addPayPalScript()
            } else {
                setSdkReady(true)
            }
        }
    }, [dispatch, order, id])

    const successPaymentHandler = (paymentResult) => {
        console.log(paymentResult)
        dispatch(payOrder(id, paymentResult))
    }

    const deliverHandler = () => {
        dispatch(updateOrderToDelivered(order._id))
    }
    return (
        <>
            <h1>Order {order?._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            {/*  <p>
                                <strong>Name: </strong> {order.user?.name}
                            </p>
                            <p>
                                <strong>Email: </strong>{' '}
                                <a href={`mailto:${order?.user.email}`}>{order?.user.email}</a>
                            </p> */}
                            <p>
                                <strong>Address:</strong>
                                {order?.shippingAddress?.address}, {order?.shippingAddress?.city}{' '}
                                {order?.shippingAddress?.postalCode},{' '}
                                {order?.shippingAddress?.country}
                            </p>
                            {order?.isDelivered ? (
                                <Alert variant='success'>
                                    Delivered on {order?.deliveredAt}
                                </Alert>
                            ) : (
                                <Alert variant='danger'>Not Delivered</Alert>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {order?.paymentMethod}
                            </p>
                            {order?.isPaid ? (
                                <Alert variant='success'>Paid on {order?.paidAt}</Alert>
                            ) : (
                                <Alert variant='danger'>Not Paid</Alert>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {order?.orderItems?.length === 0 ? (
                                <Alert>Order is empty</Alert>
                            ) : (
                                <ListGroup variant='flush'>
                                    {order?.orderItems?.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        fluid
                                                        rounded
                                                    />
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} x ${item.price} = ${item.qty * item.price}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${order?.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${order?.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${order?.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${order?.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <PayPalButton
                                    amount={order?.totalPrice}
                                    onSuccess={successPaymentHandler}
                                />

                            </ListGroup.Item>

                            {currentUser &&
                                currentUser.isAdmin &&
                                order?.isPaid &&
                                !order?.isDelivered && (
                                    <ListGroup.Item>
                                        <Button
                                            type='button'
                                            className='btn btn-block'
                                            onClick={deliverHandler}
                                        >
                                            Mark As Delivered
                                        </Button>
                                    </ListGroup.Item>
                                )}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default OrderPage;