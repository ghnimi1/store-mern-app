import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Container, Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { updateCategory } from '../redux/actions/categoryActions/updateCategory'


const EditCategoryPage = ({ match, history }) => {
    const categoryId = match.params.id
    const [categoryName, setCategoryName] = useState('')
    const dispatch = useDispatch()
    /* const { categ } = useSelector(state => state.category)
    console.log(categ); */
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateCategory(categoryId, { categoryName }))
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
                        <h1>Edit Category</h1>
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
                                Update
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container >
        </>
    )
}

export default EditCategoryPage