import React, { useState } from 'react';
import {Snackbar,Switch,Container,Paper,makeStyles,Grid,Button,CssBaseline,TextField,Select,MenuItem,FormControl,InputLabel,FormControlLabel, Typography} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import DashnoardLayout from '../../components/DashboardLayout';
import api from '../../services/amsApi';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  
const useStyles = makeStyles(theme =>({
    root: {
        width: '100%',
        '& > * + *': {
          marginTop: theme.spacing(2),
        },
    },
    paper : {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(12),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    formControl: {
        minWidth: 120,
      },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    footer : {
        marginTop : theme.spacing(5),
        flexDirection : 'row-reverse'
    }
}))

export default function Devices(){
    const [active, setActive] = useState(true);
    const [name,setName] = useState('');
    const [company,setCompany] = useState('');
    const [type,setType] = useState('');
    const [model,setModel] = useState('');
    const [openAlert, setOpenAlert] = React.useState(false);

    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
    };
    
    const handleChangeActive = (event) => {
        setActive(event.target.checked);
    };

    const handleSubmit = async event =>{
        event.preventDefault();
        const device = {
            name,
            model,
            type,
            active,
            company
        }
        const response = await api.post('/api/devices',device);
        if(response.data){
            setOpenAlert(true);
            setName('');
            setCompany('');
            setType('');
            setModel('');
            setActive(true);
        }
    }


    const devicesLabel = {
        title : 'Dispositivos',
        name : 'Nome do dispositivo',
        company : 'Empresa',
        type : 'Tipo',
        model : 'Modelo',
        active : 'Ativo',
        snack : 'Dispositivo adicionado com sucesso.'
    }

    const classes = useStyles();

    return(
        <Container maxWidth='md'>
           
            <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleCloseSnack}>
                <Alert onClose={handleCloseSnack} severity="success">
                    {devicesLabel.snack}
                </Alert>
            </Snackbar>

            <DashnoardLayout/>
            <CssBaseline/>
                <Paper className={classes.paper}>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={4}>
                            <Grid item xs={12} align='center'>
                                <Typography variant='h4'>{devicesLabel.title}</Typography>
                            </Grid>
                            <Grid item  xs={12} sm={6}>
                                <TextField
                                onChange={event => setName(event.target.value)}
                                value={name}
                                label={devicesLabel.name}
                                type='text'
                                fullWidth
                                required/>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    onChange={event => setCompany(event.target.value)}
                                    value={company}
                                    className=''
                                    label={devicesLabel.company}
                                    type='text'
                                    fullWidth
                                    required/>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl className={classes.formControl}>
                                    <InputLabel id='type'>{devicesLabel.type}</InputLabel>
                                    <Select
                                        onChange={event => setType(event.target.value)}
                                        value={type}
                                        className={classes.selectEmpty}
                                        labelId='type'
                                        type='text'
                                        fullWidth
                                        required>
                                            <MenuItem value='Vechicle'>Vechicle</MenuItem>
                                            <MenuItem value='Sensor'>Sensor</MenuItem>
                                            <MenuItem value='Computer'>Computer</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControlLabel
                                control={
                                    <Switch
                                    checked={active.status}
                                    onChange={handleChangeActive}
                                    color="primary"
                                    name="active"
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                />
                                }
                                label='Ativo'/>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    onChange={event => setModel(event.target.value)}
                                    value={model}
                                    label={devicesLabel.model}
                                    type='text'
                                    fullWidth
                                    required/>
                            </Grid>
                        </Grid>
                        <Grid container className={classes.footer}>
                            <Grid item xs={6} sm={2}>
                                <Button type='submit' color='primary' variant='contained'>Salvar</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
                {console.log(active,name,company,type,model)}
        </Container>
    )
}