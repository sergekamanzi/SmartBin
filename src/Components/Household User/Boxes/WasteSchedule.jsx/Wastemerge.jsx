import React from 'react'
import SidebarHousehold from '../../SidebarHousehold'
import ScheduleForm from './Wasteshedule'

const Wastemerge = () => {
  return (
    <div className='flex'>
        <SidebarHousehold/>
        <div>
            <ScheduleForm/>
        </div>
    </div>
  )
}

export default Wastemerge