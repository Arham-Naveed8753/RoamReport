import React from 'react'
import {Logout} from '../index'
import {useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

function Header() {

  const userStatus = useSelector((state)=> (state.auth.status))
const navItems = [
    {
        name : 'Home',
        to : '/',
        active : true
    } ,
    {
        name : 'Login',
        to : '/login',
        active : !userStatus
    } ,
    {
        name : 'SignUp',
        to : '/signup',
        active : !userStatus
    } ,
    {
        name : 'Articles',
        to : '/all-articles',
        active : userStatus
    } ,
    {
        name : 'New Post',
        to : '/new-article',
        active : userStatus
    } ,
]

  return (


<nav className='z-100 fixed flex items-center  rounded-six_twenty_four py-3.5 px-6 bg-white translate-[-50%]  top-10 left-1/2  lg:left-1/4 lg:top-15'>
    <div className=''>
        <div className='flex justify-center items-center gap-5'>
        {navItems.map((item)=> (
            item.active && (
                    <NavLink
                    to={item.to}
                    className={ ({ isActive }) => 
                    `leading-5 font-jakarta font-semibold text-eight_seven_five cursor-pointer tracking-[-0.28px]   ${
                    isActive ? 'text-black' : 'text-gray hover:text-blue transition duration-150 ease-in'
                    }`
                    }
                    key={item.to}
                    >
                    {item.name}
                    </NavLink>

                    
                    
            )
        ))}
        {userStatus && (
            <Logout />
        )}
        </div>
    </div>
</nav>

    
  )
}

export default Header