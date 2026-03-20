import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePayment } from '../../../State/Payment/Action';
import { Alert, AlertTitle } from '@mui/material';
import OrderTracker from '../Order/OrderTracker';
import AddressCard from '../AddressCard/AddressCard';
import { useLocation } from 'react-router-dom'; // Changed to useLocation
import { getOrderById } from '../../../State/Order/Action';

const PaymentSuccess = () => {
    const [paymentId, setPaymentId] = useState("");
    const [paymentStatus, setPaymentStatus] = useState("");
    // 1. Remove useParams. We will use state for orderId instead.
    const [orderId, setOrderId] = useState(""); 
    
    const dispatch = useDispatch();
    const { order } = useSelector(store => store);
    const location = useLocation();

    // 2. Extract ALL parameters from the query string
    useEffect(() => {
        const urlParam = new URLSearchParams(location.search);
        
        const extractedOrderId = urlParam.get("order_id") || "";
        const extractedPaymentId = urlParam.get("razorpay_payment_id") || "";
        
        setOrderId(extractedOrderId);
        setPaymentId(extractedPaymentId);
        setPaymentStatus(urlParam.get("razorpay_payment_link_status") || "");
        
    }, [location.search]);

    // 3. Dispatch actions only when we have the IDs
    useEffect(() => {
        if (paymentId && orderId) {
            const data = { orderId, paymentId };
            dispatch(getOrderById(orderId));
            dispatch(updatePayment(data));
        }
    }, [dispatch, orderId, paymentId]);
    
    return (
        <div className='px-2 lg:px-36'>
            <div className='flex flex-col justify-center items-center'>
                <Alert
                    variant='filled'
                    severity='success'
                    sx={{ mb: 6, width: "fit-content" }}
                >
                    <AlertTitle>Payment Success</AlertTitle>
                    Congratulations! Your order has been successfully placed.
                </Alert>
            </div>

            {/* ... Your OrderTracker stays here ... */}
            <OrderTracker activeStep={1}/>

            {/* ADD THIS CONDITIONAL CHECK: Only draw the Grid if order.order actually exists! */}
            {order.order && (
                <div className='space-y-5 py-5 pt-20'>
                    {order.order.orderItems.map((item) => (
                        <div className='mui-grid-container-div mui-grid-item-div shadow-xl rounded-md p-5' style={{ alignItems: "center", justifyContent: "space-between" }} key={item.id}>
                            <div className='mui-grid-item-div mui-col-xs-6'>
                                <div className='flex items-center'>
                                    <img className='w-[5rem] h-[5rem] object-cover object-top' src={item.product?.imageUrl} alt={item.product?.title} />
                                    <div className='ml-5 space-y-2'>
                                        <p className='font-semibold'>{item.product?.title}</p>
                                        <div className='opacity-50 text-xs font-semibold space-x-5'>
                                            <span>Size: {item.size}</span>
                                        </div>
                                        <p className='text-gray-500'>Seller: {item.product?.brand}</p>
                                        <p className='font-semibold'>₹ {item.discountedPrice}</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className='mui-grid-item-div'>
                                <AddressCard address={order.order.shippingAddress} />
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {/* END OF CONDITIONAL CHECK */}
            
        </div>
    );
};

export default PaymentSuccess;