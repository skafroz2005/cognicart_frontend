// import React, { useState } from 'react';
// import AliceCarousel from 'react-alice-carousel';
// import HomeSectionCard from '../HomeSectionCard/HomeSectionCard';
// import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
// import { Button } from '@mui/material';

// const HomeSectionCarousel = ({ data, sectionName }) => {
//     // const HomeSectionCarousel = () => {
//     const [activeIndex, setActiveIndex] = useState(0);

//     // Determines how many items show on different screen sizes
//     const responsive = {
//         0: { items: 1 },
//         720: { items: 3 },
//         1024: { items: 4 },// Adjust this based on how many items you want to show on larger screens
//     };

//     // const items = mens_kurta.slice(0, 10).map((item) => <HomeSectionCard product={item} />);

//     const slidePrev = () => setActiveIndex(activeIndex - 1);
//     const slideNext = () => setActiveIndex(activeIndex + 1);

//     const syncActiveIndex = ({ item }) => setActiveIndex(item);

//     // Map the incoming data array to the HomeSectionCard component
//     const items = data.slice(0, 10).map((item, index) => (
//         <HomeSectionCard key={index} product={item} />
//     ));

//     return (
//         <div className="border">
//             <h2 className="text-2xl font-extrabold text-gray-800 py-5">{sectionName}</h2>
//             <div className="relative p-5">
//                 <AliceCarousel
//                     items={items}
//                     disableButtonsControls
//                     disableDotsControls
//                     responsive={responsive}
//                     onSlideChanged={syncActiveIndex}
//                     activeIndex={activeIndex}
//                 />

//                 {/* Custom Next Button */}
//                 {activeIndex !== items.length - 5 && (
//                     <Button
//                         variant="contained"
//                         className="z-50 bg-white"
//                         onClick={slideNext}
//                         sx={{
//                             position: 'absolute',
//                             top: '8rem',
//                             right: '0rem',
//                             transform: 'translateX(50%) rotate(90deg)',
//                             bgcolor: 'white',
//                         }}
//                         aria-label="next"
//                     >
//                         <KeyboardArrowLeftIcon sx={{ transform: 'rotate(90deg)', color: 'black' }} />
//                     </Button>
//                 )}

//                 {/* Custom Previous Button */}
//                 {activeIndex !== 0 && (
//                     <Button
//                         variant="contained"
//                         className="z-50 bg-white"
//                         onClick={slidePrev}
//                         sx={{
//                             position: 'absolute',
//                             top: '8rem',
//                             left: '0rem',
//                             transform: 'translateX(-50%) rotate(90deg)',
//                             bgcolor: 'white',
//                         }}
//                         aria-label="previous"
//                     >
//                         <KeyboardArrowLeftIcon sx={{ transform: 'rotate(-90deg)', color: 'black' }} />
//                     </Button>
//                 )}
//             </div>
//         </div>
//     );



// };

// export default HomeSectionCarousel;


import React, { useState, useRef } from 'react';
import AliceCarousel from 'react-alice-carousel';
import HomeSectionCard from '../HomeSectionCard/HomeSectionCard';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { Button } from '@mui/material';

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
        <div className="border border-black">
            <h2 className="text-2xl font-extrabold text-gray-800 py-5">{sectionName}</h2>
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
                    <Button
                        variant="contained"
                        className="z-50 bg-white"
                        onClick={slideNext}
                        sx={{
                            position: 'absolute',
                            top: '8rem',
                            right: '0rem',
                            transform: 'translateX(50%) rotate(90deg)',
                            bgcolor: 'white',
                        }}
                        aria-label="next"
                    >
                        <KeyboardArrowLeftIcon sx={{ transform: 'rotate(90deg)', color: 'black' }} />
                    </Button>
                )}

                {activeIndex !== 0 && (
                    <Button
                        variant="contained"
                        className="z-50 bg-white"
                        onClick={slidePrev}
                        sx={{
                            position: 'absolute',
                            top: '8rem',
                            left: '0rem',
                            transform: 'translateX(-50%) rotate(90deg)',
                            bgcolor: 'white',
                        }}
                        aria-label="previous"
                    >
                        <KeyboardArrowLeftIcon sx={{ transform: 'rotate(-90deg)', color: 'black' }} />
                    </Button>
                )}
            </div>
        </div>
    );
};

export default HomeSectionCarousel;