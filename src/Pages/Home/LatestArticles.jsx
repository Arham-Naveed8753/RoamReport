import React , {useState , useEffect} from 'react'
import { Container, PostCard } from '../../components'
import {BlogCard} from '../../components'
import womanWalking from '../../assets/womanWalking.jpg'
import rome from '../../assets/Rome.png'
import appwriteService from '../../appwrite/config'
import{ Articles} from '../index'





function LatestArticles() {

   

    
  return (
    <Container className={` bg-skin min-h-dvh relative flex flex-col gap-8`}>
       
        
        <Articles/>

        
    </Container>
  )
}

export default LatestArticles