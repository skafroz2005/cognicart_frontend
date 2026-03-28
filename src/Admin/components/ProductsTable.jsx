import { Avatar, Button, Card, CardHeader, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, findProducts } from '../../State/Product/Action';

const ProductsTable = () => {
    const dispatch = useDispatch();
    const { products } = useSelector(store => store);

    // Fetch products when the component mounts or when a product is deleted
    useEffect(() => {
        const data = {
            category: "",
            colors: [],
            sizes: [],
            minPrice: 0,
            maxPrice: 1000000,
            minDiscount: 0,
            sort: "price_low",
            pageNumber: 0,
            pageSize: 1000, // Fetch all products
            stock: ""
        };
        dispatch(findProducts(data));
    }, [products.deletedProduct, dispatch]);

    const handleProductDelete = (productId) => {
        dispatch(deleteProduct(productId));
    };

    return (
        <div className='p-6 lg:p-8 bg-[#f8fafc] min-h-screen'>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Products</h1>
                <p className="text-sm text-gray-500 mt-1">Manage your product inventory</p>
            </div>
            <Card sx={{ 
                borderRadius: '16px', 
                border: '1px solid #f1f5f9',
                boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.04)',
                overflow: 'hidden',
            }}>
                <CardHeader 
                    title="All Products" 
                    titleTypographyProps={{ sx: { fontWeight: 700, color: '#111827', fontSize: '1.1rem' } }}
                    sx={{ borderBottom: '1px solid #f1f5f9', bgcolor: 'white' }}
                />
                <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow sx={{ bgcolor: '#f8fafc' }}>
                                <TableCell sx={{ fontWeight: 600, color: '#6b7280', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Image</TableCell>
                                <TableCell align="left" sx={{ fontWeight: 600, color: '#6b7280', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Title</TableCell>
                                <TableCell align="left" sx={{ fontWeight: 600, color: '#6b7280', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Category</TableCell>
                                <TableCell align="left" sx={{ fontWeight: 600, color: '#6b7280', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Price</TableCell>
                                <TableCell align="left" sx={{ fontWeight: 600, color: '#6b7280', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Quantity</TableCell>
                                <TableCell align="left" sx={{ fontWeight: 600, color: '#6b7280', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.products?.content?.map((item) => (
                                <TableRow key={item.id} sx={{ 
                                    '&:last-child td, &:last-child th': { border: 0 },
                                    '&:hover': { bgcolor: '#f9fafb' },
                                    transition: 'background-color 0.15s ease',
                                }}>
                                    <TableCell align="left">
                                        <Avatar src={item.imageUrl} alt={item.title} sx={{ borderRadius: '10px', width: 44, height: 44 }} />
                                    </TableCell>
                                    <TableCell align="left" scope="row" sx={{ color: '#374151', fontWeight: 500, fontSize: '0.875rem' }}>
                                        {item.title}
                                    </TableCell>
                                    <TableCell align="left">
                                        <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full">
                                            {item.category?.name}
                                        </span>
                                    </TableCell>
                                    <TableCell align="left" sx={{ color: '#374151', fontWeight: 600 }}>₹{item.discountedPrice}</TableCell>
                                    <TableCell align="left" sx={{ color: '#6b7280' }}>{item.quantity}</TableCell>
                                    <TableCell align="left">
                                        <Button 
                                            onClick={() => handleProductDelete(item.id)} 
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

export default ProductsTable;