import { Button, Card, CardContent, Typography, styled } from '@mui/material';
import React from 'react';

// Styled component for the decorative background triangle
const TriangleImg = styled('img')({
    right: 0,
    bottom: 0,
    height: 170,
    position: 'absolute'
});

// Styled component for the trophy image in the corner
const TrophyImg = styled('img')({
    right: 36,
    bottom: 20,
    height: 98,
    position: 'absolute'
});

const Achievement = () => {
    return (
        <Card sx={{ position: "relative" }}>
            <CardContent>
                <Typography variant='h6' sx={{ letterSpacing: "0.25px" }}>
                    Shop With Zosh
                </Typography>
                
                <Typography variant='body2'>
                    Congratulations 🥳
                </Typography>

                <Typography variant='h5' sx={{ my: 3.1 }}>
                    420.8k
                </Typography>

                <Button size='small' variant='contained'>
                    View Sales
                </Button>

                {/* The triangle background image (he leaves the src empty in the video) */}
                <TriangleImg src='' alt='' />
                
                {/* The trophy image */}
                <TrophyImg src='https://res.cloudinary.com/djkymk2vo/image/upload/v1689231845/trophy_tysy1p.png' alt='trophy' />
                
            </CardContent>
        </Card>
    );
};

export default Achievement;