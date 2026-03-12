import React, { useEffect } from 'react';
import CartItem from './CartItem';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCart } from '../../../State/Cart/Action';

const Cart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { cart } = useSelector(store => store);

    const handleCheckout = () => {
        navigate("/checkout?step=2");
    }

    useEffect(() => {
        dispatch(getCart());
    }, [cart.updateCartItem, cart.deleteCartItem, dispatch]);

    console.log(" discount - ", cart.cart?.totalPrice - cart.cart?.totalDiscountedPrice);

    return (
        <div>
            <div className='lg:grid grid-cols-3 lg:px-16 relative'>
                {/* Left Side: Cart Items Mapping */}
                <div className='col-span-2'>
    {cart.cart?.cartItems
        // Add this sort function to keep items stable by ID
        ?.sort((a, b) => a.id - b.id) 
        ?.map((item) => (
            <CartItem key={item.id} item={item} />
        ))
    }
</div>
                
                {/* Right Side: Price Details */}
                <div className='px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0'>
                    <div className='border p-5 bg-white shadow-lg rounded-md'>
                        <p className='uppercase font-bold opacity-60 pb-4'>Price details</p>
                        <hr />
                        <div className='space-y-3 font-semibold mb-10'>
                            
                            <div className='flex justify-between pt-3 text-black'>
                                <span>Price ({cart.cart?.totalItem} item)</span>
                                <span>₹{cart.cart?.totalPrice}</span>
                            </div>
                            
                            <div className='flex justify-between pt-3'>
                                <span>Discount</span>
                                <span className='text-green-600'>-₹{cart.cart?.totalPrice - cart.cart?.totalDiscountedPrice}</span>
                            </div>
                            
                            <div className='flex justify-between pt-3'>
                                <span>Delivery Charge</span>
                                <span className='text-green-600'>Free</span>
                            </div>
                            
                            <hr />
                            
                            <div className='flex justify-between pt-3 font-bold text-lg'>
                                <span>Total Amount</span>
                                <span className='text-green-600'>₹{cart.cart?.totalDiscountedPrice}</span>
                            </div>
                            
                        </div>
                        
                        <Button 
                            onClick={handleCheckout} 
                            variant='contained' 
                            className='w-full mt-5' 
                            sx={{ px: "2.5rem", py: "0.7rem", bgcolor: "#9155fd" }}
                        >
                            Checkout
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;










// import React from 'react';
// import CartItem from './CartItem';
// import { Button, Divider } from '@mui/material';
// import { useNavigate } from 'react-router-dom';

// const Cart = () => {
//     const navigate = useNavigate();

//     const handleCheckout = () => {
//         // Navigates to the Checkout page, starting at the Delivery Address step
//         navigate("/checkout?step=2");
//     }

//     return (
//         <div>
//             <div className='lg:grid grid-cols-3 lg:px-16 relative pt-10'>
                
//                 {/* Left Side: Cart Items */}
//                 <div className='col-span-2'>
//                     {[1, 1, 1].map((item, index) => <CartItem key={index} />)}
//                 </div>
                
//                 {/* Right Side: Price Details Summary */}
//                 <div className='px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0'>
//                     <div className='border'>
//                         <p className='uppercase font-bold opacity-60 pb-4 p-5'>Price details</p>
//                         <Divider />
//                         <div className='space-y-3 font-semibold mb-10 p-5'>
//                             <div className='flex justify-between pt-3 text-black'>
//                                 <span>Price (3 item)</span>
//                                 <span>₹4697</span>
//                             </div>
//                             <div className='flex justify-between pt-3'>
//                                 <span>Discount</span>
//                                 <span className='text-green-600'>-₹3419</span>
//                             </div>
//                             <div className='flex justify-between pt-3'>
//                                 <span>Delivery Charge</span>
//                                 <span className='text-green-600'>Free</span>
//                             </div>
//                             <Divider />
//                             <div className='flex justify-between font-bold text-lg pt-3'>
//                                 <span>Total Amount</span>
//                                 <span className='text-green-600'>₹1278</span>
//                             </div>
//                         </div>
                        
//                         <div className='p-5'>
//                             <Button 
//                                 onClick={handleCheckout} 
//                                 variant="contained" 
//                                 className='w-full' 
//                                 sx={{ px: "2rem", py: "1rem", bgcolor: "#9155fd" }}
//                             >
//                                 Checkout
//                             </Button>
//                         </div>
//                     </div>
//                 </div>

//             </div>
//         </div>
//     );
// }

// export default Cart;