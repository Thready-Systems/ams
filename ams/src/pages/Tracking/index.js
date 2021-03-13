import React, { Component } from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet'
import {Container} from '@material-ui/core';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import api from '../../services/amsApi';
import './index.css'
import io from 'socket.io-client';
import MarkerIcon from '../../img/markerBlue.png';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

var Icon = L.icon({
    //iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    iconUrl : MarkerIcon,
    //shadowUrl: 'leaf-shadow.png',

    iconSize:     [25, 41], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [13, 40], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-10, -90] // point from which the popup should open relative to the iconAnchor
});

export default class AssetMobile extends Component {
  state = {
    data : {},
    lat : '',
    lon : '',
    zoom: 15,
    centerMap : [-20.2,-40.2],
    minZoom : 3,
    maxZoom : 18,
    MAC_ASSET_FOR_SEARCH : '',
    options : [],
    order : {},
    assetName : '',
    orderID : ''
  }

  componentDidMount(){
    this.loadOrder();
    this.RegisterSocket();
  }

  componentDidUpdate(){

  }

  async loadOrder(){
    const {assetName,orderID} = this.props.match.params;
    this.setState({assetName});
    this.setState({orderID});
    
    const orderData = await api.get(`/api/tracking/${assetName}/${orderID}`);
    this.setState({order : orderData.data});
  }

  async loadData(){
    let {assetName} = this.props.match.params;
    if(assetName !== ''){
       const response = await api.post(`api/mobileassets/${assetName}`);
       this.setState({data: response.data});
    }
  }

  RegisterSocket(){
      const socket = io(process.env.REACT_APP_BACKEND);
      socket.on('assetPost',newAsset =>{
          if(newAsset.mac === this.state.assetName){
            this.setState({lat : newAsset.coord.lat});
            this.setState({lon : newAsset.coord.lon});
            this.loadOrder();
          }
      })
  }

  render() {
    return (
      <Container component='main' maxWidth='lg' justifyContent='center'>
        <div className='paper'>
        <div className='main-container-tracking'>
            <Map  className="map"  center={[this.state.lat,this.state.lon]} zoom={this.state.zoom} maxZoom={this.state.maxZoom} minZoom={this.state.minZoom}>
            <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
                <Marker 
                    position={[this.state.lat,this.state.lon]}
                    icon={Icon}>
                </Marker>
            </Map>
            <div className='footer'>
                <div className='columns'>
                    <div className='line'><p>Status:</p><span>{this.state.order.delivered === true ? <CheckCircleIcon style={{color : 'green'}}/> : ''}</span></div>
                    <div className='line'><p>Código:</p><span>{this.state.order.code}</span></div>
                    <div className='line'><p>Endereço:</p><span>{this.state.order.destinationAddress}</span></div>
                </div>
                <div className='columns'>
                    <div className='line'><p>Ckeck-in:</p><span>{this.state.order.checkin}</span></div>
                    <div className='line'><p>Ckeck-out:</p><span>{this.state.order.checkout}</span></div>
                    <div className='line'><p>Previsão:</p><span>{this.state.order.deadline}</span></div>
                </div>
            </div>
        </div>
      </div>
      </Container>
    )
  }
}