import { Avatar, AvatarGroup, Button, Card, CardHeader, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import { confirmOrder, deleteOrder, deliverOrder, getOrders, shipOrder } from '../../State/Admin/Order/Action';
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

    return (
        <div className='p-5'>
            <Card className="mt-2 bg-white">
                <CardHeader title="Recent Orders" />
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Image</TableCell>
                                <TableCell align="left">Title</TableCell>
                                <TableCell align="left">Id</TableCell>
                                <TableCell align="left">Price</TableCell>
                                <TableCell align="left">Status</TableCell>
                
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {adminOrder.orders?.map((item, index) => (
                                <TableRow key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    
                                    <TableCell align="left">
                                        <AvatarGroup max={3} sx={{ justifyContent: 'start' }}>
                                            {item.orderItems.map((orderItem) => (
                                                <Avatar key={orderItem.id} src={orderItem.product.imageUrl} alt={orderItem.product.title} />
                                            ))}
                                        </AvatarGroup>
                                    </TableCell>

                                    <TableCell align="left" scope="row">
                                        {item.orderItems.map((orderItem) => (
                                            <p key={orderItem.id}>{orderItem.product.title}</p>
                                        ))}
                                    </TableCell>

                                    <TableCell align="left">{item.id}</TableCell>
                                    <TableCell align="left">₹{item.totalDiscountedPrice}</TableCell>

                                    <TableCell align="left">
                                        {/* Status Badge */}
                                        <span className={`text-white px-5 py-2 rounded-full
                                            ${item.orderStatus === "CONFIRMED" ? "bg-[#369236]" :
                                            item.orderStatus === "SHIPPED" ? "bg-[#4141ff]" :
                                            item.orderStatus === "PLACED" ? "bg-[#02B290]" :
                                            item.orderStatus === "PENDING" ? "bg-[gray]" :
                                            "bg-[#025720]"}`}>
                                            {item.orderStatus}
                                        </span>
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

export default OrdersTableView;










