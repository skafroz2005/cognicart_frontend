import React from 'react'

function AddressCard({address}) {
  return (
    <div className='w-full rounded-2xl border border-gray-200 bg-white p-4 md:p-5 shadow-sm'>
      <h1 className='mb-4 text-2xl font-semibold text-gray-900'>Delivery Address</h1>
      <div className='rounded-xl bg-gray-50 px-4 py-5 md:px-8 md:py-6 text-center'>
        <p className='text-xl font-semibold text-gray-900'>
          {address?.firstName + " " + address?.lastName}
        </p>
        <p className='mt-1.5 text-sm text-gray-600'>
          {address?.streetAddress}, {address?.city}, {address?.postalCode}
        </p>
        <div className='mt-1.5 space-y-0.5'>
          <p className='text-sm text-gray-600'>State - {address?.state}</p>
          <p className='text-sm text-gray-600'>Phone - {address?.mobile}</p>
        </div>
      </div>
    </div>
  )
}

export default AddressCard