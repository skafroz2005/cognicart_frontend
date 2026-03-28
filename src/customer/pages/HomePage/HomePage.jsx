import React, { useEffect, useState } from 'react';
import MainCarousel from '../../components/HomeCarousel/MainCarousel';
import HomeSectionCarousel from '../../components/HomeSectionCarousel/HomeSectionCarousel';
import { api } from '../../../config/apiConfig';

const HomePage = () => {
    // 1. Create state variables to hold the dynamic data for each section
    const [mensKurta, setMensKurta] = useState([]);
    const [mensShoes, setMensShoes] = useState([]);
    const [mensShirts, setMensShirts] = useState([]);

    // 2. Fetch the data when the homepage loads
    useEffect(() => {
        // Fetch Men's Kurta (Grabbing the first 10 items)'mens_kurtas'
        api.get('/api/products?category=mens_kurtas&pageSize=10')
            .then((res) => {
                // Check if it's paginated (.content) or a raw list (res.data)
                const dataArray = res.data.content || res.data; 
                console.log("Mens Kurta Data:", dataArray); // Let's print it to check!
                setMensKurta(dataArray);
            })
            .catch((err) => console.error("Failed", err));

        // Fetch Men's Shoes
        api.get('/api/products?category=mens_shoes&pageSize=10')
            .then((res) => {
                const dataArray = res.data.content || res.data;
                console.log("Mens Shoes Data:", dataArray);
                setMensShoes(dataArray);
            })
            .catch((err) => console.error("Failed to fetch Mens Shoes", err));

        // Fetch Men's Shirts
        api.get('/api/products?category=shirt&topLevelCategory=men&pageSize=10')
            .then((res) => {
                // Check if it's paginated (.content) or a raw list (res.data)
                const dataArray = res.data.content || res.data; 
                console.log("Mens Shirts Data:", dataArray);
                setMensShirts(dataArray);
            })
            .catch((err) => console.error("Failed", err));
    }, []);

    return (
        <div className="bg-[#f8fafc] min-h-screen">
            <MainCarousel />
            
            <div className='space-y-10 py-20 flex flex-col justify-center px-5 lg:px-10'>
                {/* 3. Pass the dynamic state into your carousels! */}
                {/* We use ?.length > 0 to ensure the carousel only draws if there are actually products in that category */}
                
                {mensShirts?.length > 0 && (
                    <HomeSectionCarousel data={mensShirts} sectionName={"Men's Shirts"} />
                )}

                {mensKurta?.length > 0 && (
                    <HomeSectionCarousel data={mensKurta} sectionName={"Men's Kurta"} />
                )}
                
                {mensShoes?.length > 0 && (
                    <HomeSectionCarousel data={mensShoes} sectionName={"Men's Shoes"} />
                )}
                
                
            </div>
        </div>
    );
};

export default HomePage;