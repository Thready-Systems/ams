import React, { Component } from 'react';
import config from '../../config/server_config.js';
import amsApi from '../../services/amsApi';
import io from 'socket.io-client';

import imgMotor from '../../img/motor.png';

import './Assets.css';

class Assets extends Component{
    state = {
        docs : [],
        page : 1,
    }

    componentDidMount(){
        this.registerToSocket();
        this.loadAssets();
    }

    loadAssets = async (page = 1) => {
        const response = await amsApi.get('/api/asset');
        const { docs, ...info } = response.data;
        this.setState({
            docs,
            page : info.page
        })
    }

    registerToSocket = () =>{
        const socket = io(`${config.webSocketHost}`);
        socket.on('assetPost',newAsset =>{
            this.setState({docs : [newAsset, this.state.docs]});
            this.loadAssets();
        });
    }

    render(){
        return(
            <div id='assetList'>
                {this.state.docs.map(asset =>(
                    <article key={asset._id} className='assetBox'>
                        <img src={imgMotor}
                        alt=''></img>

                        <div className='assetDescription'>
                            <div id='assetHeader'>
                                <p>Name: {asset.name}</p>
                                <span>Timestamp: {asset.createdAt} </span>
                            </div>                            
                            <p>Status: {asset.status}</p>
                            <p>Type: {asset.type} </p>
                        </div>

                    </article>
                ))}
            </div>
        )
    }
}

export default Assets;