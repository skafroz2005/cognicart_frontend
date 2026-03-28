import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { mainCarouselData } from './MainCarouselData';

const MainCarousel = () => {
    // Transform the data into image elements
        const items = mainCarouselData.map((item) => 
            <img 
                className='mx-auto cursor-pointer -z-10 flex justify-center items-center w-full object-cover'
                style={{ maxHeight: '500px' }}
                role='presentation' 
                src={item.image} 
                alt="" 
            />
        );

    return (
        <div className="rounded-2xl overflow-hidden mx-4 lg:mx-8 mt-4 shadow-md">
            <AliceCarousel
                items={items}
                disableButtonsControls
                disableDotsControls
                autoPlay
                autoPlayInterval={1000}
                infinite
            />
        </div>
    );
};

export default MainCarousel;