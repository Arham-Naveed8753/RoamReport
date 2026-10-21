import React from 'react'
import Container from '../Container'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faFacebook, 
  faSquareInstagram, 
  faPinterest, 
  faYoutube, 
  faXTwitter 
} from '@fortawesome/free-brands-svg-icons';

function Footer() {

  const links = [
    {
      Name : 'Home',
      url : '/',
    },
    {
      Name : 'Articles',
      url : '/articles',
    },
    {
      Name : 'New Post',
      url : '/new-post',
    },
  ]

  const icon = [
  {
    icon: faFacebook,
    to: 'https://facebook.com'
  },
  {
    icon: faSquareInstagram,
    to: 'https://instagram.com'
  },
  {
    icon: faPinterest,
    to: 'https://pinterest.com'
  },
  {
    icon: faYoutube,
    to: 'https://youtube.com'
  },
  {
    icon: faXTwitter ,
    to: 'https://x.com'
  }
];

  const navigate = useNavigate()
  return (
    

    <Container className={`bg-skin `}> 
      <div className='flex flex-col items-center text-brown text-center '>
        <h2 className=' font-jakrta text-one_three_seven_five font-semibold leading-[120%] tracking-zero-zero_two_five'>End of the trail</h2>
        <div className='flex flex-col text-center font-gaseok font-normal text-three_five lg:text-five leading-[90%] tracking-zero-zero_two_five mt-3'>
          <h1>Less rush.</h1>
          <h1>More wonder.</h1>
        </div>
        <div className='flex  gap-7 '>
          
            {links.map((item)=> (
              <button
              key={item.url}
              className='cursor-pointer font-jakrta text-one font-medium leading-[120%] tracking-tighter underline  underline-offset-5 mt-10 '
              onClick={()=> navigate(item.url)}
              
              >
                <h4>{item.Name}</h4>
              </button>
            ))}
          
        </div>
        <div className='flex gap-5 mt-10 '>
            {icon.map((item) => (
            <a  
            href={item.to}
            target='_blank'
            key={item.to} 
            className='cursor-pointer'>
              {<FontAwesomeIcon 
              icon={item.icon}
              size='xl'
              className='text-brown hover:text-black/50 transition duration-100'/>}
              </a> 
            ))}
        </div>
        <p className='text-center text-one font-jakrta leading-[120%] tracking-tight mt-8'>Copyright ©2025  ·  The Roam Report</p>
      </div>
    </Container>
  )
}

export default Footer