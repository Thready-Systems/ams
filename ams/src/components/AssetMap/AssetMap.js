import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet';
import amsApi from '../../services/amsApi';
import './AssetMap.css'
import io from 'socket.io-client';

var IconRed = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'leaf-shadow.png',

    iconSize:     [25, 41], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-10, -90] // point from which the popup should open relative to the iconAnchor
});

var IconGrey = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png',
  shadowUrl: 'leaf-shadow.png',

  iconSize:     [25, 41], // size of the icon
  shadowSize:   [50, 64], // size of the shadow
  iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
  shadowAnchor: [4, 62],  // the same for the shadow
  popupAnchor:  [-10, -90] // point from which the popup should open relative to the iconAnchor
});

var IconYellow = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
  shadowUrl: 'leaf-shadow.png',

  iconSize:     [25, 41], // size of the icon
  shadowSize:   [50, 64], // size of the shadow
  iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
  shadowAnchor: [4, 62],  // the same for the shadow
  popupAnchor:  [-10, -90] // point from which the popup should open relative to the iconAnchor
});

var IconGreen = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'leaf-shadow.png',

    iconSize:     [25, 41], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-10, -90] // point from which the popup should open relative to the iconAnchor
});

export default class AssetMap extends Component {
  state = {
    docs : [],
    zoom: 5,
    centerMap : [-20.2,-40.2],
    minZoom : 3,
    maxZoom : 18,
  }

  componentDidMount(){
      this.RegisterSocket();
      this.loadData();
  }

  async loadData(){
    const response = await amsApi.get('api/asset');
    const { docs } = response.data;
    this.setState({docs});
  }

  RegisterSocket(){
      const socket = io(process.env.REACT_APP_BACKEND);
      socket.on('assetPost',newAsset =>{
          this.setState({docs : [newAsset,...this.state.docs]});
          this.loadData();
      })
  }

  render() {
    return (
      <Map  className="map"  style={{height : '530px'}} center={this.state.centerMap} zoom={this.state.zoom} maxZoom={this.state.maxZoom} minZoom={this.state.minZoom}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {this.state.docs.map(asset=>{
          if(asset.status === 'ok'){
            return (
              <Marker 
                key={asset._id}
                position={[asset.coord.lat,asset.coord.lon]}
                icon={IconGreen}>
                <Popup>
                ID: {asset.mac} <br/>
                  Localização: {asset.name} <br/>
                  Status: {asset.status} <br/>
                  Tipo: {asset.type} <br/>
                  Última manutenção: {asset.lastRepair} <br/>
                  Próxima manutenção: {asset.nextRepair} <br/>
                  Temperatura: {asset.temp} <br/>
                  Pressão: {asset.pression} <br/>
                </Popup>
              </Marker>
            )
          } else if(asset.status === 'error'){
            return(
              <Marker
                key={asset._id}
                position={[asset.coord.lat,asset.coord.lon]}
                icon={IconRed}>
                <Popup>
                  ID: {asset.mac} <br/>
                  Localização: {asset.name} <br/>
                  Status: {asset.status} <br/>
                  Tipo: {asset.type} <br/>
                  Última manutenção: {asset.lastRepair} <br/>
                  Próxima manutenção: {asset.nextRepair} <br/>
                  Temperatura: {asset.temp} <br/>
                  Pressão: {asset.pression} <br/>
                </Popup>
              </Marker>
            )
          } else if(asset.status === 'warning'){
            return(
              <Marker
                key={asset._id}              
                position={[asset.coord.lat,asset.coord.lon]}
                icon={IconYellow}>
                <Popup>
                ID: {asset.mac} <br/>
                  Localização: {asset.name} <br/>
                  Status: {asset.status} <br/>
                  Tipo: {asset.type} <br/>
                  Última manutenção: {asset.lastRepair} <br/>
                  Próxima manutenção: {asset.nextRepair} <br/>
                  Temperatura: {asset.temp} <br/>
                  Pressão: {asset.pression} <br/>
                </Popup>
              </Marker>
            )
          } else if(asset.status === 'inactive'){
            return(
              <Marker 
                key={asset._id}
                position={[asset.coord.lat,asset.coord.lon]}
                icon={IconGrey}>
                <Popup>
                ID: {asset.mac} <br/>
                  Localização: {asset.name} <br/>
                  Status: {asset.status} <br/>
                  Tipo: {asset.type} <br/>
                  Última manutenção: {asset.lastRepair} <br/>
                  Próxima manutenção: {asset.nextRepair} <br/>
                  Temperatura: {asset.temp} <br/>
                  Pressão: {asset.pression} <br/>
                </Popup>
              </Marker>
            )
          }
          return 0;
        })}
      </Map>
    )
  }
}