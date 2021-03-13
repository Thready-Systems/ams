import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import {Paper, makeStyles} from '@material-ui/core';

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
      height : theme.spacing(26),
    }
  },
  main : {
    marginLeft : 80,
  }
}))

export default function Settings(){
  const classes = useStyles();
  return(
    <div >
      <DashboardLayout/>
      <div className={classes.root}>
        <Paper elevation={3}/>
        <Paper elevation={3}/>
        <Paper elevation={3}/>
        <Paper elevation={3}/>
      </div>
    </div>
  )
}