import React from 'react'

function Button({ 
    children,
    type = 'button' ,
    bgColor = '' ,
    text =  '' ,
    className = '' ,
    ...props
}) {
  return (
    <button 
    className={` px-3 py-2 rounded-lg  ${className} ${bgColor} ${text}  `}
    type={type}
    {...props}
    >
        {children}
    </button>
  )
}

export default Button