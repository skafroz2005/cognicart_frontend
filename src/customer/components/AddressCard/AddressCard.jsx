import React from 'react'

function AddressCard({address}) {
  return (
    <div>
      <div className='space-y-1'>
      <p className='font-semibold'>{address?.firstName+" "+address?.lastName}</p>
      <p>{address?.streetAddress},{address?.city},{address?.postalCode}</p>
      <div className='space-y-1'>
      <p className='text-sm'>State - {address?.state}</p>
      <p className='text-sm'>Phone - {address?.mobile}</p>
      </div>
    </div>
    </div>
  )
}

export default AddressCard