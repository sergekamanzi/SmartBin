import React from 'react'
import SidebarWaste from './SidebarWaste'
import MainWasteservice from './MainWasteservice'

const WasteServiceMerge = () => {
  return (
    <div className='flex'>
      <SidebarWaste/>
      <MainWasteservice/>
    </div>
  )
}

export default WasteServiceMerge
