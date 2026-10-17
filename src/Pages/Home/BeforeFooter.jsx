import React from 'react'
import { Container } from '../../components'


function BeforeFooter(
    {
        className ,
        imgAtributes,
        img
    }
) {
  return (
    <div className={`${className}`}>
      <img className={` ${imgAtributes} `} src={img} alt="patch" />
    </div>
  )
}

export default BeforeFooter