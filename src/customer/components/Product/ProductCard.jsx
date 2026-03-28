import React from 'react';
import './ProductCard.css';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
    const navigate = useNavigate();

    return (
        <div 
            onClick={() => navigate(`/product/${product.id || 5}`)}
            className='productCard w-[15rem] m-3 transition-all cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100'
        >
            <div className='h-[20rem]'>
                <img 
                    className='h-full w-full object-cover object-left-top' 
                    src={product.imageUrl} 
                    alt={product.title} 
                />
            </div>
            
            <div className='textPart bg-white p-4'>
                <div>
                    <p className='font-semibold text-sm text-gray-700'>{product.brand}</p>
                    <p className='text-xs text-gray-500 truncate mt-1'>{product.title}</p>
                </div>
                <div className='flex items-center space-x-2 mt-3'>
                    <p className='font-bold text-gray-900'>₹{product.discountedPrice}</p>
                    <p className='line-through text-xs text-gray-400'>₹{product.price}</p>
                    <p className='text-green-600 text-xs font-semibold'>{product.discountPercent}% off</p>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;