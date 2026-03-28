import { Avatar, Button, Card, CardHeader, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, findProducts } from '../../State/Product/Action';

const ProductsTableView = () => {
    const dispatch = useDispatch();
    const { products } = useSelector(store => store);

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
            pageSize: 1000,
            stock: ""
        };
        dispatch(findProducts(data));
    }, [products.deletedProduct, dispatch]);

    const handleProductDelete = (productId) => {
        dispatch(deleteProduct(productId));
    };

    const headCellSx = { 
        fontWeight: 700, 
        color: '#6b7280', 
        fontSize: '0.75rem', 
        textTransform: 'uppercase', 
        letterSpacing: '0.05em',
        backgroundColor: '#f9fafb',
        py: 2.5
    };

    return (
        <Card sx={{ 
            borderRadius: '16px', 
            border: '1px solid #f1f5f9',
            boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.04)',
            overflow: 'hidden',
            '&:hover': { 
                boxShadow: '0 12px 24px 0 rgb(0 0 0 / 0.08)',
                transition: 'box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            },
            transition: 'box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}>
            <CardHeader 
                title="Recent Products" 
                titleTypographyProps={{ sx: { fontWeight: 700, color: '#111827', fontSize: '1.125rem', letterSpacing: '0.15px' } }}
                sx={{ 
                    borderBottom: '1px solid #e5e7eb',
                    pb: 2.5,
                    pt: 3,
                    px: 3,
                    bgcolor: '#ffffff'
                }}
            />
            <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow sx={{ bgcolor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                            <TableCell sx={{ ...headCellSx, pl: 3 }}>Image</TableCell>
                            <TableCell align="left" sx={headCellSx}>Title</TableCell>
                            <TableCell align="left" sx={headCellSx}>Category</TableCell>
                            <TableCell align="left" sx={headCellSx}>Price</TableCell>
                            <TableCell align="left" sx={headCellSx}>Quantity</TableCell>
                            <TableCell align="left" sx={{ ...headCellSx, pr: 3 }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.products?.content?.slice(0, 5).map((item) => (
                            <TableRow key={item.id} sx={{ 
                                borderBottom: '1px solid #f3f4f6',
                                '&:last-child': { borderBottom: 'none' },
                                '&:hover': { 
                                    bgcolor: '#f9fafb',
                                    transition: 'background-color 0.15s ease',
                                },
                                transition: 'background-color 0.15s ease',
                            }}>
                                <TableCell align="left" sx={{ pl: 3, py: 2.5 }}>
                                    <Avatar 
                                        src={item.imageUrl} 
                                        alt={item.title} 
                                        sx={{ 
                                            borderRadius: '8px', 
                                            width: 45, 
                                            height: 45,
                                            border: '1px solid #e5e7eb',
                                            boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                                        }} 
                                    />
                                </TableCell>
                                <TableCell align="left" sx={{ color: '#1f2937', fontWeight: 500, fontSize: '0.875rem', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', py: 2.5 }}>
                                    {item.title}
                                </TableCell>
                                <TableCell align="left" sx={{ py: 2.5 }}>
                                    <Chip 
                                        label={item.category?.name}
                                        size="small"
                                        sx={{
                                            bgcolor: '#f0f4ff',
                                            color: '#667eea',
                                            fontWeight: 500,
                                            fontSize: '0.75rem',
                                            textTransform: 'capitalize',
                                            borderRadius: '6px',
                                            height: '24px',
                                        }}
                                    />
                                </TableCell>
                                <TableCell align="left" sx={{ color: '#1f2937', fontWeight: 700, fontSize: '0.875rem', py: 2.5 }}>₹{item.discountedPrice}</TableCell>
                                <TableCell align="left" sx={{ color: '#6b7280', fontWeight: 500, fontSize: '0.875rem', py: 2.5 }}>{item.quantity}</TableCell>
                                <TableCell align="left" sx={{ pr: 3, py: 2.5 }}>
                                    <Button 
                                        onClick={() => handleProductDelete(item.id)} 
                                        variant='outlined' 
                                        color='error'
                                        size='small'
                                        sx={{
                                            borderRadius: '6px',
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
    );
};

export default ProductsTableView;