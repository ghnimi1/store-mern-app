import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../redux/actions/cartActions/shipping';

function ShippingPage({ history }) {
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [postalCode, setPostalCode] = useState("")
    const [country, setCountry] = useState("")
    const dispatch = useDispatch()

    const shippingHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, postalCode, country }))
        history.push("/payment")
    }

    return (
        <Form onSubmit={shippingHandler}>
            <h3>SHIPPING</h3>
            <Form.Floating className="m-3">
                <Form.Control
                    id="floatingInputCustom"
                    type="text"
                    placeholder="Enter Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
                <label htmlFor="floatingInputCustom">Enter Address</label>
            </Form.Floating>
            <Form.Floating className="m-3">
                <Form.Control
                    id="floatingPasswordCustom"
                    type="text"
                    placeholder="Enter City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <label htmlFor="floatingPasswordCustom">Enter City</label>
            </Form.Floating>
            <Form.Floating className="m-3">
                <Form.Control
                    id="floatingInputCustom"
                    type="text"
                    placeholder="Enter Postal Code"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                />
                <label htmlFor="floatingInputCustom">Enter Postal Code</label>
            </Form.Floating>
            <Form.Floating className="m-3">
                <Form.Control
                    id="floatingPasswordCustom"
                    type="text"
                    placeholder="Enter Country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                />
                <label htmlFor="floatingPasswordCustom">Enter Country</label>
            </Form.Floating>
            <Button className="m-3" variant="dark" type="submit">
                Continue
            </Button>
        </Form>
    );
}

export default ShippingPage;