import React from 'react'

function Container({children , className , ...props} ) {
  return (
    <div className={`max-w-7xl w-full mx-auto py-20 px-5 ${className}`}
    {...props}
    >
      {children}
    </div>
  )
}

export default Container