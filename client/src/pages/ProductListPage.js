import React, { useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Paginate from '../components/Paginate'
import { removeProduct } from '../redux/actions/productActions/deleteProduct'
import { fetchAllProducts } from '../redux/actions/productActions/fetchAllProducts'

const ProductListPage = ({ history, match }) => {
    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()

    const { products, page, pages } = useSelector(state => state.products.products)
    const { currentUser } = useSelector(state => state.users)

    useEffect(() => {
        if (!currentUser || !currentUser.isAdmin) {
            history.push('/login')
        }
        dispatch(fetchAllProducts('', pageNumber))
    }, [dispatch, history, currentUser, pageNumber, products])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure')) {
            dispatch(removeProduct(id))
        }
    }

    return (
        <>
            <Row className='align-items-center'>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className='text-right'>
                    <Link to='/admin/productlist/addProduct'
                        style={{ textDecoration: 'none' }}>
                        <Button className='my-3'>
                            <i className='fas fa-plus'></i> Create Product
                        </Button>
                    </Link>
                </Col>
            </Row>
            <>
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>CATEGORY</th>
                            <th>BRAND</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products?.map((product) => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>${product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td>
                                    <NavLink to={`/admin/product/${product._id}/edit`}>
                                        <Button variant='light' className='btn-sm'>
                                            <i className='fas fa-edit'></i>
                                        </Button>
                                    </NavLink>
                                    <Button
                                        variant='danger'
                                        className='btn-sm'
                                        onClick={() => deleteHandler(product._id)}
                                    >
                                        <i className='fas fa-trash'></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Paginate pages={pages} page={page} isAdmin={true} />
            </>
        </>
    )
}

export default ProductListPage