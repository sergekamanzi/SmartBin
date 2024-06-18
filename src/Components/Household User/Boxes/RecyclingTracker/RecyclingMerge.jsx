import React from 'react'
import SidebarHousehold from '../../SidebarHousehold'
import RecyclingDashboard from './RecyclingTracker'

const RecyclingMerge = () => {
  return (
    <div className='flex'>
        <SidebarHousehold/>
        <div>
            <RecyclingDashboard/>
        </div>
    </div>
  )
}

export default RecyclingMerge