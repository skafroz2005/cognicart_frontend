import React from 'react';
import AddressCard from '../AddressCard/AddressCard';
import OrderTracker from './OrderTracker';
import { Box, Grid } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const OrderDetails = () => {
    return (
        <div className='px-5 lg:px-20 text-left'>
            
            {/* Delivery Address Section */}
            <div>
                <h1 className='font-bold text-xl py-7'>Delivery Address</h1>
                <AddressCard />
            </div>

            {/* Order Tracking Section */}
            <div className='py-20'>
                <OrderTracker activeStep={3} />
            </div>

            {/* Ordered Items List */}
            <Grid className='space-y-5' container>
                {[1, 1, 1, 1, 1].map((item, index) => (
                    <Grid 
                        key={index}
                        item 
                        container 
                        className='shadow-xl rounded-md p-5 border w-full' 
                        sx={{ alignItems: "center", justifyContent: "space-between" }}
                    >
                        <Grid item xs={6}>
                            <div className='flex items-center space-x-4'>
                                <img 
                                    className='w-[5rem] h-[5rem] object-cover object-top' 
                                    src="https://rukminim1.flixcart.com/image/612/612/l5h2xe80/kurta/x/6/n/m-kast-tile-green-majestic-man-original-imagg4z33hu4kzpv.jpeg?q=70" 
                                    alt="" 
                                />
                                <div className='space-y-2 ml-5'>
                                    <p className='font-semibold'>Men Printed Cotton Blend Straight Kurta</p>
                                    <p className='space-x-5 opacity-50 text-xs font-semibold'>
                                        <span>Color: pink</span> 
                                        <span>Size: M</span>
                                    </p>
                                    <p>Seller: linaria</p>
                                    <p>₹1099</p>
                                </div>
                            </div>
                        </Grid>

                        <Grid item>
                            <Box sx={{ color: "RGB(145 85 253)" }}>
                                <StarBorderIcon sx={{ fontSize: "2rem" }} className='px-2 text-5xl' />
                                <span>Rate & Review Product</span>
                            </Box>
                        </Grid>
                    </Grid>
                ))}
            </Grid>
            
        </div>
    );
};

export default OrderDetails;