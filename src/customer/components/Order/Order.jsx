// import { Grid } from '@mui/material';
// import React from 'react';
// import OrderCard from './OrderCard';

// const orderStatus = [
//     { label: "On The Way", value: "on_the_way" },
//     { label: "Delivered", value: "delivered" },
//     { label: "Cancelled", value: "cancelled" },
//     { label: "Returned", value: "returned" },
// ];

// const Order = () => {
//     return (
//         <div className='px-5 lg:px-20 mt-5'>
//             <Grid container sx={{ justifyContent: "space-between" }}>
                
//                 {/* Left Side: Filter Options */}
//                 <Grid item xs={2.5}>
//                     <div className='h-auto shadow-lg bg-white p-5 sticky top-5'>
//                         <h1 className='font-bold text-lg'>Filter</h1>
                        
//                         <div className='space-y-4 mt-10'>
//                             <h1 className='font-semibold'>ORDER STATUS</h1>
                            
//                             {orderStatus.map((option) => (
//                                 <div key={option.value} className='flex items-center'>
//                                     <input
//                                         defaultValue={option.value}
//                                         type="checkbox"
//                                         className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500'
//                                     />
//                                     <label className='ml-3 text-sm text-gray-600' htmlFor={option.value}>
//                                         {option.label}
//                                     </label>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </Grid>

//                 {/* Right Side: Rendered Order Cards */}
//                 <Grid item xs={9}>
//                     <div className='space-y-5 text-left'>
//                         {/* Dummy array to map multiple order cards for now */}
//                         {[1,1,1,1].map((item, index) => <OrderCard key={index} />)}
//                     </div>
//                 </Grid>

//             </Grid>
//         </div>
//     );
// };

// export default Order;



import React, { useEffect, useState } from 'react';
import OrderCard from './OrderCard';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderHistory } from '../../../State/Order/Action';

const orderStatus = [
    { label: "On The Way", value: "on_the_way" },
    { label: "Delivered", value: "delivered" },
    { label: "Cancelled", value: "cancelled" },
    { label: "Returned", value: "returned" },
];



const Order = () => {

    const dispatch = useDispatch();
    const { order } = useSelector(store => store);
    
    // 1. Create a state array to remember which boxes are checked
    const [selectedStatuses, setSelectedStatuses] = useState([]);

    // 2. Function to add or remove a status when a box is clicked
    const handleFilterChange = (e) => {
        const value = e.target.value.toUpperCase(); // Convert to uppercase to match backend (e.g., "DELIVERED")
        
        if (e.target.checked) {
            // Add to array if checked
            setSelectedStatuses([...selectedStatuses, value]);
        } else {
            // Remove from array if unchecked
            setSelectedStatuses(selectedStatuses.filter((status) => status !== value));
        }
    };

    useEffect(() => {
        dispatch(getOrderHistory());
    }, [dispatch]);

    // 3. Sort AND Filter the orders before rendering!
    const filteredAndSortedOrders = [...(order.orders || [])]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .filter((orderItem) => {
            // If no boxes are checked, show everything
            if (selectedStatuses.length === 0) return true;
            
            // "ON_THE_WAY" is a special UI filter that usually represents multiple backend states
            if (selectedStatuses.includes("ON_THE_WAY")) {
                if (["PLACED", "CONFIRMED", "SHIPPED", "PENDING"].includes(orderItem.orderStatus)) return true;
            }
            
            // Otherwise, check if the order's status matches any of our checked boxes
            return selectedStatuses.includes(orderItem.orderStatus);
        });

    return (
        <div className='px:5 lg:px-20'>
            <div className='mui-grid-container-div' style={{ justifyContent: "space-between" }}>
                
                {/* Left Sidebar: Filters */}
                <div className='mui-grid-item-div mui-col-xs-2-5'>
                    <div className='h-auto shadow-lg bg-white p-5 sticky top-5'>
                        <h1 className='font-bold text-lg'>Filter</h1>
                        <div className='space-y-4 mt-10'>
                            <h1 className='font-semibold'>ORDER STATUS</h1>
                            {orderStatus.map((option) => (
                                <div key={option.value} className='flex items-center'>
                                    <input 
                                        defaultValue={option.value} 
                                        type="checkbox" 
                                        onChange={handleFilterChange} // <--- ADD THIS LINE
                                        className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500' 
                                    />
                                    <label className='ml-3 text-sm text-gray-600' htmlFor={option.value}>
                                        {option.label}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Main Area: Dynamic Order Cards */}
                <div className='mui-grid-item-div mui-col-xs-9'>
                    <div className='space-y-5'>
                        {/* CHANGE this to map over filteredAndSortedOrders */}
                        {filteredAndSortedOrders.map((orderItem) => (
                            <OrderCard key={orderItem.id} order={orderItem} />
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Order;





// import { Grid } from '@mui/material';
// import React from 'react';
// import OrderCard from './OrderCard';

// const orderStatus = [
//     { label: "On The Way", value: "on_the_way" },
//     { label: "Delivered", value: "delivered" },
//     { label: "Cancelled", value: "cancelled" },
//     { label: "Returned", value: "returned" },
// ];

// const Order = () => {
//     return (
//         <div className='px-5 lg:px-20 mt-5'>
//             {/* Removed justifyContent="space-between" and added a standard spacing gap */}
//             <Grid container spacing={5}>
                
//                 {/* Left Side: Filter Options (3 out of 12 columns) */}
//                 <Grid item xs={12} lg={3} className="text-left">
//                     <div className='h-auto shadow-lg bg-white p-5 sticky top-5'>
//                         <h1 className='font-bold text-lg'>Filter</h1>
                        
//                         <div className='space-y-4 mt-10'>
//                             <h1 className='font-semibold'>ORDER STATUS</h1>
                            
//                             {orderStatus.map((option) => (
//                                 <div key={option.value} className='flex items-center'>
//                                     <input
//                                         defaultValue={option.value}
//                                         type="checkbox"
//                                         className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500'
//                                     />
//                                     <label className='ml-3 text-sm text-gray-600' htmlFor={option.value}>
//                                         {option.label}
//                                     </label>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </Grid>

//                 {/* Right Side: Rendered Order Cards (9 out of 12 columns) */}
//                 <Grid item xs={12} lg={9} className="text-left">
//                     <div className='space-y-5 w-full'>
//                         {/* Dummy array to map multiple order cards for now */}
//                         {[1, 1, 1, 1].map((item, index) => <OrderCard key={index} />)}
//                     </div>
//                 </Grid>

//             </Grid>
//         </div>
//     );
// };

// export default Order;