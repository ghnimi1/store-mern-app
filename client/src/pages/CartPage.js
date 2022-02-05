import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { removeFromCart } from '../redux/actions/cartActions/deleteFromCart';

function CartPage({ history }) {

    const dispatch = useDispatch()

    const { cartItems } = useSelector((state) => state.cart)
    const checkout = () => {
        history.push('/shipping')
    }
    return (
        <div>
            <Link className='btn btn-light my-3' to='/'>
                Go Back
            </Link>
            <h1>SHOPPING CART</h1>
            {cartItems.length === 0 ? (
                <h4 style={{ textAlign: 'center' }}>
                    Your cart is empty
                </h4>
            ) : (
                cartItems?.map(item => (
                    <Row key={item._id}>
                        <Col md={2}>
                            <Image src={`https://storemernapp.herokuapp.com/${item?.image}`} alt={item?.image} fluid />
                        </Col>
                        <Col md={2}>
                            {item?.name}
                        </Col>
                        <Col md={2}>
                            {item?.price} $
                        </Col>
                        <Col md={2}>
                            {item?.qty}
                        </Col>
                        <Col md={2}>
                            <Button type="button"
                                variant="light"
                                onClick={() => dispatch(removeFromCart(item?.product))}>
                                <i className="fas fa-trash"></i>
                            </Button>
                        </Col>
                    </Row>
                ))
            )}
            {cartItems.length !== 0 && < Row >
                <Col md={8}></Col>
                <Col md={4} className='mt-5'>
                    <Card className='p-3'>
                        <h3>SUBTOTAL ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) ITEMS</h3>
                        <p>{cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)} $</p>
                        <Button
                            variant="primary"
                            onClick={checkout}
                        >
                            CHECKOUT
                        </Button>
                    </Card>
                </Col>
            </Row>}

        </div >
    );
}

export default CartPage;