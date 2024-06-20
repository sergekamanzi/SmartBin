import React from 'react'
import SidebarHousehold from '../SidebarHousehold'
import Profile from './Profile'

const ProfileSection = () => {
  return (
    <div className='flex bg-[#eee] '>
        <SidebarHousehold />
        <Profile/>
    </div>
  )
}

export default ProfileSection