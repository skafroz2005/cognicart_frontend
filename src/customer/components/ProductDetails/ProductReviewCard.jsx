import React from 'react';
import { Avatar, Box, Rating } from '@mui/material';

const ProductReviewCard = ({ item, ratings }) => {
    
    // 1. Search the ratings array to find the rating submitted by the exact same user
    const matchingRating = ratings?.find((r) => r.user?.id === item.user?.id);
    const actualStars = matchingRating ? matchingRating.rating : 0;

    // 2. BULLETPROOF USERNAME: Safely grab the first name, or default to "User" if missing
    const userName = item?.user?.firstName || "User";
    
    // 3. Safely grab the first letter for the Avatar
    const initial = userName.charAt(0).toUpperCase();

    return (
        <div>
            <div className='mui-grid-container-div mui-spacing-2' style={{ gap: '24px' }}>
                
                <div className='mui-grid-item-div mui-col-xs-1'>
                    <Box>
                        <Avatar 
                            className='text-white' 
                            sx={{ width: 56, height: 56, bgcolor: "#9155fd" }}
                        >
                            {/* Insert the safe initial! */}
                            {initial}
                        </Avatar>
                    </Box>
                </div>

                <div className='mui-grid-item-div mui-col-xs-9'>
                    <div className='space-y-2'>
                        <div>
                            {/* Insert the safe username! */}
                            <p className='font-semibold text-lg'>{userName}</p>
                            <p className='opacity-70'>
                                {new Date(item?.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                    
                    <Rating value={actualStars} name='half-rating' readOnly precision={0.5} /> 
                    
                    <p className='mt-2'>
                        {item?.review}
                    </p>
                </div>

            </div>
        </div>
    );
};

export default ProductReviewCard;