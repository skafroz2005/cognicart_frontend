import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdjustIcon from '@mui/icons-material/Adjust';

const OrderCard = ({ order }) => {
    const navigate = useNavigate();

    // Grab the first item in the order to use as the display picture/title
    const firstItem = order?.orderItems?.[0];
    
    // Calculate if there are other items hidden in this order
    const extraItemsCount = (order?.orderItems?.length || 1) - 1;

    const stages = ["PLACED", "CONFIRMED", "SHIPPED", "DELIVERED"];
    const activeStage = Math.max(stages.indexOf(order?.orderStatus) + 1, 1);

    const formatCurrency = (value) => `₹${Number(value || 0).toLocaleString('en-IN')}`;

    return (
        <div 
            onClick={() => navigate(`/account/order/${order?.id}`)} 
            className='group cursor-pointer rounded-2xl border border-gray-200 bg-white p-4 md:p-5 shadow-sm hover:shadow-lg transition-all duration-300'
        >
            <div className='mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
                <div className='flex min-w-0 flex-1 items-start gap-4'>
                    <div className='h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-gray-50'>
                        <img 
                            className='h-full w-full object-cover object-top' 
                            src={firstItem?.product?.imageUrl} 
                            alt={firstItem?.product?.title} 
                        />
                    </div>

                    <div className='min-w-0 flex-1 space-y-2'>
                        <p className='truncate text-base md:text-lg font-semibold text-gray-900'>
                            {firstItem?.product?.title}
                        </p>

                        <div className='flex flex-wrap items-center gap-2 text-xs'>
                            {firstItem?.size && (
                                <span className='rounded-md bg-gray-100 px-2 py-1 font-medium text-gray-600'>
                                    Size: {firstItem?.size}
                                </span>
                            )}
                            {firstItem?.product?.color && (
                                <span className='rounded-md bg-gray-100 px-2 py-1 font-medium text-gray-600'>
                                    {firstItem?.product?.color}
                                </span>
                            )}
                        </div>

                        <p className='text-sm text-gray-500'>Seller: {firstItem?.product?.brand}</p>

                        {extraItemsCount > 0 && (
                            <p className='text-sm font-semibold text-indigo-600'>
                                + {extraItemsCount} more item{extraItemsCount > 1 ? 's' : ''}
                            </p>
                        )}
                    </div>
                </div>

                <div className='flex flex-row items-center justify-between gap-3 md:flex-col md:items-end md:justify-center'>
                    <div className='text-left md:text-right'>
                        <p className='text-xs font-medium uppercase tracking-wide text-gray-500'>Total</p>
                        <p className='text-2xl font-bold text-gray-900'>{formatCurrency(order?.totalDiscountedPrice)}</p>
                    </div>

                    <span className='inline-flex items-center gap-1.5 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700'>
                        <AdjustIcon sx={{ width: 12, height: 12 }} />
                        {order?.orderStatus || 'PLACED'}
                    </span>
                </div>
            </div>

            <div className='rounded-xl border border-gray-100 bg-gray-50/70 p-3 md:p-4'>
                <div className='mb-2 flex items-center justify-between'>
                    <p className='text-xs font-semibold uppercase tracking-wide text-gray-500'>Delivery Progress</p>
                    <p className='text-xs text-gray-500'>
                        {order?.orderStatus === "DELIVERED" ? "Delivered" : "In Transit"}
                    </p>
                </div>

                <div className='grid grid-cols-4 gap-2'>
                    {stages.map((stage, index) => {
                        const stepNumber = index + 1;
                        const reached = activeStage >= stepNumber;

                        return (
                            <div key={stage} className='flex flex-col items-center'>
                                <div className='relative mb-1 h-2 w-full rounded-full bg-gray-200'>
                                    <div
                                        className={`h-2 rounded-full transition-all duration-500 ${reached ? 'bg-indigo-500' : 'bg-gray-200'}`}
                                        style={{ width: reached ? '100%' : '0%' }}
                                    />
                                </div>
                                <p className={`text-[11px] font-medium ${reached ? 'text-indigo-600' : 'text-gray-400'}`}>
                                    {stage.charAt(0) + stage.slice(1).toLowerCase()}
                                </p>
                            </div>
                        );
                    })}
                </div>

                <div className='mt-2 text-xs text-gray-500'>
                    {order?.orderStatus === "DELIVERED"
                        ? "Your order has been delivered successfully."
                        : `Current status: ${order?.orderStatus || 'PLACED'}`}
                </div>
            </div>
            
            <div className='mt-3 text-right'>
                <span className='text-xs font-medium text-indigo-600 group-hover:text-indigo-700 transition-colors'>
                    View Order Details
                </span>
            </div>
                        </div>
    );
};

export default OrderCard;