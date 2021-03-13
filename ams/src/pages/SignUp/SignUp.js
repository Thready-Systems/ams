import React, { Component } from 'react';
import {Paper,TextField,Button,Select,MenuItem,InputLabel,FormControl} from '@material-ui/core';
import DashboardLayout from '../../components/DashboardLayout';
import amsApi from '../../services/amsApi';
import 'react-phone-input-2/dist/style.css'
import './SignUp.css';

class SignUp extends Component{
    state = {
        name : '',
        surname : '',
        password : '',
        username : '',
        phone : '',
        company : '',
        department : '',
        role : '',
        perfil : '',
    };

    handleSubmit = async event =>{
            event.preventDefault();            
            await amsApi.post('/api/user',{
                'name' : this.state.name,
                'surname' : this.state.surname,
                'username' : this.state.username,
                'password' : this.state.password,
                'phone' : this.state.phone,
                'company' : this.state.company,
                'department' : this.state.department,
                'role' : this.state.role,
                'perfil' : this.state.perfil,
            });
            this.props.history.push('/');
    }

    handleOnChange = event =>{
        this.setState({ [event.target.name] : event.target.value});
    }

    render(){
        return(
            <div>
                <DashboardLayout/>
                <div className='user-form'>
                    <Paper elevation={2} className='main-paper'>
                        <form Validate autoComplete="off" onSubmit={this.handleSubmit}>
                            <TextField
                                className='elements'
                                label='Nome'
                                size='small'
                                value={this.state.name}
                                name='name'
                                onChange={this.handleOnChange}
                            />
                            <TextField
                                className='elements'
                                label='Sobrenome'
                                size='small'
                                value={this.state.surname}
                                name='surname'
                                onChange={this.handleOnChange}
                            />
                            <TextField
                                className='elements'
                                label='Email'
                                size='small'
                                value={this.state.username}
                                name='username'
                                onChange={this.handleOnChange}
                            />
                            <TextField
                                className='elements'
                                type='password'
                                label='Senha'
                                size='small'
                                value={this.state.password}
                                name='password'
                                onChange={this.handleOnChange}
                            />
                            <TextField
                                className='elements' 
                                label='Empresa'
                                placeholder='Company name'
                                value={this.state.company}
                                name='company'
                                onChange={this.handleOnChange}
                                />
                            <TextField
                                className='elements'
                                label='Departamento'
                                placeholder='Department'
                                value={this.state.department}
                                name='department'
                                onChange={this.handleOnChange}
                            />
                           <FormControl className='elements-formControl'>
                           <InputLabel id='input-cargo'>Cargo</InputLabel>
                                <Select 
                                    labelId='input-cargo'
                                    className='elements'
                                    label='Cargo'
                                    name='role' 
                                    value={this.state.role} 
                                    onChange={this.handleOnChange}>
                                        <MenuItem value=''>...</MenuItem>
                                        <MenuItem value='Developer'>Developer</MenuItem>
                                        <MenuItem value='Manager'>Manager</MenuItem>
                                        <MenuItem value='IT infrastructure'>IT infrastructure</MenuItem>
                                        <MenuItem value='Salles'>Salles</MenuItem>
                                </Select>
                           </FormControl>

                           <FormControl className='elements-formControl'>
                            <InputLabel id='input-perfil'>Perfil</InputLabel>
                                <Select
                                    labelId='input-perfil'
                                    className='elements'
                                    label='Perfil'
                                    name='perfil' 
                                    value={this.state.perfil} 
                                    onChange={this.handleOnChange}>
                                        <MenuItem value=''>...</MenuItem>
                                        <MenuItem value='Admin'>Admin</MenuItem>
                                        <MenuItem value='User'>User</MenuItem>
                                </Select>
                            </FormControl>
                            {/* <ReactPhoneInput
                                className='elements'                    
                                defaultCountry="br"
                                value={this.state.phone}
                                onChange={phone => this.setState({ phone })}
                            /> */}
                            <div className='action-footer'>
                                <Button type='submit' className='elements' variant="contained" color="primary">Salvar</Button>
                            </div>
                        </form>    
                    </Paper>
                </div>
            </div>
        )
    }
}

export default SignUp;




