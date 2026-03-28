import React, { useEffect } from 'react';
import AddressCard from '../AddressCard/AddressCard';
import OrderTracker from './OrderTracker';
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

    const formatCurrency = (value) => `₹${Number(value || 0).toLocaleString('en-IN')}`;
    const orderDateText = order.order?.createdAt
        ? new Date(order.order.createdAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        })
        : '';

    return (
        <div className='mx-auto w-full max-w-6xl px-4 lg:px-6 pt-8'>
            <div className='mb-6 flex items-start justify-between gap-4'>
                <div>
                    <h1 className='text-3xl font-bold text-gray-900'>Order Details</h1>
                    <p className='mt-1 text-sm text-gray-500'>
                        {order.order?.id ? `Order #${order.order.id}` : 'Order'}
                        {orderDateText ? ` • ${orderDateText}` : ''}
                    </p>
                </div>
                <button
                    type='button'
                    onClick={() => navigate('/account/order')}
                    className='text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors'
                >
                    ← Back to Orders
                </button>
            </div>

            {/* --- SECTION 1: Order Tracker --- */}
            <div className='mb-6'>
                {/* Dynamically pass the active step based on the database status */}
                <OrderTracker activeStep={getOrderStatusStep(order.order?.orderStatus)} />
            </div>

            {/* --- SECTION 2: Delivery Address --- */}
            <div className='mb-6'>
                {/* Dynamically pass the shipping address to your existing AddressCard */}
                <AddressCard address={order.order?.shippingAddress} />
            </div>

            {/* --- SECTION 3: Ordered Items Grid --- */}
            <div className='space-y-4 pb-8'>
                {/* Loop through every item inside this specific order */}
                {order.order?.orderItems?.map((item) => (
                    <div key={item.id} className='rounded-2xl border border-gray-200 bg-white p-4 md:p-5 shadow-sm hover:shadow-lg transition-all duration-300'>
                        <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
                            <div className='flex min-w-0 flex-1 items-start gap-4'>
                                <div className='h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-gray-50'>
                                    <img
                                        className='h-full w-full object-cover object-top'
                                        src={item.product?.imageUrl}
                                        alt={item.product?.title}
                                    />
                                </div>

                                <div className='min-w-0 flex-1 space-y-2'>
                                    <p className='truncate text-base md:text-lg font-semibold text-gray-900'>{item.product?.title}</p>

                                    <div className='flex flex-wrap items-center gap-2 text-xs'>
                                        {item.product?.color && (
                                            <span className='rounded-md bg-gray-100 px-2 py-1 font-medium text-gray-600'>
                                                Color: {item.product?.color}
                                            </span>
                                        )}
                                        {item.size && (
                                            <span className='rounded-md bg-gray-100 px-2 py-1 font-medium text-gray-600'>
                                                Size: {item.size}
                                            </span>
                                        )}
                                        <span className='rounded-md bg-gray-100 px-2 py-1 font-medium text-gray-600'>
                                            Qty: {item?.quantity}
                                        </span>
                                    </div>

                                    <p className='text-sm text-gray-500'>Seller: {item.product?.brand}</p>
                                    <p className='text-xs font-medium text-gray-500'>Unit Price: {formatCurrency((item?.discountedPrice || 0) / (item?.quantity || 1))}</p>
                                </div>
                            </div>

                            <div className='flex flex-row items-center justify-between gap-3 md:flex-col md:items-end md:justify-center'>
                                <div className='text-left md:text-right'>
                                    <p className='text-xs font-medium uppercase tracking-wide text-gray-500'>Total Price</p>
                                    <p className='text-2xl font-bold text-gray-900'>{formatCurrency(item.discountedPrice)}</p>
                                </div>

                                {order.order?.orderStatus === "DELIVERED" && (
                                    <button
                                        type='button'
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            navigate(`/account/rate/${item.product.id}`);
                                        }}
                                        className='inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all duration-200'
                                    >
                                        <StarBorderIcon sx={{ fontSize: '1rem' }} />
                                        Rate & Review
                                    </button>
                                )}
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderDetails;