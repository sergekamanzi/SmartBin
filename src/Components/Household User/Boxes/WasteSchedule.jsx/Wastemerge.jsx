import React from 'react'
import SidebarHousehold from '../../SidebarHousehold'
import WasteCollectionSchedule from './Wasteshedule'

const Wastemerge = () => {
  return (
    <div className='flex'>
        <SidebarHousehold/>
        <div>
            <WasteCollectionSchedule/>
        </div>
    </div>
  )
}

export default Wastemerge