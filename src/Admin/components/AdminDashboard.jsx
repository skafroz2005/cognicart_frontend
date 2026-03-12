import { Grid } from '@mui/material'
import React from 'react'
import Achievement from './Achievement'
import MonthlyOverview from './MonthlyOverview'
// import OrdersTable from './OrdersTable'
// import ProductsTable from './ProductsTable'
import OrdersTableView from '../view/OrdersTableView'
import ProductsTableView from '../view/ProductsTableView'

const AdminDashboard = () => {
    return (
        <div className='p-10'>
            <Grid container spacing={2}>
                {/* The Achievement Card takes up 4/12 columns on large screens */}
                <div item xs={12} md={4} >
                    <div className='shadow-lg shadow-gray-600'>
                        <Achievement />
                    </div>
                </div>

                {/* The Monthly Overview Card takes up 8/12 columns on large screens */}
               <div item xs={12} md={8}>
                    <div className='shadow-lg shadow-gray-600'>
                        {/* We will build this MonthlyOverview component next!  */}
                        <MonthlyOverview />
                    </div>
                </div>

             {/* The Products Table preview takes up the full width at the bottom  */}
                {/* <Grid item xs={12} md={6}>
                    <div className='shadow-lg shadow-gray-600'>
                         {/* Uncomment this if you want to preview the Orders Table instead 
                          <OrdersTable /> 
                    </div>
                </Grid> */}
                
               <Grid item xs={12} md={6}>
                    <div className='shadow-lg shadow-gray-600'>
                        <OrdersTableView />
                    </div>
                </Grid>
                

                <Grid item xs={12} md={6}>
                    <div className='shadow-lg shadow-gray-600'>
                        <ProductsTableView />
                    </div>
                </Grid>

            </Grid>
        </div>
    )
}

export default AdminDashboard