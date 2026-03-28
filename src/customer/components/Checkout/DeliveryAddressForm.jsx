// import { Box, Button, TextField } from '@mui/material';
// // import React from 'react';
// import AddressCard from '../AddressCard/AddressCard';
// import { useDispatch, useSelector } from 'react-redux'
// import { createOrder } from '../../../State/Order/Action'
// import { useNavigate } from 'react-router-dom'

// const DeliveryAddressForm = () => {

//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const { auth } = useSelector(store => store);

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const data = new FormData(e.currentTarget);

//         const address = {
//             firstName: data.get("firstName"),
//             lastName: data.get("lastName"),
//             streetAddress: data.get("address"),
//             city: data.get("city"),
//             state: data.get("state"),
//             zipCode: data.get("zip"),
//             mobile: data.get("phoneNumber")
//         }
//         const orderData = { address, navigate }

//         // Dispatch the action to create the order in the backend
//         dispatch(createOrder(orderData));
//         console.log("address submitted: ", address);
//     }

//     return (
//         <div className="mt-5">
//             {/* Main Layout Grid */}
//             <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

//                 {/* Left Side: Saved Addresses */}
//                 <div className='col-span-1 lg:col-span-5 border rounded-md shadow-md h-[30.5rem] overflow-y-scroll'>
//                     {/* Added 'text-left' right here to force the alignment back */}
//                     <div className='p-5 py-7 border-b cursor-pointer'>
//                         {auth.user?.address?.length > 0 ? (
//                             auth.user.address.map((item) => (
//                                 <div key={item.id} className="mb-4">
//                                     <AddressCard address={item} />
//                                     <Button /*onClick={() => dispatch(createOrder({ address: item, navigate }))}*/
//                                         sx={{ mt: 2, bgcolor: 'RGB(145 85 253)' }} size='large' variant='contained'>
//                                         Deliver Here
//                                     </Button>
//                                 </div>
//                             ))
//                         ) : (
//                             <p className="text-gray-500 font-semibold text-center mt-10">
//                                 No saved addresses found. Please add a new delivery address.
//                             </p>
//                         )}
//                     </div>
//                 </div>

//                 {/* Right Side: New Address Form (Takes up 7/12 columns on large screens) */}
//                 <div className='col-span-1 lg:col-span-7'>
//                     <Box className="border rounded-md shadow-md p-5">
//                         <form onSubmit={handleSubmit}>

//                             {/* Inner Form Grid */}
//                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                                 <div>
//                                     <TextField required id="firstName" name="firstName" label="First Name" fullWidth autoComplete="given-name" />
//                                 </div>
//                                 <div>
//                                     <TextField required id="lastName" name="lastName" label="Last Name" fullWidth autoComplete="family-name" />
//                                 </div>
//                                 <div className="sm:col-span-2">
//                                     <TextField required id="address" name="address" label="Address" fullWidth autoComplete="shipping address" multiline rows={4} />
//                                 </div>
//                                 <div>
//                                     <TextField required id="city" name="city" label="City" fullWidth autoComplete="shipping address-level2" />
//                                 </div>
//                                 <div>
//                                     <TextField required id="state" name="state" label="State/Province/Region" fullWidth />
//                                 </div>
//                                 <div>
//                                     <TextField required id="zip" name="zip" label="Zip / Postal code" fullWidth autoComplete="shipping postal-code" />
//                                 </div>
//                                 <div>
//                                     <TextField required id="phoneNumber" name="phoneNumber" label="Phone Number" fullWidth autoComplete="tel" />
//                                 </div>
//                                 <div className="sm:col-span-2">
//                                     <Button sx={{ py: 1.5, mt: 2, bgcolor: 'RGB(145 85 253)' }} size='large' variant='contained' type="submit">
//                                         Deliver Here
//                                     </Button>
//                                 </div>
//                             </div>

//                         </form>
//                     </Box>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default DeliveryAddressForm;

















