import React from 'react'
import SidebarHousehold from '../SidebarHousehold'
import Dashboard from './Dashboard.jsx'

const Dashboardsection = () => {
  return (
    <div className='flex'>
        <SidebarHousehold/>
        <Dashboard/>
    </div>
  )
}

export default Dashboardsection