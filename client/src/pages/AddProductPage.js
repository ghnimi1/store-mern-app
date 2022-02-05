import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Container, Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addProduct } from '../redux/actions/productActions/createProduct'
import { fetchAllCategory } from '../redux/actions/categoryActions/fetchAllCategory'


const AddProductPage = ({ match, history }) => {

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const dispatch = useDispatch()
    const { products } = useSelector(state => state.products)
    const categoryList = useSelector(state => state.category.category)

    useEffect(() => {
        dispatch(fetchAllCategory())
    }, [dispatch, products])

    const submitHandler = (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", price);
        formData.append("image", image);
        formData.append("brand", brand);
        formData.append("countInStock", countInStock);
        formData.append("category", category);
        formData.append("description", description);
        dispatch(addProduct(formData))
        history.push('/admin/productlist')
    }

    return (
        <>
            <Link to='/admin/productlist' className='btn btn-light my-3'>
                Go Back
            </Link>
            <Container>
                <Row className='justify-content-md-center'>
                    <Col xs={12} md={6}>
                        <h1>Create Product</h1>
                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId='name'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type='name'
                                    placeholder='Enter name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                ></Form.Control>
                            </Form.Group>

                            <Form.Group controlId='price'>
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                    type='number'
                                    placeholder='Enter price'
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                ></Form.Control>
                            </Form.Group>

                            <Form.Group controlId='image'>
                                <Form.Label>Image</Form.Label>
                                <Form.Control
                                    type='file'
                                    placeholder='Enter image url'
                                    value={FormData.image}
                                    onChange={(e) => setImage(e.target.files[0])}
                                ></Form.Control>
                            </Form.Group>

                            <Form.Group controlId='brand'>
                                <Form.Label>Brand</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter brand'
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                ></Form.Control>
                            </Form.Group>

                            <Form.Group controlId='countInStock'>
                                <Form.Label>Count In Stock</Form.Label>
                                <Form.Control
                                    type='number'
                                    placeholder='Enter countInStock'
                                    value={countInStock}
                                    onChange={(e) => setCountInStock(e.target.value)}
                                ></Form.Control>
                            </Form.Group>

                            <Form.Group controlId='category'>
                                <Form.Label>Category</Form.Label>
                                <Form.Select className="me-sm-2 mb-2"
                                    id="inlineFormCustomSelect"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                    {
                                        categoryList?.map(categ => (
                                            <option value={categ.categoryName}>{categ.categoryName}</option>
                                        ))
                                    }

                                </Form.Select>
                            </Form.Group>

                            <Form.Group controlId='description'>
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter description'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
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

export default AddProductPage