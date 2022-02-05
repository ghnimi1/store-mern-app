import React, { useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllCategory } from '../redux/actions/categoryActions/fetchAllCategory'
import { removeCategory } from '../redux/actions/categoryActions/deleteCategory'

const CategoryListPage = ({ history, match }) => {

    const dispatch = useDispatch()

    const { category } = useSelector(state => state.category)
    const { currentUser } = useSelector(state => state.users)

    useEffect(() => {
        if (!currentUser || !currentUser.isAdmin) {
            history.push('/login')
        }
        dispatch(fetchAllCategory())
    }, [dispatch, history, currentUser, category])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure')) {
            dispatch(removeCategory(id))
        }
    }

    return (
        <>
            <Row className='align-items-center'>
                <Col>
                    <h1>Category</h1>
                </Col>
                <Col className='text-right'>
                    <Link to='/admin/categorylist/addCategory'
                        style={{ textDecoration: 'none' }}>
                        <Button className='my-3'>
                            <i className='fas fa-plus'></i> Create Category
                        </Button>
                    </Link>
                </Col>
            </Row>
            <>
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>CATEGORY NAME</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {category?.map((categ) => (
                            <tr key={categ._id}>
                                <td>{categ._id}</td>
                                <td>{categ.categoryName}</td>
                                <td>
                                    <NavLink to={`/admin/category/${categ._id}/edit`}>
                                        <Button variant='light' className='btn-sm'>
                                            <i className='fas fa-edit'></i>
                                        </Button>
                                    </NavLink>
                                    <Button
                                        variant='danger'
                                        className='btn-sm'
                                        onClick={() => deleteHandler(categ?._id)}
                                    >
                                        <i className='fas fa-trash'></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </>
        </>
    )
}

export default CategoryListPage