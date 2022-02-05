import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
//import Rating from './Rating'

const Product = ({ product }) => {
    return (
        <Card className='my-3 p-3 rounded'>
            <Link to={`/product/${product._id}`}>
                <Card.Img style={{ height: '150px' }}
                    src={`https://storemernapp.herokuapp.com/${product.image}`} variant='top' />
            </Link>

            <Card.Body>
                <Card.Title as='div'>
                    <strong>{product.name}</strong>
                </Card.Title>
                <Card.Text as='h3'>${product.price}</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Product