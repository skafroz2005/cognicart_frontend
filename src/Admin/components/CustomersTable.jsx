import { Avatar, Card, CardHeader, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Note: Depending on your specific State structure, you might pull this from auth or a dedicated admin state
// For now, we'll assume the standard 'auth' or a generic 'admin' selector
import { getAllCustomers } from '../../State/Auth/Action'; 

const CustomersTable = () => {
    const dispatch = useDispatch();
    const { auth } = useSelector(store => store);

    useEffect(() => {
        // Dispatching the action to fetch all users from the backend
        // Make sure this action is defined in your Auth/Action.js
        if(dispatch(getAllCustomers)) {
            dispatch(getAllCustomers());
        }
    }, [dispatch]);

    return (
        <div className='p-5'>
            <Card className="mt-2 bg-white">
                <CardHeader title="Registered Customers" />
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Image</TableCell>
                                <TableCell align="left">Name</TableCell>
                                <TableCell align="left">Email</TableCell>
                                <TableCell align="left">Role</TableCell>
                                <TableCell align="left">User ID</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/* We map through the users fetched from the backend */}
                            {auth.users?.map((item) => (
                                <TableRow key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell align="left">
                                        <Avatar sx={{ bgcolor: "#9155fd" }}>
                                            {item.firstName[0].toUpperCase()}
                                        </Avatar>
                                    </TableCell>
                                    <TableCell align="left" scope="row">
                                        {item.firstName + " " + item.lastName}
                                    </TableCell>
                                    <TableCell align="left">{item.email}</TableCell>
                                    <TableCell align="left">
                                        <span className={`px-4 py-1 rounded-full text-white ${item.role === 'ROLE_ADMIN' ? 'bg-purple-600' : 'bg-green-600'}`}>
                                            {item.role === 'ROLE_ADMIN' ? 'Admin' : 'Customer'}
                                        </span>
                                    </TableCell>
                                    <TableCell align="left">{item.id}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                
                {/* Fallback if no users are found */}
                {auth.users?.length === 0 && (
                    <div className='p-10 text-center text-gray-500'>
                        No registered customers found.
                    </div>
                )}
            </Card>
        </div>
    );
};

export default CustomersTable;