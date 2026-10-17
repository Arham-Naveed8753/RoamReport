import React, {useState , useEffect} from 'react'
import { Container , PostForm } from '../../components'
import { useNavigate , useParams } from 'react-router-dom'
import appwriteService from '../../appwrite/config'
import { set } from 'react-hook-form'
function EditArticle() {
    const [post , setPost] = useState([])
    const navigate = useNavigate()
    const {slug} = useParams()
    useEffect(()=>{
       if (slug) {
         appwriteService.getPost(slug).then((post)=>{
            setPost(post)
         })
       } else {
        navigate('/')
       }
    },[slug , navigate])
  return post ? (
    <Container>
        <PostForm></PostForm>
    </Container>
  ) : null
}

export default EditArticle