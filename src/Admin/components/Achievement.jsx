import { Card, CardContent, CardHeader, Typography, styled, Box } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import React from 'react';

// Styled component for the decorative background triangle
const TriangleImg = styled('img')({
    right: 0,
    bottom: 0,
    height: 170,
    position: 'absolute'
});

// Styled component for the icon in the corner
const IconBox = styled(Box)({
    right: 36,
    bottom: 20,
    height: 98,
    width: 98,
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
});

const Achievement = () => {
    return (
        <Card sx={{ 
            position: "relative", 
            borderRadius: '16px', 
            border: '1px solid #f1f5f9',
            boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.04)',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            overflow: 'hidden',
            minHeight: '240px',
            '&:hover': {
                boxShadow: '0 12px 24px 0 rgb(102 126 234 / 0.3), 0 4px 12px 0 rgb(0 0 0 / 0.15)',
                transform: 'translateY(-4px)',
            },
            transition: 'box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}>
            <CardHeader 
                title="Cognicart" 
                subheader={
                    <Typography variant='body2' sx={{ color: 'rgba(255,255,255,0.8)' }}>
                        <Box component="span" sx={{ fontWeight: 600, mr: 0.5, color: 'rgba(255,255,255,0.9)'}}>
                            Congratulations 🥳
                        </Box>
                    </Typography>
                }
                titleTypographyProps={{
                    sx: {
                        mb: 1,
                        lineHeight: '2rem !important',
                        letterSpacing: '0.15px !important',
                        fontWeight: 700,
                        color: 'white',
                    }
                }}
            />
            <CardContent sx={{ pt: theme => `${theme.spacing(2)} !important`, pb: 3 }}>
                <Typography variant='h5' sx={{ fontWeight: 700, color: 'white' }}>
                    420.8k
                </Typography>

                {/* The triangle background image (he leaves the src empty in the video) */}
                <TriangleImg src='' alt='' />
                
                {/* The achievement icon */}
                <IconBox>
                    <EmojiEventsIcon sx={{ fontSize: 60, color: 'rgba(255,255,255,0.8)' }} />
                </IconBox>
                
            </CardContent>
        </Card>
    );
};

export default Achievement;