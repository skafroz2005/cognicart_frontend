import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Admin from '../Admin/Admin'

const AdminRouters = () => {
  return (
    <div>
        <Routes>
            {/* The /* means it will catch /admin and anything that comes after it */}
            <Route path="/*" element={<Admin />}></Route>
        </Routes>
    </div>
  )
}

export default AdminRouters