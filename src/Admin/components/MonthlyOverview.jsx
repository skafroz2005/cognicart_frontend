import React from 'react';
import { Avatar, Box, Card, CardContent, CardHeader, Typography } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsCellIcon from '@mui/icons-material/SettingsCell';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

// Dummy data for the four stat blocks with soft background colors
const salesData = [
    {
        stats: '245K',
        title: 'Sales',
        color: 'primary',
        bgColor: '#eff6ff',
        iconColor: '#3b82f6',
        icon: <TrendingUpIcon sx={{ fontSize: "1.75rem" }} />
    },
    {
        stats: '12.5K',
        title: 'Customers',
        color: 'success',
        bgColor: '#f0fdf4',
        iconColor: '#22c55e',
        icon: <AccountCircleIcon sx={{ fontSize: "1.75rem" }} />
    },
    {
        stats: '1.54K',
        title: 'Products',
        color: 'warning',
        bgColor: '#fff7ed',
        iconColor: '#f97316',
        icon: <SettingsCellIcon sx={{ fontSize: "1.75rem" }} />
    },
    {
        stats: '88K',
        title: 'Revenue',
        color: 'info',
        bgColor: '#faf5ff',
        iconColor: '#a855f7',
        icon: <AttachMoneyIcon sx={{ fontSize: "1.75rem" }} />
    }
];

// Reusable function to map the stat blocks to the Grid
const renderStats = () => {
    return salesData.map((item, index) => (
        <div className='mui-grid-item-div mui-col-xs-12 mui-col-sm-3' key={index}>
            <Box sx={{ 
                display: "flex", 
                alignItems: "center",
                p: 2,
                borderRadius: '12px',
                bgcolor: item.bgColor,
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                },
            }}>
                <Avatar 
                    variant='rounded' 
                    sx={{
                        mr: 2,
                        width: 48,
                        height: 48,
                        borderRadius: '12px',
                        color: item.iconColor,
                        bgcolor: 'white',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                    }}
                >
                    {item.icon}
                </Avatar>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant='caption' sx={{ color: '#6b7280', fontSize: '0.75rem', fontWeight: 500 }}>{item.title}</Typography>
                    <Typography variant='h6' sx={{ fontWeight: 700, color: '#111827', lineHeight: 1.2 }}>{item.stats}</Typography>
                </Box>
            </Box>
        </div>
    ));
};

const MonthlyOverview = () => {
    return (
        <Card sx={{ 
            borderRadius: '16px', 
            border: '1px solid #f1f5f9',
            boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.04)',
            '&:hover': { boxShadow: '0 4px 12px 0 rgb(0 0 0 / 0.08)' },
            transition: 'box-shadow 0.2s ease',
        }}>
            <CardHeader 
                title="Monthly Overview" 
                subheader={
                    <Typography variant='body2' sx={{ color: '#6b7280' }}>
                        <Box component="span" sx={{ fontWeight: 600, mr: 0.5, color: '#22c55e'}}>
                            Total 48.5% growth
                        </Box>
                        {''}😎 this month
                    </Typography>
                }
                titleTypographyProps={{
                    sx: {
                        mb: 2.5,
                        lineHeight: '2rem !important',
                        letterSpacing: '0.15px !important',
                        fontWeight: 700,
                        color: '#111827',
                    }
                }}
            />
            <CardContent sx={{ pt: theme => `${theme.spacing(3)} !important` }}>
                <div className='mui-grid-container-div mui-row-gap-40'>
                    {renderStats()}
                </div>
            </CardContent>
        </Card>
    );
};

export default MonthlyOverview;