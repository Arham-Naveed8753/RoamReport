import React from 'react'
import { Link } from 'react-router-dom'
import service from '../appwrite/config'

function PostCard({
    featureImage, heading, title, className, $id , altText = 'error' , 
}) {
    console.log(featureImage , heading , title , className ,$id , altText)
    return (
        <Link to={`/post/${$id}`} className='cursor-pointer'>
            <div className={`flex flex-col rounded-t-3xl justify-center mx-auto items-center gap-3 max-w-98 hover:scale-101 transition duration-300 ease-in-out  bg-white ${className}`} >
                <div className='overflow-hidden w-full h-64 rounded-t-3xl'>
                    <img className='w-full object-cover object-center' src={service.filePreview(featureImage)} alt={altText} />
                </div>
                <div className='flex flex-col  gap-2 items-center w-full text-center font-jakrta '>
                    <h2 className='text-eight_seven_five text-gray leading-[120%] tracking-tight font-medium pt-3'>{heading}</h2>
                    <h1 className='text-brown text-one_five font-semibold leading-[120%] tracking-zero-zero_two_five pb-5'>{title}</h1>
                </div>

            </div>
        </Link>
    )
}

export default PostCard