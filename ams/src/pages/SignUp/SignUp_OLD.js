import React, { Component } from 'react';
import {Typography} from '@material-ui/core';
import DashboardLayout from '../../components/DashboardLayout';
import amsApi from '../../services/amsApi';
import 'react-phone-input-2/dist/style.css'
import './SignUp.css';

import ReactPhoneInput from 'react-phone-input-2'

class SignUp extends Component{
    state = {
        name : '',
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
                <form id='SignUpForm' onSubmit={this.handleSubmit}>
                    <label>User creation</label>
                    <input 
                        type='text'
                        placeholder='Your full name'
                        value={this.state.name}
                        name='name'
                        onChange={this.handleOnChange}
                    />
                    <input 
                        type='text'
                        placeholder='email ex: user@thready.com.br'
                        value={this.state.username}
                        name='username'
                        onChange={this.handleOnChange}
                    />
                    <input 
                        type='password'
                        placeholder='Password'
                        value={this.state.password}
                        name='password'
                        onChange={this.handleOnChange}
                    />

                    <ReactPhoneInput                    
                        defaultCountry="us"
                        value={this.state.phone}
                        onChange={phone => this.setState({ phone })}
                    />

                    <input
                        className='companyInput' 
                        type='text'
                        placeholder='Company name'
                        value={this.state.company}
                        name='company'
                        onChange={this.handleOnChange}
                    />
                    <input 
                        type='text'
                        placeholder='Department'
                        value={this.state.department}
                        name='department'
                        onChange={this.handleOnChange}
                    />
                    <select name='role' value={this.state.role} onChange={this.handleOnChange}>
                        <option  value=''>...</option>
                        <option  value='Developer'>Developer</option>
                        <option value='Manager'>Manager</option>
                        <option value='IT infrastructure'>IT infrastructure</option>
                        <option value='Salles'>Salles</option>
                    </select>

                    <select name='perfil' value={this.state.perfil} onChange={this.handleOnChange}>
                        <option  value=''>...</option>
                        <option value='Admin'>Admin</option>
                        <option value='User'>User</option>
                    </select>

                    <button type='submit'>Save</button>
                </form>
            </div>
        )
    }
}

export default SignUp;