import React from 'react'
import SidebarWaste from '../SidebarWaste'
import CompanyProfile from './Profile'

const ProfileCompany = () => {
  return (
    <div className='flex bg-[#eee] '>
        <SidebarWaste/>
        <CompanyProfile/>
    </div>
  )
}

export default ProfileCompany