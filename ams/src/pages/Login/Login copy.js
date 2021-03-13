import React, { Component } from 'react';
import './Login.css';
import logoAms from '../../img/ams_logo.png';
import logoThready from '../../img/logo_thready.jpg';
import { login } from '../../services/auth';
import amsApi from '../../services/amsApi';

class Login extends Component{
    state = {
        user : '',
        password : '',
    }
    
    handleSubmit = async event =>{
        event.preventDefault();
        const response = await amsApi.post('/login/signin',{
            username : this.state.user,
            password : this.state.password,
        });
        
        if(response.data.token){
            login(response.data.token);
            this.props.history.push('/dashboard');
        }
    }

    handleChange = event =>{
        this.setState({[event.target.name] : event.target.value});
    }


    componentDidMount(){
        if(localStorage.getItem('amsTokenKey')){
            console.log('logado');
            this.props.history.push('/dashboard')
        } 
    }

    render(){
        return(
            <div id='loginArea'>         
                <form className='login' onSubmit={this.handleSubmit}>
                <header>
                    <img src={logoAms} alt=''></img>
                    <span>ASSET MANAGEMENT SYSTEM</span>
                </header>
                    <input 
                        type='text'
                        name='user'
                        placeholder='ex: user@domain.com'
                        onChange={this.handleChange}
                        value={this.state.user}
                    />
                    <input 
                        type='password'
                        name='password'
                        placeholder='your password'
                        value={this.state.password}
                        onChange={this.handleChange}
                    />
                    <button type='submit'>Entrar</button>
                    <footer>
                        <span>Developed by </span>
                        <img alt='' className='logoThready' src={logoThready}></img>
                    </footer>

                </form>
            </div>
        )
    }
}

export default Login;