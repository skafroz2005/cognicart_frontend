import React, { useEffect, useState } from 'react';
import MainCarousel from '../../components/HomeCarousel/MainCarousel';
import HomeSectionCarousel from '../../components/HomeSectionCarousel/HomeSectionCarousel';
import { api } from '../../../config/apiConfig';

const HomePage = () => {
    // 1. Create state variables to hold the dynamic data for each section
    const [mensKurta, setMensKurta] = useState([]);
    const [mensShoes, setMensShoes] = useState([]);
    const [kidsKurta, setKidsKurta] = useState([]); // Or whatever your 3rd category is

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

        // Fetch Kids Kurta (Make sure the category name matches your database exactly!)
        api.get('/api/products?category=kids_kurta&pageSize=10')
            .then((res) => {
                // Check if it's paginated (.content) or a raw list (res.data)
                const dataArray = res.data.content || res.data; 
                console.log("Kids Kurta Data:", dataArray); // Let's print it to check!
                setKidsKurta(dataArray);
            })
            .catch((err) => console.error("Failed", err));
    }, []);

    return (
        <div>
            <MainCarousel />
            
            <div className='space-y-10 py-20 flex flex-col justify-center px-5 lg:px-10'>
                {/* 3. Pass the dynamic state into your carousels! */}
                {/* We use ?.length > 0 to ensure the carousel only draws if there are actually products in that category */}
                
                {mensKurta?.length > 0 && (
                    <HomeSectionCarousel data={mensKurta} sectionName={"Men's Kurta"} />
                )}
                
                {mensShoes?.length > 0 && (
                    <HomeSectionCarousel data={mensShoes} sectionName={"Men's Shoes"} />
                )}
                
                {kidsKurta?.length > 0 && (
                    <HomeSectionCarousel data={kidsKurta} sectionName={"Kids' Kurta"} />
                )}
            </div>
        </div>
    );
};

export default HomePage;