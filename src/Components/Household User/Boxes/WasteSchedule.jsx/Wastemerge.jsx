import React from 'react';
import SidebarHousehold from '../../SidebarHousehold';
import ScheduleForm from './Wasteshedule';

const Wastemerge = () => {
  return (
    <div className='flex  md:flex-row'>
      <SidebarHousehold />
      <div className='flex-1'>
        <ScheduleForm />
      </div>
    </div>
  );
};

export default Wastemerge;
