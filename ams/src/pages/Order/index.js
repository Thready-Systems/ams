import React,{useState} from 'react';
import {Button,TextField,Grid,Container,CssBaseline,makeStyles} from '@material-ui/core';
import DashboardLayout from '../../components/DashboardLayout';
import api from '../../services/amsApi';
import MaterialTable from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { forwardRef } from 'react';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

export default function MaterialTableDemo() {
    const [deviceName,setDeviceName] = useState('');
    let [orders,setOrders] = useState('');

    const columns = {
        names : [
            { title: 'Código', field: 'code' },
            { title: 'Entregue', field: 'delivered', type : 'boolean' },
            { title: 'Descrição', field: 'description' },
            { title: 'Contato', field: 'contact' },
            { title: 'Check-in', field: 'checkin', type : 'datetime' },
            { title: 'Check-out', field: 'checkout', type : 'datetime' },
            { title: 'DeadLine', field: 'deadline', type : 'datetime'},
            { title: 'Endereço', field: 'destinationAddress' },
        ]
    };

    const loadData = async () =>{
        const response = await api.post(`/api/order/${deviceName}`);
        let orders = {data : response.data};
        setOrders(orders);
    }

    const handleSubmit = async event =>{
        event.preventDefault();
        loadData();
    }

    const updateOrder = async data =>{
        await api.post(`/api/updateorder/${deviceName}`,data);
        loadData();
    }

    const useStyles = makeStyles(theme =>({
        root: {
            marginLeft : theme.spacing(-11),
            padding : theme.spacing(2),
            margin  : theme.spacing(0)
        },
        button : {
            display : 'none'
        },
        paper : {
            marginTop : theme.spacing(-7),
        },
        table : {
            marginLeft : theme.spacing(-10),
            width : '125%',
        }
    }))

    const classes = useStyles();

  return(
      
    <Container component='main' maxWidth='md'>
        <CssBaseline/>
        <DashboardLayout/>
        <div className={classes.paper}>
            <Grid container spacing={3}>
                <form className={classes.root} onSubmit={handleSubmit}>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            label='Device name' 
                            required
                            autoFocus
                            margin="normal"
                            variant="outlined"
                            fullWidth
                            value={deviceName}
                            onChange={event => setDeviceName(event.target.value)}
                            name='username'/>
                    </Grid>   
                    <Grid item>
                        <Button
                            className={classes.button}
                            type='submit'/>
                    </Grid>
                </form>
            </Grid>

            <div className={classes.table}>
                <Grid item xs={12}>
                    <MaterialTable
                        icons={tableIcons}
                        title="Deliveries"
                        columns={columns.names}
                        data={orders.data}
                        editable={{
                            onRowAdd: (newData) =>
                            new Promise((resolve) => {
                                setTimeout(() => {
                                resolve();
                                setOrders((prevState) => {
                                    if(prevState === null){
                                        prevState = {data : ''}
                                    }
                                    const data = [...prevState.data];
                                    data.push(newData);
                                    updateOrder(data);
                                    return { ...prevState, data };
                                });
                                }, 600);
                            }),
                            onRowUpdate: (newData, oldData) =>
                            new Promise((resolve) => {
                                setTimeout(() => {
                                resolve();
                                if (oldData) {
                                    setOrders((prevState) => {
                                    const data = [...prevState.data];
                                    data[data.indexOf(oldData)] = newData;
                                    //console.log(data);
                                    updateOrder(data);
                                    return { ...prevState, data };
                                    });
                                }
                                }, 600);
                            }),
                            onRowDelete: (oldData) =>
                            new Promise((resolve) => {
                                setTimeout(() => {
                                resolve();
                                setOrders((prevState) => {
                                    const data = [...prevState.data];
                                    data.splice(data.indexOf(oldData), 1);
                                    console.log(oldData._id);
                                    updateOrder(data);
                                    return { ...prevState, data };
                                });
                                }, 600);
                            }),
                        }}
                    />
                </Grid>
            </div>
            
        </div>
        </Container>
  )
}
