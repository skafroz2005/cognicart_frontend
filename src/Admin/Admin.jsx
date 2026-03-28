import { Box, CssBaseline, List, ListItem, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme, Modal, Typography, Button } from '@mui/material';
import React, { useState } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import PeopleIcon from '@mui/icons-material/People';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AddBoxIcon from '@mui/icons-material/AddBox';
import LogoutIcon from '@mui/icons-material/Logout';
import StorefrontIcon from '@mui/icons-material/Storefront';

// We will build these components next!
import AdminDashboard from './components/AdminDashboard';
import CreateProductForm from './components/CreateProductForm';
import ProductsTable from './components/ProductsTable';
import OrdersTable from './components/OrdersTable';
import CustomersTable from './components/CustomersTable';

const menu = [
    {name: "Dashboard", path: "/admin", icon: <DashboardIcon/>},
    {name: "Products", path: "/admin/products", icon: <Inventory2Icon/>},
    {name: "Customers", path: "/admin/customers", icon: <PeopleIcon/>},
    {name: "Orders", path: "/admin/orders", icon: <ReceiptLongIcon/>},
    {name: "Add Product", path: "/admin/product/create", icon: <AddBoxIcon/>},
];

const Admin = () => {
    const theme = useTheme();
    const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
    const [sideBarVisible, setSideBarVisible] = useState(false);
    const [logoutModalOpen, setLogoutModalOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem("jwt");
        setLogoutModalOpen(false);
        navigate("/");
    };

    const drawer = (
        <Box
            sx={{
                overflow: "auto",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%"
            }}
        >
            <>
                {/* Brand Header */}
                <div>
                    <div className="px-5 py-6 border-b border-gray-100">
                        <h1 className="text-xl font-bold text-gray-900 tracking-tight">Cognicart</h1>
                        <p className="text-xs text-gray-400 mt-0.5">Admin Panel</p>
                    </div>
                    
                    <List sx={{ px: 1.5, pt: 2 }}>
                        {menu.map((item, index) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <ListItem key={item.name} disablePadding sx={{ mb: 0.5 }} onClick={() => navigate(item.path)}>
                                    <ListItemButton
                                        sx={{
                                            borderRadius: '12px',
                                            py: 1.2,
                                            px: 2,
                                            bgcolor: isActive ? '#eef2ff' : 'transparent',
                                            color: isActive ? '#4f46e5' : '#374151',
                                            '&:hover': {
                                                bgcolor: isActive ? '#eef2ff' : '#f9fafb',
                                            },
                                            transition: 'all 0.15s ease',
                                        }}
                                    >
                                        <ListItemIcon sx={{ 
                                            minWidth: 40, 
                                            color: isActive ? '#4f46e5' : '#9ca3af',
                                        }}>
                                            {item.icon}
                                        </ListItemIcon>
                                        <ListItemText 
                                            primary={item.name} 
                                            primaryTypographyProps={{ 
                                                fontSize: '0.875rem', 
                                                fontWeight: isActive ? 600 : 500,
                                            }} 
                                        />
                                    </ListItemButton>
                                </ListItem>
                            );
                        })}
                    </List>
                </div>
            </>

            {/* Bottom Section: Back to Shop + Account */}
            <div className="border-t border-gray-100 p-3">
                <List sx={{ p: 0 }}>
                    <ListItem disablePadding sx={{ mb: 0.5 }}>
                        <ListItemButton 
                            onClick={() => navigate("/")}
                            sx={{
                                borderRadius: '12px',
                                py: 1.2,
                                px: 2,
                                '&:hover': { bgcolor: '#f0fdf4' },
                                transition: 'all 0.15s ease',
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: 40, color: '#22c55e' }}>
                                <StorefrontIcon />
                            </ListItemIcon>
                            <ListItemText 
                                primary="Back to Shop" 
                                primaryTypographyProps={{ 
                                    fontSize: '0.875rem', 
                                    fontWeight: 500,
                                    color: '#374151',
                                }} 
                            />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton 
                            onClick={() => setLogoutModalOpen(true)}
                            sx={{
                                borderRadius: '12px',
                                py: 1.2,
                                px: 2,
                                '&:hover': { bgcolor: '#fef2f2' },
                                transition: 'all 0.15s ease',
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: 40, color: '#ef4444' }}>
                                <LogoutIcon />
                            </ListItemIcon>
                            <ListItemText 
                                primary="Logout" 
                                primaryTypographyProps={{ 
                                    fontSize: '0.875rem', 
                                    fontWeight: 500,
                                    color: '#374151',
                                }} 
                            />
                        </ListItemButton>
                    </ListItem>
                </List>
            </div>
        </Box>
    );

    return (
        <div className='flex h-[100vh]'>
            <CssBaseline />
            
            {/* Sidebar Drawer */}
            <div className='w-[15%] min-w-[220px] border-r border-gray-100 h-full fixed top-0 bg-white z-10'>
                {drawer}
            </div>

            {/* Main Content Area */}
            <div className='w-[85%] h-full ml-[15%] min-ml-[220px] bg-[#f8fafc]'>
                <Routes>
                    <Route path="/" element={<AdminDashboard />} />
                    <Route path="/product/create" element={<CreateProductForm />} />
                    <Route path="/products" element={<ProductsTable />} />
                    <Route path="/orders" element={<OrdersTable />} />
                    <Route path="/customers" element={<CustomersTable />} />
                </Routes>
            </div>

            {/* Logout Confirmation Modal */}
            <Modal
                open={logoutModalOpen}
                onClose={() => setLogoutModalOpen(false)}
                aria-labelledby="logout-modal"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'white',
                    borderRadius: '16px',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                    p: 4,
                    outline: 'none',
                }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#111827', mb: 1 }}>
                        Logout Confirmation
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#6b7280', mb: 3 }}>
                        Are you sure you want to logout from Admin Panel?
                    </Typography>
                    <div className="flex justify-end gap-3">
                        <Button 
                            onClick={() => setLogoutModalOpen(false)}
                            variant="outlined"
                            sx={{ 
                                borderRadius: '10px', 
                                textTransform: 'none', 
                                color: '#374151', 
                                borderColor: '#d1d5db',
                                fontWeight: 500,
                                '&:hover': { bgcolor: '#f9fafb', borderColor: '#9ca3af' },
                            }}
                        >
                            Cancel
                        </Button>
                        <Button 
                            onClick={handleLogout}
                            variant="contained"
                            sx={{ 
                                borderRadius: '10px', 
                                textTransform: 'none', 
                                bgcolor: '#ef4444', 
                                fontWeight: 500,
                                '&:hover': { bgcolor: '#dc2626' },
                            }}
                        >
                            Logout
                        </Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default Admin;