
import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomeSectionCard = ({ product }) => {
    // 1. Initialize the navigate hook
    const navigate = useNavigate();

    return (
        <div 
            // 2. Add the onClick event and the cursor-pointer class!
            onClick={() => navigate(`/product/${product.id}`)}
            className='cursor-pointer flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden w-[15rem] mx-3 border'
        >
            <div className='h-[13rem] w-[10rem]'>
                <img 
                    className='object-cover object-top w-full h-full' 
                    src={product.imageUrl} 
                    alt={product.title} 
                />
            </div>

            <div className='p-4'>
                <h3 className='text-lg font-medium text-gray-900'>{product.brand}</h3>
                <p className='mt-2 text-sm text-gray-500'>{product.title}</p>
            </div>
        </div>
    );
};

export default HomeSectionCard;