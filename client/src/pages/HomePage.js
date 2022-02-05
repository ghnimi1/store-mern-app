import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProducts } from '../redux/actions/productActions/fetchAllProducts';
import Paginate from '../components/Paginate'
import Product from '../components/Product'
import { Col, Container, Form, Row } from 'react-bootstrap';
import TopProductCarousel from '../components/TopProductCarousel';
import { fetchAllCategory } from '../redux/actions/categoryActions/fetchAllCategory';

function HomePage({ match }) {
    const keyword = match.params.keyword
    const pageNumber = match.params.pageNumber || 1
    const { products, page, pages } = useSelector(state => state.products.products)
    const categoryList = useSelector(state => state.category.category)
    const [categoryName, setCategoryName] = useState('All')
    const filterProduct = products?.filter(produit => produit.category === categoryName)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchAllProducts(keyword, pageNumber))
        dispatch(fetchAllCategory())
    }, [dispatch, keyword, pageNumber, categoryList])
    return (
        <>
            <TopProductCarousel />
            <Row>
                <Col sm={12} md={6} lg={4} xl={4}><h1>Latest Products</h1></Col>
                <Col sm={12} md={6} lg={4} xl={4}></Col>
                <Col sm={12} md={6} lg={4} xl={4}>
                    <Form>
                        <Form.Group controlId='category'>
                            <Form.Label>Filter By Category</Form.Label>
                            <Form.Select className="me-sm-2 mb-2"
                                id="inlineFormCustomSelect"
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                            >
                                <option value='All'>All</option>
                                {
                                    categoryList?.map(categ => (
                                        <option value={categ.categoryName}>{categ.categoryName}</option>
                                    ))
                                }

                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
            <Row>
                {categoryName !== 'All' ? filterProduct?.map((product) => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product} />
                    </Col>
                )) : products?.map((product) => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product} />
                    </Col>
                ))}
            </Row>
            <Paginate
                pages={pages}
                page={page}
                keyword={keyword ? keyword : ''}
            />
        </>
    );
}
export default HomePage;