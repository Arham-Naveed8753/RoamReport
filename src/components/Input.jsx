import React, { forwardRef, useId } from 'react'

const Input = forwardRef( function Input(
{ 
     label ,
    type = 'text',
    className = '' ,
   
    ...props
} , ref
)
{
    const id = useId()
    return (
        <div>
            {label && 
            <label
            className='block text-one_eight_seven_five font-medium text-brown mb-1'
            htmlFor={id}

            >
                {label}
            </label>}
            <input 
            type= {type} 
            className={`${className}`}
            id={id}
            ref={ref}
            {...props}
            
            />
        </div>
    )

} )

export default Input