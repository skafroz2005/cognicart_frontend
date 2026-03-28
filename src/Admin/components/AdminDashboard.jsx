import React from 'react'
import Achievement from './Achievement'
import MonthlyOverview from './MonthlyOverview'
import OrdersTableView from '../view/OrdersTableView'
import ProductsTableView from '../view/ProductsTableView'

const AdminDashboard = () => {
    return (
        <div className='p-6 lg:p-8 bg-[#f8fafc] min-h-screen'>
            {/* Welcome Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Dashboard</h1>
                <p className="text-sm text-gray-500 mt-1">Welcome back! Here's your store overview.</p>
            </div>

            <div className='mui-grid-container-div mui-spacing-3'>
                {/* Achievement Card */}
                <div className='mui-grid-item-div mui-col-xs-12 mui-col-md-4'>
                    <Achievement />
                </div>

                {/* Monthly Overview */}
                <div className='mui-grid-item-div mui-col-xs-12 mui-col-md-8'>
                    <MonthlyOverview />
                </div>

                {/* Recent Orders */}
                {/* <div className='mui-grid-item-div mui-col-xs-12 mui-col-md-6'>
                    <OrdersTableView />
                </div> */}

                {/* Recent Products */}
                <div className='mui-grid-item-div mui-col-xs-12 mui-col-md-12'>
                    <ProductsTableView />
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard