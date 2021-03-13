import React,{useState} from 'react';
import {TextField,Grid,Button,Container,CssBaseline,makeStyles,Typography,Link,Box,Snackbar} from '@material-ui/core';
import { useHistory } from "react-router-dom";
import MuiAlert from '@material-ui/lab/Alert'
import api from '../../services/amsApi';
import {login} from '../../services/auth';
import amsLogo from '../../img/ams_logo.png';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme =>({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    ams : {
        width : '17%'
    }
}))

function Copyright(){
    return(
        <Typography variant='body2' color='textSecondary' align='center'>
            Todos os diretos ©  <Link href='https://thready.com.br'>Thready</Link> {new Date().getFullYear()}
        </Typography>
    )
}

export default function Login(){
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [open,setOpen] = useState(false);
    
    const history = useHistory();

    const handleSubmit = async event =>{
       
        event.preventDefault();
        const response = await api.post('/login/signin',{
            username,
            password
        });

        if(response.data.token){
            login(response.data.token);
            history.push('/dashboard');
        }else{
            setOpen(true);
        }
        console.log(response.data);
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
    };

    const classes = useStyles();

    return(
        <Container component='main' maxWidth='xs'>
            <CssBaseline/>

            <div className={classes.root}>
                <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error">
                    Usuário ou senha inválidos
                    </Alert>
                </Snackbar>
            </div>


            <div className={classes.paper}>
                <img src={amsLogo} alt='' className={classes.ams}/>
                <Typography component="h1" variant="h5">Asset Management System</Typography>
                <form className={useStyles.form} onSubmit={handleSubmit}>
                    <TextField
                        label='Endereço de Email' 
                        required
                        autoFocus
                        margin="normal"
                        variant="outlined"
                        fullWidth
                        value={username}
                        onChange={event => setUsername(event.target.value)}
                        name='username'/>
                    <TextField
                        label='Senha'
                        required
                        margin="normal"
                        variant="outlined"
                        fullWidth
                        type='password'
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                        name='password'/>

                    <Button
                        className={classes.submit} 
                        type='submit'
                        variant='contained'
                        fullWidth
                        color='primary'>ENVIAR</Button>

                    <Grid container>
                        <Grid item xs>
                            <Link href='' variant='body2'>Recuperar senha</Link>
                        </Grid>
                        <Grid item xs>
                            <Link href=''>Solicitar credencial de acesso</Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        <Box mt={8}>
            <Copyright/>
        </Box>

        </Container>
    )
}