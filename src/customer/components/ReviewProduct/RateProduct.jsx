import { Button, Rating, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { findProductsById } from '../../../State/Product/Action';
import { api } from '../../../config/apiConfig';

const RateProduct = () => {
    const { productId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { products } = useSelector(store => store);

    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState("");

    useEffect(() => {
        // Change this line:
        // dispatch(getProductById(productId));
        
        // To this (Notice the curly braces around productId!):
        dispatch(findProductsById({ productId }));
        
    }, [productId, dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // 1. Submit the Rating
            await api.post("/api/ratings/create", { 
                productId: productId, 
                rating: rating 
            });

            // 2. Submit the Review
            await api.post("/api/reviews/create", { 
                productId: productId, 
                review: reviewText 
            });

            // 3. Navigate back to the product to see the new review!
            navigate(`/product/${productId}`);

        } catch (error) {
            console.error("Failed to submit review", error);
        }
    };

    return (
        <div className='px-5 lg:px-20 py-10'>
            <h1 className='text-xl font-bold pb-10'>Rate & Review Product</h1>
            <div className='mui-grid-container-div mui-spacing-5'>
                {/* Left Side: Product Info */}
                <div className='mui-grid-item-div mui-col-xs-12 mui-col-lg-4'>
                    <div className='border rounded-md shadow-md p-5 flex flex-col items-center'>
                        <img 
                            className='w-[15rem] h-[15rem] object-cover object-top' 
                            
                            src={products.product?.imageUrl} 
                            alt={products.product?.title} 
                        />
                        <div className='mt-5 text-center'>
                            {/* ADD THE 's' HERE */}
                            <p className='font-semibold'>{products.product?.brand}</p>
                            <p className='opacity-50'>{products.product?.title}</p>
                        </div>
                    </div>
                </div>

                {/* Right Side: The Form */}
                <div className='mui-grid-item-div mui-col-xs-12 mui-col-lg-8'>
                    <form onSubmit={handleSubmit} className='space-y-5 border rounded-md shadow-md p-5'>
                        <div>
                            <Typography component="legend">Rate This Product</Typography>
                            <Rating
                                name="simple-controlled"
                                value={rating}
                                onChange={(event, newValue) => {
                                    setRating(newValue);
                                }}
                            />
                        </div>

                        <TextField
                            label="Write a Review"
                            multiline
                            rows={4}
                            fullWidth
                            variant="outlined"
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            required
                        />

                        <Button 
                            type="submit" 
                            variant="contained" 
                            sx={{ bgcolor: "#9155fd" }}
                        >
                            Submit Review
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RateProduct;





// import { Button, Grid, Rating, TextField, Typography } from '@mui/material';
// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { findProductsById } from '../../../State/Product/Action';
// import { api } from '../../../config/apiConfig';

// const RateProduct = () => {
//     const { productId } = useParams();
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const { product } = useSelector(store => store);

//     const [rating, setRating] = useState(0);
//     const [reviewText, setReviewText] = useState("");

//     useEffect(() => {
//         dispatch(findProductsById({ productId }));
//     }, [productId, dispatch]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             // Submit Rating
//             await api.post("/api/ratings/create", { 
//                 productId: productId, 
//                 rating: rating 
//             });

//             // Submit Review
//             await api.post("/api/reviews/create", { 
//                 productId: productId, 
//                 review: reviewText 
//             });

//             // Navigate back to the product details page
//             navigate(`/product/${productId}`);

//         } catch (error) {
//             console.error("Failed to submit review", error);
//         }
//     };

//     return (
//         <div className='px-5 lg:px-20 py-10'>
//             <h1 className='text-xl font-bold pb-10'>Rate & Review Product</h1>
//             <Grid container spacing={5}>
                
//                 {/* Left Side: Product Info */}
//                 <Grid item xs={12} lg={4}>
//                     <div className='border rounded-md shadow-md p-5 flex flex-col items-center'>
//                         <img 
//                             className='w-[15rem] h-[15rem] object-cover object-top' 
//                             src={product.product?.imageUrl} 
//                             alt={product.product?.title} 
//                         />
//                         <div className='mt-5 text-center'>
//                             <p className='font-semibold'>{product.product?.brand}</p>
//                             <p className='opacity-50'>{product.product?.title}</p>
//                         </div>
//                     </div>
//                 </Grid>

//                 {/* Right Side: Form */}
//                 <Grid item xs={12} lg={8}>
//                     <form onSubmit={handleSubmit} className='space-y-5 border rounded-md shadow-md p-5'>
//                         <div>
//                             <Typography component="legend">Rate This Product</Typography>
//                             <Rating
//                                 name="simple-controlled"
//                                 value={rating}
//                                 onChange={(event, newValue) => {
//                                     setRating(newValue);
//                                 }}
//                             />
//                         </div>
//                         <TextField
//                             label="Write a Review"
//                             multiline
//                             rows={4}
//                             fullWidth
//                             variant="outlined"
//                             value={reviewText}
//                             onChange={(e) => setReviewText(e.target.value)}
//                             required
//                         />
//                         <Button type="submit" variant="contained" sx={{ bgcolor: "#9155fd" }}>
//                             Submit Review
//                         </Button>
//                     </form>
//                 </Grid>

//             </Grid>
//         </div>
//     );
// };

// export default RateProduct;