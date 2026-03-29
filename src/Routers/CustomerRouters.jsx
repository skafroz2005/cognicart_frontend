import React from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import HomePage from '../customer/pages/HomePage/HomePage';
import Cart from '../customer/components/Cart/Cart';
import Navigation from '../customer/components/Navigation/Navigation';
import Footer from '../customer/components/Footer/Footer';
import Product from '../customer/components/Product/Product';
import ProductDetails from '../customer/components/ProductDetails/ProductDetails';
import Checkout from '../customer/components/Checkout/Checkout';
import Order from '../customer/components/Order/Order';
import OrderDetails from '../customer/components/Order/OrderDetails';
import PaymentSuccess from '../customer/components/Payment/PaymentSuccess';
import SearchResults from '../customer/components/Product/SearchResults';
import RateProduct from '../customer/components/ReviewProduct/RateProduct';
import AiModePage from '../customer/pages/AIMode/AiModePage';


const CustomerRoutes = () => {
    const authUser = useSelector((store) => store.auth?.user);
    const jwt = localStorage.getItem('jwt');
    const location = useLocation();
    const isAiModeRoute = location.pathname === '/ai-mode';

    return (
        <div>
            {/* The Navigation bar will persist across all customer routes */}
            <div>
                <Navigation />
            </div>
            
            <Routes>
                <Route path="/login" element={<HomePage />} />
                <Route path="/register" element={<HomePage />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/:levelOne/:levelTwo/:levelThree" element={<Product />} />
                <Route path="/product/:productId" element={<ProductDetails />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/account/order" element={<Order />} />
                <Route path="/account/order/:orderId" element={<OrderDetails />} />
                <Route path="/payment" element={<PaymentSuccess />} />

                <Route path="/account/rate/:productId" element={<RateProduct />} />

                <Route path="/search" element={<SearchResults />} />
                <Route
                    path="/ai-mode"
                    element={authUser || jwt ? <AiModePage /> : <Navigate to="/" replace />}
                />
            </Routes>

            {/* The Footer will persist across all customer routes */}
            {!isAiModeRoute && (
                <div>
                    <Footer />
                </div>
            )}
        </div>
    );
};

export default CustomerRoutes;