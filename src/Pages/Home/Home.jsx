import React from 'react'
import Hero from './Hero'
import Featured from './Featured'
import LatestArticles from './LatestArticles'
import Upcoming from './Upcoming'
import BeforeFooter from './BeforeFooter'

import patch from '../../assets/patch.svg'

function Home() {
  return (
    <header className='bg-light-blue '>
      {/* <div className='lg:flex '>

      <div className='lg:w-1/2'>
        <Hero className={`hidden lg:block  `}/>
      </div> */}
      {/* <div className='lg:w-1/2'> */}
        <Hero className={` `}/>
        <Featured/>
        <LatestArticles/>
        <Upcoming />
        
        {/* </div>
        </div> */}
    </header>
  )
}

export default Home