import React from 'react'
import SidebarHousehold from '../../SidebarHousehold'
import RecyclingTracker from './RecyclingTracker'

const RecyclingMerge = () => {
  return (
    <div className='flex'>
        <SidebarHousehold/>
        <div>
            <RecyclingTracker/>
        </div>
    </div>
  )
}

export default RecyclingMerge