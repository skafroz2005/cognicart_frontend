import React, { useState, useRef } from 'react';
import AliceCarousel from 'react-alice-carousel';
import HomeSectionCard from '../HomeSectionCard/HomeSectionCard';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { IconButton } from '@mui/material';

const HomeSectionCarousel = ({ data, sectionName }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    
    // 1. Create a reference to attach to the carousel
    const carouselRef = useRef(null);

    const responsive = {
        0: { items: 1 },
        720: { items: 3 },
        1024: { items: 5.5 },
    };

    // 2. Use the ref to trigger the physical slide, bypassing React state delays
    const slidePrev = () => carouselRef.current?.slidePrev();
    const slideNext = () => carouselRef.current?.slideNext();

    // 3. Only use state to hide/show the buttons, not to force the slide
    const syncActiveIndex = ({ item }) => setActiveIndex(item);

    const items = data.slice(0, 10).map((item, index) => (
        <HomeSectionCard key={index} product={item} />
    ));

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 pt-6 pb-2">
                <h2 className="text-xl font-bold text-gray-900 tracking-tight">{sectionName}</h2>
            </div>
            <div className="relative p-5">
                <AliceCarousel
                    ref={carouselRef} // Attach the ref here
                    items={items}
                    disableButtonsControls
                    disableDotsControls
                    responsive={responsive}
                    onSlideChanged={syncActiveIndex}
                    // Remove the activeIndex={activeIndex} prop entirely
                />
                
                {activeIndex !== items.length - 5 && (
                    <IconButton
                        className="z-50"
                        onClick={slideNext}
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            right: '12px',
                            transform: 'translateY(-50%)',
                            bgcolor: 'rgba(255,255,255,0.95)',
                            border: '1px solid #e5e7eb',
                            width: '44px',
                            height: '44px',
                            boxShadow: '0 8px 24px rgba(15,23,42,0.12)',
                            color: '#1f2937',
                            display: { xs: 'none', md: 'flex' },
                            transition: 'all 0.2s ease',
                            '&:hover': {
                                bgcolor: '#ffffff',
                                boxShadow: '0 12px 28px rgba(15,23,42,0.16)',
                                transform: 'translateY(-50%) scale(1.05)',
                            },
                        }}
                        aria-label="next"
                    >
                        <KeyboardArrowRightIcon />
                    </IconButton>
                )}

                {activeIndex !== 0 && (
                    <IconButton
                        className="z-50"
                        onClick={slidePrev}
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '12px',
                            transform: 'translateY(-50%)',
                            bgcolor: 'rgba(255,255,255,0.95)',
                            border: '1px solid #e5e7eb',
                            width: '44px',
                            height: '44px',
                            boxShadow: '0 8px 24px rgba(15,23,42,0.12)',
                            color: '#1f2937',
                            display: { xs: 'none', md: 'flex' },
                            transition: 'all 0.2s ease',
                            '&:hover': {
                                bgcolor: '#ffffff',
                                boxShadow: '0 12px 28px rgba(15,23,42,0.16)',
                                transform: 'translateY(-50%) scale(1.05)',
                            },
                        }}
                        aria-label="previous"
                    >
                        <KeyboardArrowLeftIcon />
                    </IconButton>
                )}
            </div>
        </div>
    );
};

export default HomeSectionCarousel;