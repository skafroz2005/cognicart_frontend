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
            <div className='mui-grid-container-div mui-spacing-2'>
                {/* The Achievement Card takes up 4/12 columns on large screens */}
                <div className='mui-grid-item-div mui-col-xs-12 mui-col-md-4'>
                    <div className='shadow-lg shadow-gray-600'>
                        <Achievement />
                    </div>
                </div>

                {/* The Monthly Overview Card takes up 8/12 columns on large screens */}
               <div className='mui-grid-item-div mui-col-xs-12 mui-col-md-8'>
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
                
               <div className='mui-grid-item-div mui-col-xs-12 mui-col-md-6'>
                    <div className='shadow-lg shadow-gray-600'>
                        <OrdersTableView />
                    </div>
                </div>
                

                <div className='mui-grid-item-div mui-col-xs-12 mui-col-md-6'>
                    <div className='shadow-lg shadow-gray-600'>
                        <ProductsTableView />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default AdminDashboard