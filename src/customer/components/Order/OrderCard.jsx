import { Grid } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdjustIcon from '@mui/icons-material/Adjust';

const OrderCard = ({ order }) => {
    const navigate = useNavigate();

    // Grab the first item in the order to use as the display picture/title
    const firstItem = order?.orderItems?.[0];
    
    // Calculate if there are other items hidden in this order
    const extraItemsCount = (order?.orderItems?.length || 1) - 1;

    return (
        <div 
            onClick={() => navigate(`/account/order/${order?.id}`)} 
            className='p-5 shadow-md shadow-black hover:shadow-2xl border cursor-pointer'
        >
            <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>
                
                <Grid item xs={6}>
                    <div className='flex cursor-pointer'>
                        <img 
                            className='w-[5rem] h-[5rem] object-cover object-top' 
                            src={firstItem?.product?.imageUrl} 
                            alt={firstItem?.product?.title} 
                        />
                        <div className='ml-5 space-y-2'>
                            <p className='font-semibold'>{firstItem?.product?.title}</p>
                            
                            {/* If they bought more than 1 item, show a helpful tag! */}
                            {extraItemsCount > 0 && (
                                <p className='text-sm text-indigo-600 font-semibold'>
                                    + {extraItemsCount} more item{extraItemsCount > 1 ? 's' : ''}
                                </p>
                            )}
                            
                            <p className='opacity-50 text-xs font-semibold'>Size: {firstItem?.size}</p>
                        </div>
                    </div>
                </Grid>

                <Grid item xs={2}>
                    {/* Show the TOTAL price of the order, not just the single item's price */}
                    <p className='font-semibold'>₹{order?.totalDiscountedPrice}</p>
                </Grid>

                <Grid item xs={4}>
                    {true && (
                        <div>
                            <p>
                                <AdjustIcon sx={{ width: "15px", height: "15px" }} className='text-green-600 mr-2 text-sm' />
                                <span>
                                    {order?.orderStatus === "DELIVERED" ? "Delivered On Mar 03" : "Expected Delivery On Mar 03"}
                                </span>
                            </p>
                            <p className='text-xs'>
                                {order?.orderStatus === "DELIVERED" ? "Your Order Has Been Delivered" : `Status: ${order?.orderStatus}`}
                            </p>
                        </div>
                    )}
                </Grid>

            </Grid>
        </div>
    );
};

export default OrderCard;