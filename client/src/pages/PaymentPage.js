import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../redux/actions/cartActions/paymentMethod'

function PaymentPage({ history }) {
    const [payment, setPayment] = useState("PayPal")
    const dispatch = useDispatch()
    const paymentMeth = () => {
        dispatch(savePaymentMethod(payment))
        history.push("/addorder")
    }
    return (
        <div className="mb-3">
            <Form.Check
                type="radio"
                label="PayPal"
                checked
                value={payment}
                onChange={(e) => setPayment(e.target.value)}
            />
            <Button
                onClick={() => paymentMeth()}
                variant="dark" type="submit">
                Continue
            </Button>
        </div>
    );
}

export default PaymentPage;