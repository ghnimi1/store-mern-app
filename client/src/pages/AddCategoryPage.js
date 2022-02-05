import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Container, Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addCategory } from '../redux/actions/categoryActions/createCategory'

const AddCategoryPage = ({ match, history }) => {

    const [categoryName, setCategoryName] = useState('')

    const dispatch = useDispatch()
    const { category } = useSelector(state => state.category)
    console.log(category);
    const submitHandler = (e) => {
        e.preventDefault()

        dispatch(addCategory({ categoryName }))
        history.push('/admin/categorylist')
    }

    return (
        <>
            <Link to='/admin/categorylist' className='btn btn-light my-3'>
                Go Back
            </Link>
            <Container>
                <Row className='justify-content-md-center'>
                    <Col xs={12} md={6}>
                        <h1>Create Category</h1>
                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId='name'>
                                <Form.Label>Category Name</Form.Label>
                                <Form.Control
                                    type='name'
                                    placeholder='Enter category name'
                                    value={categoryName}
                                    onChange={(e) => setCategoryName(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Button type='submit' variant='primary'>
                                Create
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container >
        </>
    )
}

export default AddCategoryPage