import React from 'react'
import AuthService  from '../../appwrite/auth'
import {logout} from '../../store/authSlice'
import {useDispatch} from 'react-redux'
function Logout() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        AuthService.logOut().then((data) => {
            dispatch(logout())
        })
    }
  return (
    <button
    onClick = {logoutHandler}
    className='leading-5 font-jakarta font-semibold text-eight_seven_five cursor-pointer tracking-[-0.28px] '
    
    >
        Logout
    </button>
  )
}

export default Logout