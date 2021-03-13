import React from 'react';
import AssetMap from '../../components/AssetMap/AssetMap';
import DashboarLayout from '../../components/DashboardLayout';

import './index.css';

export default function dashboard() {
  return(
    <div>
      <DashboarLayout/>
      <div className='dashboardMap'>
        <AssetMap/>
      </div>
    </div>
  )
}
