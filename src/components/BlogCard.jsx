import React from 'react'

function BlogCard({image , heading, title , className}) {
  return (
    <div className={`flex flex-col py-4 px-3 justify-center mx-auto items-center gap-3 max-w-98 hover:scale-101 transition duration-300 ease-in-out cursor-pointer bg-white ${className}`} >
        <div className='overflow-hidden w-full h-64 rounded-t-3xl'
       style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >

        </div>
        <div className='flex flex-col gap-2 items-center w-full text-center font-jakrta py-5'>
            <h2 className='text-one text-gray leading-[120%] tracking-tight font-medium'>{heading}</h2>
            <h1 className='text-brown text-one_three_seven_five font-semibold leading-[120%] tracking-zero-zero_two_five'>{title}</h1>
        </div>

    </div>
  )
}

export default BlogCard