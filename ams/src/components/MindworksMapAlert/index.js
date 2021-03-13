import React,{ Component } from 'react';
import './index.css';
import amsApi from '../../services/amsApi';
import io from 'socket.io-client';

class MindworksMapAlert extends Component{
    state = {
        docs : [],
        sala0 :{
            backgroundColor : "#acacac",
            height: '250px',
            width : '150px',
            borderRadius : '185px 0px 0px 0px',
            padding : '20px',
            margin: '-3px 0px 0px -3px',
            border : '3px solid #8d8d8d',
        },
        sala1 :{
            backgroundColor : "#acacac",
            height: '250px',
            width : '150px',
            padding : '20px',
            margin: '-3px 0px 0px -25px',
            border : '3px solid #8d8d8d',
        },
        sala2 :{
            backgroundColor : "#acacac",
            height: '250px',
            width : '150px',
            padding : '20px',
            margin: '-3px 0px 0px -25px',
            border : '3px solid #8d8d8d',
        },
        sala3 :{
            backgroundColor : "#acacac",
            height: '250px',
            width : '150px',
            padding : '20px',
            margin: '-3px 0px 0px -25px',
            border : '3px solid #8d8d8d',
        },
        sala4 :{
            backgroundColor : "#acacac",
            height: '150px',
            width : '150px',
            padding : '20px',
            margin: '-3px 0px 0px -3px',
            border : '3px solid #8d8d8d',
        },
        sala5 :{
            backgroundColor : "#acacac",
            height: '400px',
            width : '150px',
            padding : '20px',
            margin: '-3px -3px 0px -3px',
            border : '3px solid #8d8d8d',
        },
    }

    componentDidMount(){
        this.loadData();
        this.registerSocket();
    }

    async loadData(){
        const response = await amsApi.get('/api/asset');
        const {docs} = response.data;
        this.setState({docs});
        //console.log(docs);
    }

    registerSocket(){
        const socket = io(process.env.REACT_APP_BACKEND);
        socket.on('assetPost',newAsset=>{
            this.setState({docs : newAsset});
            console.log(newAsset.mac);
            if(newAsset.mac === 'aaa1155'){
                this.setState({sala1 : {...this.state.sala1,backgroundColor : "#acacac"}})
                this.setState({sala2 : {...this.state.sala2,backgroundColor : "#acacac"}})
                this.setState({sala3 : {...this.state.sala3,backgroundColor : "#acacac"}})
                this.setState({sala4 : {...this.state.sala4,backgroundColor : "#acacac"}})
                this.setState({sala5 : {...this.state.sala5,backgroundColor : "#acacac"}})
            }else if(newAsset.mac === 'aaa1122'){
                this.setState({sala1 : {...this.state.sala1,backgroundColor : "#acacac"}})
                this.setState({sala2 : {...this.state.sala2,backgroundColor : "#acacac"}})
                this.setState({sala3 : {...this.state.sala3,backgroundColor : "#acacac"}})
                this.setState({sala4 : {...this.state.sala4,backgroundColor : "#54ebd2"}})
                this.setState({sala5 : {...this.state.sala5,backgroundColor : "#acacac"}})
            }else if(newAsset.mac === 'aaa1123'){
                this.setState({sala1 : {...this.state.sala1,backgroundColor : "#acacac"}})
                this.setState({sala2 : {...this.state.sala2,backgroundColor : "#acacac"}})
                this.setState({sala3 : {...this.state.sala3,backgroundColor : "#54ebd2"}})
                this.setState({sala4 : {...this.state.sala4,backgroundColor : "#acacac"}})
                this.setState({sala5 : {...this.state.sala5,backgroundColor : "#acacac"}})
            }
            
            //this.loadData();
        });
    }

    render(){
        return(
            <div id='mindworksMap'>
            <div style={this.state.sala0}></div>
            <div style={this.state.sala1}></div>
            <div style={this.state.sala2}></div>
            <div style={this.state.sala3}></div>
            <div style={this.state.sala4}></div>
            <div style={this.state.sala5}></div>
           
            {/* {this.state.docs.map(asset=>{
                if(asset.mac === "aaa1166"){
                    styles.sala1.backgroundColor = '#54ebd2';
                }else if(asset.mac === "aaa1155"){
                    styles.sala2.backgroundColor = '#54ebd2';
                } 
            })} */}
            
            </div>
        )
    }
}

export default MindworksMapAlert;
