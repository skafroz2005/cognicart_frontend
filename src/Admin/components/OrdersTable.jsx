import { Avatar, AvatarGroup, Button, Card, CardHeader, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getOrders, shipOrder, confirmOrder, deliverOrder, deleteOrder} from "../../State/Admin/Orders/Action";

const OrdersTable = () => {
    const dispatch = useDispatch();
    const { adminOrder } = useSelector(store => store);

    // State for the Material UI dropdown menu
    const [anchorEl, setAnchorEl] = React.useState([]);
    const open = Boolean(anchorEl);

    const handleClick = (event, index) => {
        const newAnchorElArray = [...anchorEl];
        newAnchorElArray[index] = event.currentTarget;
        setAnchorEl(newAnchorElArray);
    };

    const handleClose = (index) => {
        const newAnchorElArray = [...anchorEl];
        newAnchorElArray[index] = null;
        setAnchorEl(newAnchorElArray);
    };

    useEffect(() => {
        dispatch(getOrders());
    }, [adminOrder.delivered, adminOrder.shipped, adminOrder.confirmed, adminOrder.deletedOrder, dispatch]);

    // Redux Action Handlers
    const handleShippedOrder = (orderId) => {
        dispatch(shipOrder(orderId));
        handleClose();
    };

    const handleConfirmedOrder = (orderId) => {
        dispatch(confirmOrder(orderId));
        handleClose();
    };

    const handleDeliverOrder = (orderId) => {
        dispatch(deliverOrder(orderId));
        handleClose();
    };

    const handleDeleteOrder = (orderId) => {
        dispatch(deleteOrder(orderId));
    };

    const getStatusStyles = (status) => {
        switch(status) {
            case 'PENDING': return 'bg-gray-100 text-gray-700';
            case 'PLACED': return 'bg-blue-50 text-blue-700';
            case 'CONFIRMED': return 'bg-emerald-50 text-emerald-700';
            case 'SHIPPED': return 'bg-indigo-50 text-indigo-700';
            case 'DELIVERED': return 'bg-green-50 text-green-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const headCellSx = { fontWeight: 600, color: '#6b7280', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' };

    return (
        <div className='p-6 lg:p-8 bg-[#f8fafc] min-h-screen'>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Orders</h1>
                <p className="text-sm text-gray-500 mt-1">Track and manage customer orders</p>
            </div>
            <Card sx={{ 
                borderRadius: '16px', 
                border: '1px solid #f1f5f9',
                boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.04)',
                overflow: 'hidden',
            }}>
                <CardHeader 
                    title="All Orders" 
                    titleTypographyProps={{ sx: { fontWeight: 700, color: '#111827', fontSize: '1.1rem' } }}
                    sx={{ borderBottom: '1px solid #f1f5f9', bgcolor: 'white' }}
                />
                <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow sx={{ bgcolor: '#f8fafc' }}>
                                <TableCell sx={headCellSx}>Image</TableCell>
                                <TableCell align="left" sx={headCellSx}>Title</TableCell>
                                <TableCell align="left" sx={headCellSx}>Id</TableCell>
                                <TableCell align="left" sx={headCellSx}>Price</TableCell>
                                <TableCell align="left" sx={headCellSx}>Status</TableCell>
                                <TableCell align="left" sx={headCellSx}>Update</TableCell>
                                <TableCell align="left" sx={headCellSx}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {adminOrder.orders?.map((item, index) => (
                                <TableRow key={item.id} sx={{ 
                                    '&:last-child td, &:last-child th': { border: 0 },
                                    '&:hover': { bgcolor: '#f9fafb' },
                                    transition: 'background-color 0.15s ease',
                                }}>
                                    
                                    <TableCell align="left">
                                        <AvatarGroup max={3} sx={{ justifyContent: 'start' }}>
                                            {item.orderItems.map((orderItem) => (
                                                <Avatar key={orderItem.id} src={orderItem.product.imageUrl} alt={orderItem.product.title} sx={{ width: 40, height: 40, borderRadius: '10px' }} />
                                            ))}
                                        </AvatarGroup>
                                    </TableCell>

                                    <TableCell align="left" scope="row" sx={{ color: '#374151', fontSize: '0.875rem' }}>
                                        {item.orderItems.map((orderItem) => (
                                            <p key={orderItem.id} className="text-sm">{orderItem.product.title}</p>
                                        ))}
                                    </TableCell>

                                    <TableCell align="left" sx={{ color: '#6b7280', fontWeight: 500 }}>#{item.id}</TableCell>
                                    <TableCell align="left" sx={{ color: '#374151', fontWeight: 600 }}>₹{item.totalDiscountedPrice}</TableCell>

                                    <TableCell align="left">
                                        <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${getStatusStyles(item.orderStatus)}`}>
                                            {item.orderStatus}
                                        </span>
                                    </TableCell>

                                    {/* The Update Dropdown Menu */}
                                    <TableCell align="left">
                                        <Button
                                            id={`basic-button-${item.id}`}
                                            aria-controls={`basic-menu-${item.id}`}
                                            aria-haspopup="true"
                                            aria-expanded={Boolean(anchorEl[index]) ? 'true' : undefined}
                                            onClick={(event) => handleClick(event, index)}
                                            size="small"
                                            sx={{
                                                textTransform: 'none',
                                                color: '#4f46e5',
                                                fontWeight: 500,
                                                fontSize: '0.8rem',
                                                borderRadius: '8px',
                                                '&:hover': { bgcolor: '#eef2ff' },
                                            }}
                                        >
                                            Status
                                        </Button>
                                        <Menu
                                            id={`basic-menu-${item.id}`}
                                            anchorEl={anchorEl[index]}
                                            open={Boolean(anchorEl[index])}
                                            onClose={() => handleClose(index)}
                                            MenuListProps={{ 'aria-labelledby': `basic-button-${item.id}` }}
                                            PaperProps={{ sx: { borderRadius: '12px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)', mt: 0.5 } }}
                                        >
                                            <MenuItem onClick={() => handleConfirmedOrder(item.id)} sx={{ fontSize: '0.875rem', py: 1.2 }}>Confirm Order</MenuItem>
                                            <MenuItem onClick={() => handleShippedOrder(item.id)} sx={{ fontSize: '0.875rem', py: 1.2 }}>Ship Order</MenuItem>
                                            <MenuItem onClick={() => handleDeliverOrder(item.id)} sx={{ fontSize: '0.875rem', py: 1.2 }}>Deliver Order</MenuItem>
                                        </Menu>
                                    </TableCell>

                                    {/* The Delete Button */}
                                    <TableCell align="left">
                                        <Button
                                            onClick={() => handleDeleteOrder(item.id)}
                                            variant='outlined'
                                            color='error'
                                            size='small'
                                            sx={{
                                                borderRadius: '8px',
                                                textTransform: 'none',
                                                fontWeight: 500,
                                                fontSize: '0.8rem',
                                                borderColor: '#fecaca',
                                                color: '#ef4444',
                                                '&:hover': { bgcolor: '#fef2f2', borderColor: '#fca5a5' },
                                            }}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </div>
    );
};

export default OrdersTable;