import { Box, Button, TextField } from '@mui/material';
import AddressCard from '../AddressCard/AddressCard';
import { useDispatch, useSelector } from 'react-redux'
import { createOrder } from '../../../State/Order/Action'
import { useNavigate } from 'react-router-dom'

const DeliveryAddressForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { auth } = useSelector(store => store);

    // Method 1: Handles the Right Side (Creating a completely NEW address)
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);

        const address = {
            firstName: data.get("firstName"),
            lastName: data.get("lastName"),
            streetAddress: data.get("address"),
            city: data.get("city"),
            state: data.get("state"),
            zipCode: data.get("zip"),
            mobile: data.get("phoneNumber")
        }
        
        const orderData = { address, navigate }
        dispatch(createOrder(orderData));
        console.log("New address submitted: ", address);
    }

    // Method 2: Handles the Left Side (Using a SAVED address)
    const handleCreateOrderWithSavedAddress = (savedAddress) => {
        
        // Strip away ONLY the 'user' property that crashes the backend.
        // Keep the 'id' so the backend knows this address already exists!
        const cleanAddress = {
            id: savedAddress.id,         // <--- ADD THIS LINE BACK IN
            firstName: savedAddress.firstName,
            lastName: savedAddress.lastName,
            streetAddress: savedAddress.streetAddress,
            city: savedAddress.city,
            state: savedAddress.state,
            zipCode: savedAddress.zipCode,
            mobile: savedAddress.mobile
        }

        const orderData = { address: cleanAddress, navigate }
        dispatch(createOrder(orderData));
        console.log("Cleaned saved address submitted: ", cleanAddress);
    }

    return (
        <div className="mt-5">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

                {/* Left Side: Saved Addresses */}
                <div className='col-span-1 lg:col-span-5 border border-gray-100 rounded-2xl shadow-sm bg-white h-[30.5rem] overflow-y-scroll'>
                    <div className='p-5 py-7 border-b cursor-pointer'>
                        {auth.user?.address?.length > 0 ? (
                            auth.user.address.map((item) => (
                                <div key={item.id} className="mb-4">
                                    <AddressCard address={item} />
                                    {/* Call the new method here, passing the specific item */}
                                    <Button 
                                        onClick={() => handleCreateOrderWithSavedAddress(item)} 
                                        sx={{ mt: 2, bgcolor: 'RGB(145 85 253)' }} 
                                        size='large' 
                                        variant='contained'
                                    >
                                        Deliver Here
                                    </Button>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 font-semibold text-center mt-10">
                                No saved addresses found. Please add a new delivery address.
                            </p>
                        )}
                    </div>
                </div>

                {/* Right Side: New Address Form */}
                <div className='col-span-1 lg:col-span-7'>
                    <Box className="border border-gray-100 rounded-2xl shadow-sm bg-white p-6">
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div><TextField required id="firstName" name="firstName" label="First Name" fullWidth autoComplete="given-name" /></div>
                                <div><TextField required id="lastName" name="lastName" label="Last Name" fullWidth autoComplete="family-name" /></div>
                                <div className="sm:col-span-2"><TextField required id="address" name="address" label="Address" fullWidth autoComplete="shipping address" multiline rows={4} /></div>
                                <div><TextField required id="city" name="city" label="City" fullWidth autoComplete="shipping address-level2" /></div>
                                <div><TextField required id="state" name="state" label="State/Province/Region" fullWidth /></div>
                                <div><TextField required id="zip" name="zip" label="Zip / Postal code" fullWidth autoComplete="shipping postal-code" /></div>
                                <div><TextField required id="phoneNumber" name="phoneNumber" label="Phone Number" fullWidth autoComplete="tel" /></div>
                                <div className="sm:col-span-2">
                                    <Button sx={{ py: 1.5, mt: 2, bgcolor: 'RGB(145 85 253)' }} size='large' variant='contained' type="submit">
                                        Deliver Here
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </Box>
                </div>
            </div>
        </div>
    );
};

export default DeliveryAddressForm;