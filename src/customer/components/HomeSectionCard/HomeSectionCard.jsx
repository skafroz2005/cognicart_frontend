import React from 'react'

const HomeSectionCard = ({ product }) => {
  return (
    <div className='cursor-pointer flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden w-[15rem] mx-3 border border-gray-200'>
        
        <div className='h-[13rem] w-[10rem] mt-4'>
            <img 
                className='object-cover object-top w-full h-full' 
                src={product.imageUrl || product.image} 
                alt={product.title} 
            />
        </div>

        <div className='p-4 text-center'>
            <h3 className='text-lg font-medium text-gray-900'>{product.brand}</h3>
            <p className='mt-2 text-sm text-gray-500'>
                {product.title}
            </p>
        </div>

    </div>
  )
}

export default HomeSectionCard



// import React from 'react'

// const HomeSectionCard = () => {
//   return (
//     <div className='cursor-pointer flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden w-[15rem] mx-3'>
        
//         <div className='h-[13rem] w-[10rem]'>
//             <img className='object-cover object-top w-full h-full' src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200&auto=format&fit=crop" alt="" />
//         </div>

//         <div className='p-4'>
//             <h3 className='text-lg font-medium text-gray-900'>Nofilter</h3>
//             <p className='mt-2 text-sm text-gray-500'>Men Solid Pure Cotton Straight Kurta</p>
//         </div>

//     </div>
//   )
// }

// export default HomeSectionCard