import { useState , useEffect } from "react"
import React  from 'react'
import { Container , PostCard } from "../../components"
import appwriteService from '../../appwrite/config'

function Articles() {
  const [posts , setPosts] = useState([])


useEffect(()=>{
  let isMounted = true

  appwriteService.ListPosts()
  .then((response)=>{
    if (isMounted && response && response.rows) {
      setPosts(response.rows)
      console.log(response.rows)
      console.log("Documents fetched successfully")
    }
    else if (isMounted){
      console.log("Response cameback but the documents array is empty")
    }
  }).catch((error)=>{
    console(`appwrite service error list : ${error}`)
  })

  return() => {
    isMounted = false
  };
} , [])

  const zeroPost = posts.length === 0 ? true : false

  return (
    <Container className={` bg-skin min-h-dvh relative flex flex-col gap-10 ${zeroPost ? 'items-center justify-center' : ''}`}>
        <h1 className='text-center text-brown text-two font-xanhMono font-semibold leading-[120%] tracking-tight '>All travel stories</h1>
        {zeroPost && <h1 className='text-center text-brown text-two font-xanhMono font-semibold leading-[120%] tracking-tight ]'>There are currently no posts</h1>}
        <div className='grid grid-cols-1 justify-center gap-10'>
        {posts.map((post)=> (
          <div className="" key={post.$id}>
            <PostCard featureImage={post.featureImage} title={post.title}  $id={post.$id} altText={post.title} heading={post.date}
            />
            </div>
        ))}

        </div>
    </Container>
  )
}

export default Articles