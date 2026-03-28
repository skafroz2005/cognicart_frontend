import { Avatar, Card, CardHeader, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCustomers } from '../../State/Auth/Action'; 

const CustomersTable = () => {
    const dispatch = useDispatch();
    const { auth } = useSelector(store => store);

    useEffect(() => {
        if(dispatch(getAllCustomers)) {
            dispatch(getAllCustomers());
        }
    }, [dispatch]);

    const headCellSx = { fontWeight: 600, color: '#6b7280', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' };

    return (
        <div className='p-6 lg:p-8 bg-[#f8fafc] min-h-screen'>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Customers</h1>
                <p className="text-sm text-gray-500 mt-1">View registered users</p>
            </div>
            <Card sx={{ 
                borderRadius: '16px', 
                border: '1px solid #f1f5f9',
                boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.04)',
                overflow: 'hidden',
            }}>
                <CardHeader 
                    title="Registered Customers" 
                    titleTypographyProps={{ sx: { fontWeight: 700, color: '#111827', fontSize: '1.1rem' } }}
                    sx={{ borderBottom: '1px solid #f1f5f9', bgcolor: 'white' }}
                />
                <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow sx={{ bgcolor: '#f8fafc' }}>
                                <TableCell sx={headCellSx}>Avatar</TableCell>
                                <TableCell align="left" sx={headCellSx}>Name</TableCell>
                                <TableCell align="left" sx={headCellSx}>Email</TableCell>
                                <TableCell align="left" sx={headCellSx}>Role</TableCell>
                                <TableCell align="left" sx={headCellSx}>User ID</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {auth.customers?.filter((item) => item.role !== "ADMIN").map((item) => (
                                <TableRow key={item.id} sx={{ 
                                    '&:last-child td, &:last-child th': { border: 0 },
                                    '&:hover': { bgcolor: '#f9fafb' },
                                    transition: 'background-color 0.15s ease',
                                }}>
                                    
                                    <TableCell>
                                        <Avatar sx={{ bgcolor: '#8b5cf6', color: 'white', width: 40, height: 40, fontSize: '0.9rem', fontWeight: 600 }}>
                                            {item.firstName ? item.firstName[0].toUpperCase() : "U"}
                                        </Avatar>
                                    </TableCell>
                                    
                                    <TableCell sx={{ color: '#374151', fontWeight: 500, fontSize: '0.875rem' }}>{item.firstName} {item.lastName}</TableCell>
                                    
                                    <TableCell sx={{ color: '#6b7280', fontSize: '0.875rem' }}>{item.email}</TableCell>
                                    
                                    <TableCell>
                                        <span className="text-xs font-medium text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full">
                                            {item.role}
                                        </span>
                                    </TableCell>
                                    
                                    <TableCell sx={{ color: '#6b7280', fontWeight: 500 }}>#{item.id}</TableCell>

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