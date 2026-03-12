// import logo from './logo.svg';
import { Routes, Route } from 'react-router-dom';
import './App.css';
// import Cart from './customer/components/Cart/Cart';
// import Checkout from './customer/components/Checkout/Checkout';
// import Footer from './customer/components/Footer/Footer';
// import Navigation from './customer/components/Navigation/Navigation';
// import Order from './customer/components/Order/Order';
// import OrderDetails from './customer/components/Order/OrderDetails';
// import Product from './customer/components/Product/Product';
// import ProductDetails from './customer/components/ProductDetails/ProductDetails';
// import HomePage from './customer/pages/HomePage/HomePage';
import CustomerRoutes from './Routers/CustomerRouters';
import AdminRouters from './Routers/AdminRouters';

function App() {
  return (
    <div className="App">

<Routes>
        <Route path="/admin/*" element={<AdminRouters />} />
        <Route path="/*" element={<CustomerRoutes />} />
</Routes>

      <div>
        {/* <HomePage /> */}
        {/* <Product /> */}
        {/* <ProductDetails /> */}
        {/* <Cart /> */}
        {/* <Checkout /> */}
        {/* <Order /> */}
        {/* <OrderDetails /> */}
      </div>
    </div>
  );
}

export default App;
