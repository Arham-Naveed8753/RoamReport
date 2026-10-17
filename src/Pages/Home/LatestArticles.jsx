import React , {useState , useEffect} from 'react'
import { Container, PostCard } from '../../components'
import {BlogCard} from '../../components'
import womanWalking from '../../assets/womanWalking.jpg'
import rome from '../../assets/rome.png'
import appwriteService from '../../appwrite/config'


const latestArticles = [
    {
        image : womanWalking  ,
        heading : 'October 10, 2025' ,
        title : 'Finding Stillness in the Hills of San Cristóbal'
    },
    {
        image : rome  ,
        heading : 'October 2, 2025' ,
        title : 'Wandering Through the Streets of Rome'
    },
]


function LatestArticles() {

    const [posts , setPosts] = useState([])
    useEffect(()=>{
        appwriteService.ListPosts().then((response)=>{
            if (response && response.documents) {
                setPosts(response.documents)
            }
        })
    },[])

    
  return (
    <Container className={` bg-skin min-h-dvh relative flex flex-col gap-8`}>
        <h1 className='text-center text-brown text-two font-jakrta font-semibold leading-[120%] tracking-tight'>Latest travel stories</h1>
        <div className='grid grid-cols-1 justify-center gap-10'>
        {latestArticles.map((article)=> (
            <BlogCard image={article.image} heading={article.heading} title={article.title} key={article.heading}/>
        ))}

        </div>
        <div className='grid grid-cols-1 justify-center gap-10'>
        {posts.map((post)=> (
        <div key={post.$id}>
            <PostCard post={{...posts}} />
        </div>
        ))}

        </div>

        
    </Container>
  )
}

export default LatestArticles