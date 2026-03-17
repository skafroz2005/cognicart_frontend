import { useEffect, useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import { Box, Button, Grid, LinearProgress, Rating } from '@mui/material'
import ProductReviewCard from './ProductReviewCard'
import HomeSectionCard from '../HomeSectionCard/HomeSectionCard'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { findProductsById } from '../../../State/Product/Action'
import { addItemToCart } from '../../../State/Cart/Action'
import { api } from '../../../config/apiConfig';
import { mens_kurta } from '../../../Data/mens_kurta'


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ProductDetails() {
    const [selectedSize, setSelectedSize] = useState("")
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();
    const { products } = useSelector(store => store);

    const [activeImage, setActiveImage] = useState(null);//added by me
    const [similarProducts, setSimilarProducts] = useState([]);

    // Fetch the specific product details when the component loads
    useEffect(() => {
        const data = { productId: params.productId }
        dispatch(findProductsById(data))
    }, [params.productId, dispatch])

    const handleAddToCart = () => {
        // Package the product ID and the selected size before sending to the backend
        const data = { productId: params.productId, size: selectedSize.name }
        console.log("Adding to cart - ", data);
        dispatch(addItemToCart(data))
        navigate("/cart")
    }


    // 2. Fetch similar products (By Category AND Tags)
    useEffect(() => {
        const fetchSimilarProducts = async () => {
            const currentProduct = products.product;
            if (!currentProduct) return;

            try {
                let combinedResults = [];

                // --- A. Fetch by Category ---
                if (currentProduct.category?.name) {
                    const categoryRes = await api.get(`/api/products?category=${currentProduct.category.name}&pageSize=10`);
                    const categoryData = categoryRes.data.content || categoryRes.data;
                    combinedResults = [...combinedResults, ...categoryData];
                }

                // --- B. Fetch by Tags ---
                // Assuming your backend returns tags as an array (e.g., ["cotton", "summer"])
                // We use your existing search endpoint to find products matching these keywords
                if (currentProduct.tags && Array.isArray(currentProduct.tags)) {
                    // Grab up to 2 tags to prevent overloading the backend with too many requests
                    const topTags = currentProduct.tags.slice(0, 2); 
                    
                    const tagPromises = topTags.map(tag => 
                        api.get(`/api/products/search?q=${tag}`)
                    );
                    
                    // Wait for all tag searches to finish
                    const tagResponses = await Promise.all(tagPromises);
                    tagResponses.forEach(res => {
                        const tagData = res.data.content || res.data;
                        combinedResults = [...combinedResults, ...tagData];
                    });
                }

                // --- C. Merge, Deduplicate, and Filter ---
                // 1. Map trick to remove duplicates (if a product matched both the category AND the tag)
                const uniqueProductsMap = new Map(combinedResults.map(item => [item.id, item]));
                const uniqueProducts = Array.from(uniqueProductsMap.values());

                // 2. Filter out the current product so the user doesn't see what they are already looking at
                const finalSimilarProducts = uniqueProducts.filter(item => item.id !== currentProduct.id);

                // Update the state!
                setSimilarProducts(finalSimilarProducts);

            } catch (error) {
                console.error("Failed to fetch similar products by category and tags", error);
            }
        };

        fetchSimilarProducts();
    }, [products.product]); // Re-run whenever the main product changes



    // --- DYNAMIC RATING & REVIEW LOGIC ---
    const ratingsArray = products.product?.ratings || [];
    const totalReviews = products.product?.reviews?.length || 0;
    const totalRatings = ratingsArray.length;
    
    // Average Star Rating
    const averageRating = totalRatings > 0 
        ? ratingsArray.reduce((acc, curr) => acc + curr.rating, 0) / totalRatings 
        : 0;

    // Progress Bar Percentages (Counts how many of each star exist, divided by total, multiplied by 100)
    const excellentPercent = totalRatings > 0 ? (ratingsArray.filter(r => r.rating === 5).length / totalRatings) * 100 : 0;
    const veryGoodPercent = totalRatings > 0 ? (ratingsArray.filter(r => r.rating === 4).length / totalRatings) * 100 : 0;
    const goodPercent = totalRatings > 0 ? (ratingsArray.filter(r => r.rating === 3).length / totalRatings) * 100 : 0;
    const averagePercent = totalRatings > 0 ? (ratingsArray.filter(r => r.rating === 2).length / totalRatings) * 100 : 0;
    const poorPercent = totalRatings > 0 ? (ratingsArray.filter(r => r.rating === 1).length / totalRatings) * 100 : 0;


    return (
        <div className="bg-white lg:px-20">
            <div className="pt-6">
                <nav aria-label="Breadcrumb">
                    <ol className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                        <li className="text-sm">
                            <a href={products.product?.href} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                                {products.product?.title}
                            </a>
                        </li>
                    </ol>
                </nav>

                <section className='grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10 px-4 pt-10'>
                    {/* Image gallery */}
                    {/* <div className="flex flex-col items-center">
                        <div className="overflow-hidden rounded-lg max-w-[30rem] max-h-[35rem]">
                            <img
                                src={activeImage || products.product?.imageUrl} //change by me
                                alt={products.product?.title}
                                className="h-full w-full object-cover object-center"
                            />
                        </div>
                        <div className="flex flex-wrap space-x-5 justify-center mt-4"> */}
                    {/* Note: The tutorial skips mapping multiple dynamic images here to save time, 
                   but you could map over products.product.images if your backend supports it */}
                    {/* <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg max-w-[5rem] max-h-[5rem]">
                                <img
                                    src={products.product?.imageUrl}
                                    alt={products.product?.title}
                                    className="h-full w-full object-cover object-center"
                                />
                            </div>
                        </div>
                    </div> */}


                    <div className="flex flex-col items-center">  {/* change by me */}
                        {/* Main Big Image */}
                        <div className="overflow-hidden rounded-lg max-w-[30rem] max-h-[35rem]">
                            <img
                                src={activeImage || products.product?.imageUrl} // Changes when a thumbnail is clicked
                                alt={products.product?.title}
                                className="h-full w-full object-cover object-center"
                            />
                        </div>

                        {/* Thumbnail Row */}
                        <div className="flex flex-wrap space-x-5 justify-center mt-4">

                            {/* 1. Render the primary imageUrl as the first thumbnail */}
                            <div
                                onClick={() => setActiveImage(products.product?.imageUrl)}
                                className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg max-w-[5rem] max-h-[5rem] cursor-pointer"
                            >
                                <img
                                    src={products.product?.imageUrl}
                                    alt={products.product?.title}
                                    className="h-full w-full object-cover object-center"
                                />
                            </div>

                            {/* 2. Map through the new images array from the backend to render the rest */}
                            {products.product?.images?.map((item, index) => (
                                <div
                                    key={index}
                                    onClick={() => setActiveImage(item)}
                                    className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg max-w-[5rem] max-h-[5rem] cursor-pointer"
                                >
                                    <img
                                        src={item}
                                        alt={`gallery-${index}`}
                                        className="h-full w-full object-cover object-center"
                                    />
                                </div>
                            ))}

                        </div>
                    </div>


                    {/* Product info */}
                    <div className="lg:col-span-1 ma-auto max-w-2xl px-4 pb-16 sm:px-6 lg:max-w-7xl lg:px-8 lg:pb-24">
                        <div className="lg:col-span-2">
                            <h1 className="text-lg lg:text-xl font-semibold text-gray-900">
                                {products.product?.brand}
                            </h1>
                            <h1 className='text-lg lg:text-xl text-gray-900 opacity-60 pt-1'>
                                {products.product?.title}
                            </h1>
                        </div>

                        {/* Options */}
                        <div className="mt-4 lg:row-span-3 lg:mt-0">
                            <h2 className="sr-only">Product information</h2>
                            <div className='flex space-x-5 items-center text-lg lg:text-xl text-gray-900 mt-6'>
                                <p className='font-semibold'>₹{products.product?.discountedPrice}</p>
                                <p className='opacity-50 line-through'>₹{products.product?.price}</p>
                                <p className='text-green-600 font-semibold'>{products.product?.discountPercent}% Off</p>
                            </div>

                            {/* Reviews */}
                            <div className="mt-6">
                                <div className='flex items-center space-x-3'>
                                    {/* 1. Use the calculated average rating */}
                                    <Rating name="read-only" value={averageRating} readOnly precision={0.5} />
                                    
                                    {/* 2. Show the total number of ratings */}
                                    <p className='opacity-50 text-sm'>{totalRatings} Ratings</p>
                                    
                                    {/* 3. Show the total number of reviews */}
                                    <p className='ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500'>
                                        {totalReviews} Reviews
                                    </p>
                                </div>
                            </div>

                            <form className="mt-10">
                                {/* Sizes */}

                                {/* <div className="mt-10">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-sm font-medium text-gray-900">Size</h3>
                                    </div>

                                    <RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-4">
                                        <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
                                        <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                                            {products.sizes.map((size) => (
                                                <RadioGroup.Option
                                                    key={size.name}
                                                    value={size}
                                                    disabled={!size.inStock}
                                                    className={({ active }) =>
                                                        classNames(
                                                            size.inStock
                                                                ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                                                                : 'cursor-not-allowed bg-gray-50 text-gray-200',
                                                            active ? 'ring-2 ring-indigo-500' : '',
                                                            'group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6'
                                                        )
                                                    }
                                                >
                                                    {({ active, checked }) => (
                                                        <>
                                                            <RadioGroup.Label as="span">{size.name}</RadioGroup.Label>
                                                            {size.inStock ? (
                                                                <span
                                                                    className={classNames(
                                                                        active ? 'border' : 'border-2',
                                                                        checked ? 'border-indigo-500' : 'border-transparent',
                                                                        'pointer-events-none absolute -inset-px rounded-md'
                                                                    )}
                                                                    aria-hidden="true"
                                                                />
                                                            ) : (
                                                                <span
                                                                    aria-hidden="true"
                                                                    className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                                                >
                                                                    <svg
                                                                        className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                                                        viewBox="0 0 100 100"
                                                                        preserveAspectRatio="none"
                                                                        stroke="currentColor"
                                                                    >
                                                                        <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                                                                    </svg>
                                                                </span>
                                                            )}
                                                        </>
                                                    )}
                                                </RadioGroup.Option>
                                            ))}
                                        </div>
                                    </RadioGroup>
                                </div> */}

                                <div className="mt-10">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-sm font-medium text-gray-900">Size</h3>
                                    </div>

                                    <RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-4">
                                        <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
                                        <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                                            {products.product?.sizes?.map((size) => (
                                                <RadioGroup.Option
                                                    key={size.name}
                                                    value={size}
                                                    disabled={size.quantity === 0}
                                                    className={({ active }) =>
                                                        classNames(
                                                            size.quantity > 0
                                                                ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                                                                : 'cursor-not-allowed bg-gray-50 text-gray-200',
                                                            active ? 'ring-2 ring-indigo-500' : '',
                                                            'group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6'
                                                        )
                                                    }
                                                >
                                                    {({ active, checked }) => (
                                                        <>
                                                            <RadioGroup.Label as="span">{size.name}</RadioGroup.Label>
                                                            {size.quantity > 0 ? (
                                                                <span
                                                                    className={classNames(
                                                                        active ? 'border' : 'border-2',
                                                                        checked ? 'border-indigo-500' : 'border-transparent',
                                                                        'pointer-events-none absolute -inset-px rounded-md'
                                                                    )}
                                                                    aria-hidden="true"
                                                                />
                                                            ) : (
                                                                <span
                                                                    aria-hidden="true"
                                                                    className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                                                >
                                                                    <svg
                                                                        className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                                                        viewBox="0 0 100 100"
                                                                        preserveAspectRatio="none"
                                                                        stroke="currentColor"
                                                                    >
                                                                        <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                                                                    </svg>
                                                                </span>
                                                            )}
                                                        </>
                                                    )}
                                                </RadioGroup.Option>
                                            ))}
                                        </div>
                                    </RadioGroup>
                                </div>

                                <Button onClick={handleAddToCart} color='secondary' variant='contained' sx={{ px: "2rem", py: "1rem", bgcolor: "#9155fd", mt: "2rem" }}>
                                    Add to Cart
                                </Button>
                            </form>
                        </div>

                        <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                            {/* Description and details */}
                            <div>
                                <h3 className="sr-only">Description</h3>
                                <div className="space-y-6">
                                    <p className="text-base text-gray-900">{products.product?.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Rating and Reviews (Kept Static for Now) */}
                {/* Rating and Reviews Section */}
                <section className='px-4 lg:px-20'>
                    <h1 className='font-semibold text-lg pb-4'>Recent Review & Rating</h1>
                    <div className='border p-5'>
                        <Grid container spacing={7}>
                            {/* Inside the Grid for Reviews & Ratings */}
                            <Grid item xs={12} lg={7}>
                                <div className='space-y-5'>

                                    {/* Check if the product has reviews, then map over them! */}
                                    {/* Pass the ratings array down to the card as well! */}
                                    {products.product?.reviews?.map((review) => (
                                        <ProductReviewCard 
                                            key={review.id} 
                                            item={review} 
                                            ratings={products.product?.ratings} 
                                        />
                                    ))}
                                </div>
                            </Grid>

                            <Grid item xs={12} md={5}>
                                <h1 className='text-xl font-semibold pb-2'>Product Ratings</h1>
                                <div className='flex items-center space-x-3'>
                                    {/* 1. Dynamic Overall Stars */}
                                    <Rating value={averageRating} precision={0.5} readOnly />
                                    <p className='opacity-60'>{totalRatings} Ratings</p>
                                </div>

                                <Box className="mt-5 space-y-3">
                                    {/* Excellent (5 Stars) */}
                                    <Grid container alignItems="center" gap={2}>
                                        <Grid item xs={2}><p>Excellent</p></Grid>
                                        <Grid item xs sx={{ flex: 1 }}>
                                            <LinearProgress
                                                variant="determinate"
                                                value={excellentPercent} // Dynamic!
                                                color="success"
                                                sx={{ bgcolor: "#d0d0d0", borderRadius: 4, height: 7 }}
                                            />
                                        </Grid>
                                    </Grid>

                                    {/* Very Good (4 Stars) */}
                                    <Grid container alignItems="center" gap={2}>
                                        <Grid item xs={2}><p>Very Good</p></Grid>
                                        <Grid item xs sx={{ flex: 1 }}>
                                            <LinearProgress
                                                variant="determinate"
                                                value={veryGoodPercent} // Dynamic!
                                                color="success"
                                                sx={{ bgcolor: "#d0d0d0", borderRadius: 4, height: 7 }}
                                            />
                                        </Grid>
                                    </Grid>

                                    {/* Good (3 Stars) */}
                                    <Grid container alignItems="center" gap={2}>
                                        <Grid item xs={2}><p>Good</p></Grid>
                                        <Grid item xs sx={{ flex: 1 }}>
                                            <LinearProgress
                                                variant="determinate"
                                                value={goodPercent} // Dynamic!
                                                color="info"
                                                sx={{
                                                    bgcolor: "#d0d0d0",
                                                    borderRadius: 4,
                                                    height: 7,
                                                    "& .MuiLinearProgress-bar": { bgcolor: "#2196f3" }
                                                }}
                                            />
                                        </Grid>
                                    </Grid>

                                    {/* Average (2 Stars) */}
                                    <Grid container alignItems="center" gap={2}>
                                        <Grid item xs={2}><p>Average</p></Grid>
                                        <Grid item xs sx={{ flex: 1 }}>
                                            <LinearProgress
                                                variant="determinate"
                                                value={averagePercent} // Dynamic!
                                                color="warning"
                                                sx={{
                                                    bgcolor: "#d0d0d0",
                                                    borderRadius: 4,
                                                    height: 7,
                                                    "& .MuiLinearProgress-bar": { bgcolor: "#ff9800" }
                                                }}
                                            />
                                        </Grid>
                                    </Grid>

                                    {/* Poor (1 Star) */}
                                    <Grid container alignItems="center" gap={2}>
                                        <Grid item xs={2}><p>Poor</p></Grid>
                                        <Grid item xs sx={{ flex: 1 }}>
                                            <LinearProgress
                                                variant="determinate"
                                                value={poorPercent} // Dynamic!
                                                color="error"
                                                sx={{
                                                    bgcolor: "#d0d0d0",
                                                    borderRadius: 4,
                                                    height: 7,
                                                    "& .MuiLinearProgress-bar": { bgcolor: "#f44336" }
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Grid>
                            
                        </Grid>
                    </div>
                </section>

                {/* Similar Products */}
                <section className='pt-10'>
                    <h1 className='py-5 text-xl font-bold'>Similar Products</h1>
                    <div className='flex flex-wrap space-y-5 justify-center gap-4'>
                        
                        {/* 3. Filter out the currently viewed product, then map the rest! */}
                        {similarProducts
                            ?.filter((item) => item.id !== products.product?.id)
                            .map((item) => (
                                <HomeSectionCard key={item.id} product={item} />
                            ))
                        }
                        
                    </div>
                </section>

            </div>
        </div>
    )
}

