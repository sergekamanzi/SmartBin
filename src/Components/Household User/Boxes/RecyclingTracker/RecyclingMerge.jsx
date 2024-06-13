import React from 'react'
import SidebarHousehold from '../../SidebarHousehold'
import HeaderHousehold from '../../HeaderHousehold'
import RecyclingTracker from './RecyclingTracker'

const RecyclingMerge = () => {
  return (
    <div className='flex'>
        <SidebarHousehold/>
        <div>
            <HeaderHousehold/>
            <RecyclingTracker/>
        </div>
    </div>
  )
}

export default RecyclingMerge