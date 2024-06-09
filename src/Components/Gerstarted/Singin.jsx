import React from 'react'
import LoginForm from './Login'
import Sidelogin from './sidelogin'

const Singin = () => {
  return (
    <div className='flex p-20 bg-[#37af65]'>
        <LoginForm/>
        <Sidelogin/>
    </div>
  )
}

export default Singin