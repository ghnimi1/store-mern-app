import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllOrders } from '../redux/actions/orderActions/fetchAllOrders'
import { removeOrder } from '../redux/actions/orderActions/deleteOrder'

const OrdersListPage = ({ history }) => {
    const dispatch = useDispatch()
    const { currentUser } = useSelector(state => state.users)
    const { orders } = useSelector(state => state.orders)
    useEffect(() => {
        if (currentUser && currentUser.isAdmin) {
            dispatch(fetchAllOrders())
        } else {
            history.push('/login')
        }
    }, [dispatch, history, currentUser])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure')) {
            dispatch(removeOrder(id))
        }
    }

    return (
        <>
            <h1>Orders</h1>
            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>USER</th>
                        <th>DATE</th>
                        <th>TOTAL</th>
                        <th>PAID</th>
                        <th>DELIVERED</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {orders?.map((order) => (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.user && order.user.name}</td>
                            <td>{order.createdAt}</td>
                            <td>${order.totalPrice}</td>
                            <td>
                                {order.isPaid ? (
                                    order.paidAt
                                ) : (
                                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                                )}
                            </td>
                            <td>
                                {order.isDelivered ? (
                                    order.deliveredAt
                                ) : (
                                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                                )}
                            </td>
                            <td>
                                <NavLink to={`/order/${order._id}`}>
                                    <Button variant='light' className='btn-sm'>
                                        Details
                                    </Button>
                                </NavLink>
                                <Button
                                    variant='danger'
                                    className='btn-sm'
                                    onClick={() => deleteHandler(order._id)}
                                >
                                    <i className='fas fa-trash'></i>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}

export default OrdersListPage