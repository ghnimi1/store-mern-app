import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTopProducts } from '../redux/actions/productActions/fetchTopProducts'

const TopProductCarousel = () => {
    const dispatch = useDispatch()
    const { topProducts } = useSelector((state) => state.products)
    useEffect(() => {
        dispatch(fetchTopProducts())
    }, [dispatch])

    return (
        <Carousel pause='hover' className='bg-dark'>
            {topProducts?.map((product) => (
                <Carousel.Item key={product._id}>
                    <Link to={`/product/${product._id}`}>
                        <Image fluid style={{ height: '400px', width: '100%' }}
                            src={`https://storemernapp.herokuapp.com/${product.image}`} alt={product.name} fluid />
                        <Carousel.Caption className='carousel-caption'>
                            <h2>
                                {product.name} (${product.price})
                            </h2>
                        </Carousel.Caption>
                    </Link>
                </Carousel.Item>
            ))}
        </Carousel>
    )
}

export default TopProductCarousel