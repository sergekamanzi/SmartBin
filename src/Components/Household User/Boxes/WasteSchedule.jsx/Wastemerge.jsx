import React from 'react'
import SidebarHousehold from '../../SidebarHousehold'
import HeaderHousehold from '../../HeaderHousehold'
import WasteCollectionSchedule from './Wasteshedule'

const Wastemerge = () => {
  return (
    <div className='flex'>
        <SidebarHousehold/>
        <div>
            <HeaderHousehold/>
            <WasteCollectionSchedule/>
        </div>
    </div>
  )
}

export default Wastemerge