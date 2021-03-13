import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { isAuthenticated } from './services/auth';

import Asset from './components/Assets/Assets';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import AssetMap from './components/AssetMap/AssetMap';
import Alerts from './pages/Alerts';
import Dashboard from './pages/Dashboard';
import Reports from './pages/Reports';
import ReportsPowerBi from './pages/ReportsPowerBi';
import ReportsDashboard from './components/ReportsDashboard';
import Simulation from './pages/Simulation';
import MapAlert from './pages/MapAlert';
import AssetMobileDashboard from './pages/AssetMobileDashboard';
import Settings from './pages/Settings';
import Devices from './pages/Devices';
import Order from './pages/Order';
import Tracking from './pages/Tracking';
import Teste from './pages/Teste';


const PrivateRoute = ({component : Component, ...rest}) => (
    <Route 
    {...rest}
    render={props =>
        isAuthenticated() ? (
            <Component {...props} />
        ) : (
            <Redirect to={{pathname: "/", state : {from : props.location}}} />
        )    
    }
    />
);

function Routes(){
    return(
        <Switch>           
            <Route path='/' exact component={Login}/>
            <PrivateRoute path="/asset" component={Asset}/>
            <PrivateRoute path='/signup' component={SignUp}/>
            <PrivateRoute path='/dashboard' component={Dashboard}/>
            <PrivateRoute path="/assetmap" component={AssetMap}/>
            <PrivateRoute path='/reports' component={Reports}/>
            <PrivateRoute path='/ReportsDashboard' component={ReportsDashboard}/>
            <PrivateRoute path='/ReportsPowerBi' component={ReportsPowerBi}/>
            <PrivateRoute path='/simulation' component={Simulation}/>
            <PrivateRoute path='/alerts' component={Alerts}/>
            <PrivateRoute path='/mapalert' component={MapAlert}/>
            <PrivateRoute path='/assetmobile' component={AssetMobileDashboard}/>
            <PrivateRoute path='/settings' component={Settings}/>
            <PrivateRoute path='/devices' component={Devices}/>
            <PrivateRoute path='/order' component={Order}/>
            <PrivateRoute path='/tracking/:assetName/:orderID' component={Tracking}/>
            <PrivateRoute path='/teste' component={Teste}/>
        </Switch>
    )
};


export default Routes;


