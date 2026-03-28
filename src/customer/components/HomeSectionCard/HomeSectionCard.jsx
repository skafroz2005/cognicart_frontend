
import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomeSectionCard = ({ product }) => {
    // 1. Initialize the navigate hook
    const navigate = useNavigate();

    return (
        <div 
            // 2. Add the onClick event and the cursor-pointer class!
            onClick={() => navigate(`/product/${product.id}`)}
            className='cursor-pointer flex flex-col items-center bg-white rounded-2xl shadow-sm overflow-hidden w-[15rem] mx-3 border border-gray-100 hover:shadow-lg hover:scale-[1.02] transition-all duration-300'
        >
            <div className='h-[13rem] w-[10rem] pt-4'>
                <img 
                    className='object-cover object-top w-full h-full rounded-xl' 
                    src={product.imageUrl} 
                    alt={product.title} 
                />
            </div>

            <div className='p-4 w-full text-center'>
                <h3 className='text-sm font-semibold text-gray-900 truncate'>{product.brand}</h3>
                <p className='mt-1 text-xs text-gray-500 truncate'>{product.title}</p>
            </div>
        </div>
    );
};

export default HomeSectionCard;