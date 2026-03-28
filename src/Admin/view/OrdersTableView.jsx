import { Avatar, AvatarGroup, Card, CardHeader, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getOrders, shipOrder, confirmOrder, deliverOrder, deleteOrder} from "../../State/Admin/Orders/Action";

const OrdersTableView = () => {
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

    const headCellSx = { fontWeight: 600, color: '#6b7280', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' };

    return (
        <Card sx={{ 
            borderRadius: '16px', 
            border: '1px solid #f1f5f9',
            boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.04)',
            overflow: 'hidden',
            '&:hover': { boxShadow: '0 4px 12px 0 rgb(0 0 0 / 0.08)' },
            transition: 'box-shadow 0.2s ease',
        }}>
            <CardHeader 
                title="Recent Orders" 
                titleTypographyProps={{ sx: { fontWeight: 700, color: '#111827', fontSize: '1rem' } }}
                sx={{ borderBottom: '1px solid #f1f5f9' }}
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
                                            <Avatar key={orderItem.id} src={orderItem.product.imageUrl} alt={orderItem.product.title} sx={{ width: 36, height: 36, borderRadius: '8px' }} />
                                        ))}
                                    </AvatarGroup>
                                </TableCell>

                                <TableCell align="left" scope="row" sx={{ color: '#374151', fontSize: '0.8rem' }}>
                                    {item.orderItems.map((orderItem) => (
                                        <p key={orderItem.id}>{orderItem.product.title}</p>
                                    ))}
                                </TableCell>

                                <TableCell align="left" sx={{ color: '#6b7280', fontWeight: 500, fontSize: '0.8rem' }}>#{item.id}</TableCell>
                                <TableCell align="left" sx={{ color: '#374151', fontWeight: 600, fontSize: '0.8rem' }}>₹{item.totalDiscountedPrice}</TableCell>

                                <TableCell align="left">
                                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusStyles(item.orderStatus)}`}>
                                        {item.orderStatus}
                                    </span>
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Card>
    );
};

export default OrdersTableView;
