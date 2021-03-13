import React, { Component } from 'react'
import './index.css'
import amsApi from '../../services/amsApi';

export default class Simulation extends Component{

    randomNumber(){
       return Math.floor(Math.random() *10) +15 
    } 

    state = {
        
    }

    handleClick = async event =>{
        //event.preventDefault();
        switch(event.target.name){
            case 'delete' : 
                await amsApi.delete('/login/delete');
            break;

            case 'aquecimento' : 
                await amsApi.post('/login/asset',{
                    "mac" : "aaa1177",
                    "name" : "Bahia",
                    "type" : "compressor",
                    "value" : this.randomNumber(),
                    "status" : "error",
                    "active" : 1,
                    "lastRepair" : "12/04/2018",
                    "nextRepair" : "26/09/2019",
                    "hourmeter" : 920,
                    "pression" : this.randomNumber() + 100,
                    "temp" : this.randomNumber() + 50,
                    "coord" : 
                        {
                            "lat" : "-15.017914",
                            "lon" : "-40.321457"
                        }
                })
            break;

            case 'inversor' : await amsApi.post('/login/asset',{
                "mac" : "aaa1166",
                "name" : "Cuiabá",
                "type" : "compressor",
                "value" : this.randomNumber(),
                "status" : "ok",
                "active" : 1,
                "lastRepair" : "12/04/2018",
                "nextRepair" : "26/09/2019",
                "hourmeter" : 920,
                "pression" : this.randomNumber() + 100,
                "temp" : this.randomNumber() + 50,
                "coord" : 
                    {
                        "lat" : "-15.526302",
                        "lon" : "-55.423799"
                    }
            })
            break;

            case 'desligamento' : await amsApi.post('/login/asset',{
                "mac" : "aaa1188",
                "name" : "Sao Paulo",
                "type" : "compressor",
                "value" : this.randomNumber(),
                "status" : "inactive",
                "active" : 1,
                "lastRepair" : "12/04/2018",
                "nextRepair" : "26/09/2019",
                "hourmeter" : 920,
                "pression" : this.randomNumber() + 100,
                "temp" : this.randomNumber() + 50,
                "coord" : 
                    {
                        "lat" : "-22.843709",
                        "lon" : "-42.883428"
                    }
            })
            break;

            default : await amsApi.post('/login/asset',{
                "mac" : "aaa1155",
                "name" : "Vitoria",
                "type" : "compressor",
                "value" : this.randomNumber(),
                "status" : "warning",
                "active" : 0,
                "lastRepair" : "12/04/2018",
                "nextRepair" : "26/09/2019",
                "hourmeter" : 920,
                "pression" : this.randomNumber() + 100,
                "temp" : this.randomNumber() + 50,
                "coord" : 
                    {
                        "lat" : "-20.301755",
                        "lon" : "-40.300734"
                }
            })
            break;
        }
    }

    render(){
        return(
            <div id='Simulation_body'>
                <div className='line'>
                    <button className='button1'
                        value=''
                        name='inversor'
                        type='submit'
                        onClick={this.handleClick}
                    >Inversor</button>
                     <button className='button2'
                        
                        value=''
                        name='manutencao'
                        type='submit'
                        onClick={this.handleClick}
                    >Manutenção</button>

                </div>

                <div className='line'>
                <button className='button3'
                        
                        value=''
                        name='desligamento'
                        type='submit'
                        onClick={this.handleClick}
                    >Desligamento</button>
                    <button className='button4'
                        
                        value=''
                        name='aquecimento'
                        type='submit'
                        onClick={this.handleClick}
                    >Aquecimento</button>
                    <button className='button5'
                        
                        value=''
                        name='delete'
                        type='submit'
                        onClick={this.handleClick}
                    ></button>
                </div>
            </div>
        )
    }
}