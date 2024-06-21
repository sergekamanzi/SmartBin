import React from 'react'
import SideAdmin from '../../SideAdmin'
import Users from './Users'

const UsersMerge = () => {
  return (
    <div className='flex bg-[#eee] '>
      <SideAdmin/>
      <Users/>
    </div>
  )
}

export default UsersMerge
