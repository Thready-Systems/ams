import React from 'react';
import {Link} from 'react-router-dom';
import DashboarLayout from '../DashboardLayout';
import chartImg from '../../img/charts.png';
//import powerBiImg from '../../img/powerbi.png';
import './index.css';

export default function MiniDrawer() {
  return(
    <div>
      <DashboarLayout/>
      <div className='report-container'>
        <div id='listReport'>
              <div className='lineReport1'>
                <Link to='/reports'>
                    <img alt='' src={chartImg}/>
                </Link>
                {/* <Link to='/ReportsPowerBi'>
                    <img alt='' src={powerBiImg}/>
                </Link>                 */}

              </div>
        </div>
      </div>
    </div>
  )
}