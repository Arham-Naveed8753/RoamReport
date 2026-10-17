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
        <Hero/>
        <Featured/>
        <LatestArticles/>
        <Upcoming />
        <BeforeFooter className={`relative w-full`} imgAtributes={`w-full`} img={patch}/>
    </header>
  )
}

export default Home