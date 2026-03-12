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




import React from 'react';
import OrderCard from './OrderCard';

const orderStatus = [
    { label: "On The Way", value: "on_the_way" },
    { label: "Delivered", value: "delivered" },
    { label: "Cancelled", value: "cancelled" },
    { label: "Returned", value: "returned" },
];

const Order = () => {
    return (
        <div className='px-5 lg:px-20 mt-5'>
            {/* Tailwind Grid Container */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                
                {/* Left Side: Filter Options (Takes up 3/12 columns on large screens) */}
                <div className="col-span-1 lg:col-span-3 text-left">
                    <div className='h-auto shadow-lg bg-white p-5 sticky top-5'>
                        <h1 className='font-bold text-lg'>Filter</h1>
                        
                        <div className='space-y-4 mt-10'>
                            <h1 className='font-semibold'>ORDER STATUS</h1>
                            
                            {orderStatus.map((option) => (
                                <div key={option.value} className='flex items-center'>
                                    <input
                                        defaultValue={option.value}
                                        type="checkbox"
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

                {/* Right Side: Rendered Order Cards (Takes up 9/12 columns on large screens) */}
                <div className="col-span-1 lg:col-span-9 text-left">
                    <div className='space-y-5'>
                        {/* Dummy array to map multiple order cards for now */}
                        {[1, 1, 1, 1].map((item, index) => <OrderCard key={index} />)}
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