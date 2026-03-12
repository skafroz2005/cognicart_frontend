import { Box, CssBaseline, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, useMediaQuery, useTheme } from '@mui/material';
import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import PeopleIcon from '@mui/icons-material/People';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

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
    const navigate = useNavigate();

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
                {/* Optional: Add a Logo or Admin Header here */}
                {/* <div className='flex items-center justify-center py-4'>Admin Panel</div> */}
                {/* {isLargeScreen && <Toolbar />} This adds spacing at the top on large screens */}
                <List>
                    {menu.map((item, index) => (
                        <ListItem key={item.name} disablePadding onClick={() => navigate(item.path)}>
                            <ListItemButton>
                                <ListItemIcon>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.name} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </>

            <List>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <AccountCircleIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Account"} />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <div className='flex h-[100vh]'>
            <CssBaseline />
            
            {/* Sidebar Drawer */}
            <div className='w-[15%] border border-r-gray-300 h-full fixed top-0'>
                {drawer}
            </div>

            {/* Main Content Area */}
            <div className='w-[85%] h-full ml-[15%]'>
                <Routes>
                    {/* Placeholder routes - uncomment as we build them!  */}
                    <Route path="/" element={<AdminDashboard />} />
                    <Route path="/product/create" element={<CreateProductForm />} />
                    <Route path="/products" element={<ProductsTable />} />
                    <Route path="/orders" element={<OrdersTable />} />
                    <Route path="/customers" element={<CustomersTable />} />
                </Routes>
            </div>
        </div>
    );
};

export default Admin;