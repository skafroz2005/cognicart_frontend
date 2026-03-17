import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { findProducts } from '../../../State/Product/Action'; // USING MAIN ACTION NOW
import ProductCard from './ProductCard';
import SearchFilter from './SearchFilter';
import { Pagination } from '@mui/material';
import { filters, singleFilter } from './FilterData'; 

const SearchResults = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const { products } = useSelector(store => store);

    const searchParams = new URLSearchParams(location.search);
    const keyword = searchParams.get("q");
    const colorValue = searchParams.get("color");
    const sizeValue = searchParams.get("size");
    const priceValue = searchParams.get("price");
    const discount = searchParams.get("discount"); // Fixed typo from 'disccout'
    const sortValue = searchParams.get("sort");
    const pageNumber = searchParams.get("page") || 1;
    const stock = searchParams.get("stock");

    useEffect(() => {
        const [minPrice, maxPrice] = priceValue === null ? [0, 100000] : priceValue.split("-").map(Number);

        const data = {
            category: "", 
            topLevelCategory: "", 
            searchQuery: keyword, // Passing the search word!
            colors: colorValue || [],
            sizes: sizeValue || [],
            minPrice,
            maxPrice,
            minDiscount: discount || 0,
            sort: sortValue || "price_low",
            pageNumber: pageNumber - 1, 
            pageSize: 10,
            stock: stock
        };

        if (keyword) {
            dispatch(findProducts(data));
        }
    }, [keyword, colorValue, sizeValue, priceValue, discount, sortValue, pageNumber, stock, dispatch]);

    const handleFilter = (value, sectionId) => {
        const searchParams = new URLSearchParams(location.search);
        let filterValue = searchParams.getAll(sectionId);

        if (filterValue.length > 0 && filterValue[0].split(",").includes(value)) {
            filterValue = filterValue[0].split(",").filter((item) => item !== value);
            if (filterValue.length === 0) {
                searchParams.delete(sectionId);
            } else {
                searchParams.set(sectionId, filterValue.join(","));
            }
        } else {
            filterValue.push(value);
            searchParams.set(sectionId, filterValue.join(","));
        }
        searchParams.set("page", 1);
        navigate({ search: `?${searchParams.toString()}` });
    };

    const handleRadioFilterChange = (e, sectionId) => {
        const searchParams = new URLSearchParams(location.search);
        searchParams.set(sectionId, e.target.value);
        searchParams.set("page", 1);
        navigate({ search: `?${searchParams.toString()}` });
    };

    const handlePaginationChange = (event, value) => {
        const searchParams = new URLSearchParams(location.search);
        searchParams.set("page", value);
        navigate({ search: `?${searchParams.toString()}` });
    };

    return (
        <div className="bg-white px-4 py-10 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-8">
                Search Results for "{keyword}"
            </h1>

            <div className="flex gap-x-8">
                {/* LEFT SIDEBAR: Filters */}
                <div className="w-1/4 hidden lg:block border-r pr-5">
                    <SearchFilter 
                        filters={filters} 
                        singleFilter={singleFilter} 
                        handleFilter={handleFilter} 
                        handleRadioFilterChange={handleRadioFilterChange} 
                    />
                </div>

                {/* RIGHT MAIN AREA: Products & Pagination */}
                <div className="flex-1">
                    {products.loading && <p>Loading your results...</p>}

                    {/* THIS IS THE CRUCIAL CHANGE: Mapping over products.products?.content */}
                    {!products.loading && products.products?.content?.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                                {products.products.content.map((item) => (
                                    <ProductCard key={item.id} product={item} />
                                ))}
                            </div>

                            <section className="w-full px-[3.6rem] mt-10 border-t pt-5">
                                <div className="px-4 py-5 flex justify-center">
                                    <Pagination
                                        /* THIS IS THE CRUCIAL CHANGE: Reading totalPages */
                                        count={products.products?.totalPages || 1}
                                        page={Number(pageNumber)}
                                        color="secondary"
                                        onChange={handlePaginationChange}
                                    />
                                </div>
                            </section>
                        </>
                    ) : (
                        !products.loading && (
                            <p className="text-gray-500 text-lg">
                                Sorry, we couldn't find any products matching your search.
                            </p>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchResults;