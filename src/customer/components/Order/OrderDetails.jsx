import React, { useEffect } from 'react';
import AddressCard from '../AddressCard/AddressCard';
import OrderTracker from './OrderTracker';
import { Box } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderById } from '../../../State/Order/Action';

const OrderDetails = () => {
    // 1. Grab the ID from the URL (e.g., /account/order/52)
    const { orderId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // 2. Access the global Redux store where the order data will be saved
    const { order } = useSelector(store => store);

    // 3. Fire the API call as soon as the page loads
    useEffect(() => {
        if (orderId) {
            dispatch(getOrderById(orderId));
        }
    }, [dispatch, orderId]);

    // Optional: A helper function to dynamically move the tracker bar
    const getOrderStatusStep = (status) => {
        switch (status) {
            case "PLACED": return 1;
            case "CONFIRMED": return 2;
            case "SHIPPED": return 3;
            case "DELIVERED": return 4;
            default: return 0; // PENDING
        }
    };

    return (
        <div className='px-5 lg:px-20 pt-10'>
            {/* --- SECTION 1: Delivery Address --- */}
            <div>
                <h1 className='font-bold text-xl py-7'>Delivery Address</h1>
                {/* Dynamically pass the shipping address to your existing AddressCard */}
                <AddressCard address={order.order?.shippingAddress} />
            </div>

            {/* --- SECTION 2: Order Tracker --- */}
            <div className='py-20'>
                {/* Dynamically pass the active step based on the database status */}
                <OrderTracker activeStep={getOrderStatusStep(order.order?.orderStatus)} />
            </div>

            {/* --- SECTION 3: Ordered Items Grid --- */}
            <div className='space-y-5'>
                {/* Loop through every item inside this specific order */}
                {order.order?.orderItems?.map((item) => (
                    <div
                        style={{ alignItems: "center", justifyContent: "space-between" }}
                        key={item.id}
                        className='mui-grid-container-div mui-grid-item-div shadow-xl rounded-md p-5 border'
                    >
                        {/* Item Details (Image, Title, Size, Price) */}
                        <div className='mui-grid-item-div mui-col-xs-6'>
                            <div className='flex items-center space-x-4'>
                                <img
                                    className='w-[5rem] h-[5rem] object-cover object-top'
                                    src={item.product?.imageUrl}
                                    alt={item.product?.title}
                                />
                                <div className='space-y-2 ml-5'>
                                    <p className='font-semibold'>{item.product?.title}</p>
                                    <p className='space-x-5 opacity-50 text-xs font-semibold'>
                                        <span>Color: {item.product?.color}</span>
                                        {item.size && (
                                            <span>Size: {item.size}</span>
                                        )}
                                    </p>
                                    <p>Seller: {item.product?.brand}</p>
                                    <p>Total Price: ₹{item.discountedPrice}</p>
                                    {/* --- ADD THESE TWO NEW LINES HERE --- */}
                                    <p className='opacity-50 text-xs font-semibold'>
                                        Quantity: {item?.quantity}
                                    </p>
                                    <p className='opacity-50 text-xs font-semibold'>
                                        Unit Price: ₹{item?.discountedPrice / item?.quantity}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Rate & Review Button */}
                        {/* ONLY SHOW THIS IF DELIVERED */}
                        {order.order?.orderStatus === "DELIVERED" && (
                            <div className='mui-grid-item-div'>
                                <Box
                                    onClick={() => navigate(`/account/rate/${item.product.id}`)}
                                    sx={{ color: deepPurple[500], cursor: "pointer" }}
                                    className="flex items-center"
                                >
                                    <StarBorderIcon sx={{ fontSize: "2rem" }} className='px-2' />
                                    <span>Rate & Review Product</span>
                                </Box>
                            </div>
                        )}

                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderDetails;