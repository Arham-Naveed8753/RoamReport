import { useState , useEffect } from "react"
import React  from 'react'
import { Container , PostCard } from "../../components"
import appwriteService from '../../appwrite/config'

function Articles() {
  const [posts , setPosts] = useState([])
  useEffect(() => {
    appwriteService.ListPosts().then((response)=> {
       if (response && response.documents) {
                setPosts(response.documents)
            }
    })
  },
[])
  return (
    <Container className={` bg-skin min-h-dvh relative flex flex-col gap-8`}>
        <h1 className='text-center text-brown text-two font-jakrta font-semibold leading-[120%] tracking-tight'>All travel stories</h1>
        <div className='grid grid-cols-1 justify-center gap-10'>
        {posts.map((post)=> (
          <div className="" key={post.$id}>
            <PostCard post={{...post}}/>
            </div>
        ))}

        </div>
    </Container>
  )
}

export default Articles