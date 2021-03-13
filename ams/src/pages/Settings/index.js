import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import {Link} from 'react-router-dom';
import {makeStyles,Button} from '@material-ui/core';
import {People} from '@material-ui/icons';
import {Mail} from '@material-ui/icons';
import {NotificationsActive} from '@material-ui/icons';
import {DevicesOther} from '@material-ui/icons';

import {Assessment} from '@material-ui/icons';
import {Commute} from '@material-ui/icons';
import {AcUnit} from '@material-ui/icons';
import {Description} from '@material-ui/icons';
import {ImportExport} from '@material-ui/icons';
import {FavoriteBorder} from '@material-ui/icons';

const useStyles = makeStyles((theme)=>({
  root : {
    display : 'flex',
    flexWrap : 'wrap',
    alignItems : 'center',
    justifyContent : 'center',
    marginLeft : 50,
    '& > *' : {
      margin : theme.spacing(1),
      width : theme.spacing(26),
      height : theme.spacing(15),
    },
    paper: {
      padding : 20,
    },
    avatar : {
      width: theme.spacing(7),
      height: theme.spacing(7),
    }
  },
  main : {
    marginLeft : 80,
  },
}))

export default function Settings(){
  const classes = useStyles();
  const title = {
    access : 'Acesso',
    notifications : 'Notificações',
    devices : 'Dispositivos',
    alerts : 'Alertas',
    reports : 'Relatórios',
    integrations : 'Integrações',
    vehicles : 'Veículos',
    export : 'Exportar',
    health : 'Saúde',
    log : 'Logs'
  }
  return(
    <div >
      <DashboardLayout/>
      <div className={classes.root}>
        
      <Button variant="contained"
              startIcon={<People/>} 
              style={{paddingLeft: 13, textDecoration: 'none'}}
              component={Link} to='/signup'>
        {title.access}
      </Button>
      <Button variant="contained" 
              startIcon={<Mail/>} 
              style={{paddingLeft: 13, textDecoration: 'none'}}
              component={Link} to=''>
        {title.notifications}
      </Button>
      <Button variant="contained" 
              startIcon={<NotificationsActive/>} 
              style={{paddingLeft: 13, textDecoration: 'none'}}
              component={Link} to=''>
        {title.alerts}
      </Button>
      <Button variant="contained" 
              startIcon={<DevicesOther/>} 
              style={{paddingLeft: 13, textDecoration: 'none'}}
              component={Link} to='/devices'>
        {title.devices}
      </Button>

      <Button variant="contained"
              startIcon={<Assessment/>} 
              style={{paddingLeft: 13, textDecoration: 'none'}}
              component={Link} to=''>
        {title.reports}
      </Button>
      <Button variant="contained" 
              startIcon={<AcUnit/>} 
              style={{paddingLeft: 13, textDecoration: 'none'}}
              component={Link} to=''>
        {title.integrations}
      </Button>
      <Button variant="contained" 
              startIcon={<Commute/>} 
              style={{paddingLeft: 13, textDecoration: 'none'}}
              component={Link} to='/order'>
        {title.vehicles}
      </Button>
      <Button variant="contained" 
              startIcon={<ImportExport/>} 
              style={{paddingLeft: 13, textDecoration: 'none'}}
              component={Link} to=''>
        {title.export}
      </Button>
      <Button variant="contained" 
              startIcon={<FavoriteBorder/>} 
              style={{paddingLeft: 13, textDecoration: 'none'}}
              component={Link} to=''>
        {title.health}
      </Button>
      <Button variant="contained" 
              startIcon={<Description/>} 
              style={{paddingLeft: 13, textDecoration: 'none'}}
              component={Link} to=''>
        {title.log}
      </Button>
      </div>
    </div>
  )
}