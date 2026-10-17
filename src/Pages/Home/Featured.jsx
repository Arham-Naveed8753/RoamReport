import React from 'react'
import { Container } from '../../components'
import carCoast from '../../assets/carCoast.png'
import desert from '../../assets/desert.png'
import{ BlogCard} from '../../components'

function Featured() {
  return (
    <Container 
      
      style={{ backgroundImage: `url(${desert})` }}
      
      className="bg-cover  bg-center bg-no-repeat w-full h-dvh overflow-hidden sticky top-0"
    >

    <BlogCard image={carCoast} heading={`Featured Blog`} title={`Wild Camping Along Tasmania’s East Coast`}/>
      
    </Container>
  )
}

export default Featured