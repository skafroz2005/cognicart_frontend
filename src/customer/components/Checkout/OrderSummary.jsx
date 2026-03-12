

import React, { useEffect } from 'react';
import AddressCard from '../AddressCard/AddressCard';
import { Button, Divider } from '@mui/material';
import CartItem from '../Cart/CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getOrderById } from '../../../State/Order/Action';
import { createPayment } from '../../../State/Payment/Action';

const OrderSummary = () => {

    const dispatch = useDispatch();
    const location = useLocation();
    const {order} = useSelector(store => store)
    const searchParams =  new URLSearchParams(location.search);
    const orderId = searchParams.get("order_id");

    useEffect(() => {
        dispatch(getOrderById(orderId));
    }, [dispatch, orderId]);

    const handleCheckOut = (orderId) => {
        // Redirect to the payment page with the order ID as a query parameter
        dispatch(createPayment(orderId));
        // window.location.href = `/payment/success?order_id=${orderId}`;
    }

    return (
        <div>
            {/* Top Section: Delivery Address Card */}
            <div className='p-5 shadow-lg rounded-s-md border w-full text-left mx-0'>
                <AddressCard address={order.order?.shippingAddress} />
            </div>
            
            {/* Bottom Section: Cart Items and Price Breakdown */}
            <div>
                <div className='lg:grid grid-cols-3 relative pt-10'>
                    <div className='col-span-2'>
                        {order.order?.orderItems?.map((item, index) => <CartItem key={index} item={item} />)}
                    </div>
                    
                    <div className='px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0'>
                        <div className='border'>
                            <p className='uppercase font-bold opacity-60 pb-4 p-5'>Price details</p>
                            <Divider />
                            <div className='space-y-3 font-semibold mb-10 p-5'>
                                <div className='flex justify-between pt-3 text-black'>
                                    <span>Price</span>
                                    <span>₹{order.order?.totalPrice}</span>
                                </div>
                                <div className='flex justify-between pt-3'>
                                    <span>Discount</span>
                                    <span className='text-green-600'>₹{order.order?.discount}</span>
                                </div>
                                <div className='flex justify-between pt-3'>
                                    <span>Delivery Charge</span>
                                    <span className='text-green-600'>Free</span>
                                </div>
                                <Divider />
                                <div className='flex justify-between font-bold text-lg pt-3'>
                                    <span>Total Amount</span>
                                    <span className='text-green-600'>₹{order.order?.totalDiscountedPrice}</span>
                                </div>
                            </div>
                            
                            <div className='p-5'>
                                <Button onClick={() => handleCheckOut(orderId)}
                                variant="contained" className='w-full' sx={{ px: "2rem", py: "1rem", bgcolor: "#9155fd" }}>
                                    Payment
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderSummary;