import React, { Component } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import amsApi from '../../services/amsApi';
import io from 'socket.io-client'

const StyledTableCell = withStyles(theme => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles(theme => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
      },
    },
  }))(TableRow);
  
  const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      height : '60px',
      marginTop: theme.spacing(3),
      overflowX: 'auto',
    },
    table: {
      minWidth: 700,
    },
  }));

export default class TableDetail extends Component{
    state = {
        docs : []
    }

    componentDidMount(){
        this.loadData();
        this.RegisterSocket()
    }

    async loadData(){
        const response = await amsApi.get('/api/asset');
        const { docs } = response.data;
        this.setState({docs});
    }

    RegisterSocket(){
        const socket = io(process.env.REACT_APP_BACKEND);
        socket.on('assetPost', newPost =>{
            this.setState({docs : [newPost,...this.state.docs]});
            this.loadData();   
        })
    }

    render(){
        return(           
            <Paper className={useStyles.root}>
                <Table className={useStyles.table}>
                    <TableHead>
                    <TableRow>
                        <StyledTableCell>ID</StyledTableCell>
                        <StyledTableCell align="right">Cidade</StyledTableCell>
                        <StyledTableCell align="right">Temperatura</StyledTableCell>
                        <StyledTableCell align="right">Pressão</StyledTableCell>
                        <StyledTableCell align="right">Status</StyledTableCell>
                        <StyledTableCell align="right">Ultima Manutenção</StyledTableCell>
                        <StyledTableCell align="right">Proxima Manutenção</StyledTableCell>
                        
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {this.state.docs.map(asset => (
                        <StyledTableRow key={asset._id}>
                        <StyledTableCell component="th" scope="row">{asset.mac}</StyledTableCell>
                        <StyledTableCell align="right">{asset.name}</StyledTableCell>
                        <StyledTableCell align="right">{asset.temp}</StyledTableCell>
                        <StyledTableCell align="right">{asset.pression}</StyledTableCell>
                        <StyledTableCell align="right">{asset.status}</StyledTableCell>
                        <StyledTableCell align="right">22/10/2018</StyledTableCell>
                        <StyledTableCell align="right">15/09/2020</StyledTableCell>
                        
                        </StyledTableRow>
                    ))}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}