import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePayment } from '../../../State/Payment/Action';
import { Alert, AlertTitle, Grid } from '@mui/material';
import OrderTracker from '../Order/OrderTracker';
import AddressCard from '../AddressCard/AddressCard';
import { useParams, useSearchParams } from 'react-router-dom';
import { getOrderById } from '../../../State/Order/Action';

const PaymentSuccess = () => {
    const [paymentId, setPaymentId] = useState("");
    const [paymentStatus, setPaymentStatus] = useState("");
    const [referenceId, setReferenceId] = useState("");
    const { orderId } = useParams(); 
    const dispatch = useDispatch();
    const { order } = useSelector(store => store);

    useEffect(() => {

        const urlParam = new URLSearchParams(window.location.search);
        setPaymentId(urlParam.get("razorpay_payment_id") || "");
        setPaymentStatus(urlParam.get("razorpay_payment_link_status") || "");
        //setReferenceId(urlParam.get("razorpay_payment_link_reference_id") || "");
    }, []);

    useEffect(() => {
        if(paymentId){
            const data ={orderId,paymentId};
            dispatch(getOrderById(orderId))
            dispatch(updatePayment(data));
        }
    }, [dispatch, orderId, paymentId]);
    
    // // We use useSearchParams to grab the parameters Razorpay attaches to the URL
    // const [searchParams] = useSearchParams();
    // const order_id = searchParams.get("order_id");
    // const razorpay_payment_id = searchParams.get("razorpay_payment_id");
    // const razorpay_payment_link_status = searchParams.get("razorpay_payment_link_status");

    // // Fallback if the route is defined as /payment/:orderId instead of query params
    // const { orderId } = useParams(); 
    
    // const dispatch = useDispatch();
    // const { order } = useSelector(store => store);

    // useEffect(() => {
    //     // Determine the correct order ID from either path or query params
    //     const activeOrderId = order_id || orderId; 

    //     if (activeOrderId && razorpay_payment_id) {
    //         setPaymentId(razorpay_payment_id);
    //         setPaymentStatus(razorpay_payment_link_status);

    //         const data = { orderId: activeOrderId, paymentId: razorpay_payment_id };
            
    //         // Fetch the order to display product details on this page
    //         dispatch(getOrderById(activeOrderId));
            
    //         // Hit your Spring Boot /api/payments endpoint to update the database
    //         dispatch(updatePayment(data));
    //     }
    // }, [orderId, razorpay_payment_id, order_id, dispatch]);







    // const [searchParams] = useSearchParams();
    // const order_id = searchParams.get("order_id");
    // const razorpay_payment_id = searchParams.get("razorpay_payment_id");
    // const razorpay_payment_link_status = searchParams.get("razorpay_payment_link_status");

    // const { orderId } = useParams(); 
    // const dispatch = useDispatch();
    // const { order } = useSelector(store => store);

    // useEffect(() => {
    //     const activeOrderId = order_id || orderId; 

    //     if (activeOrderId && razorpay_payment_id) {
    //         const data = { orderId: activeOrderId, paymentId: razorpay_payment_id };
    //         dispatch(getOrderById(activeOrderId));
    //         dispatch(updatePayment(data));
    //     }
    // // Added razorpay_payment_link_status to clear the exhaustive-deps warning
    // }, [orderId, razorpay_payment_id, order_id, razorpay_payment_link_status, dispatch]);

    // ... Keep your existing return() code here ...


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

            {/* Display the visual order tracking step (Static at step 1 for now) */}
            <OrderTracker activeStep={1}/>

            {/* Display the purchased items and delivery address */}
            <Grid container className='space-y-5 py-5 pt-20'>
                {order.order?.orderItems.map((item) => (
                    <Grid container item className='shadow-xl rounded-md p-5' sx={{ alignItems: "center", justifyContent: "space-between" }} key={item.id}>
                        <Grid item xs={6}>
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
                        </Grid>
                        
                        <Grid item>
                            <AddressCard address={order.order?.shippingAddress} />
                        </Grid>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default PaymentSuccess;