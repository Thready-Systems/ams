import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import './Map.css'


export default class AssetMap extends Component {
  state = {
    docs : [],
    zoom: 5,
    centerMap : [-20.2,-40.2],
    minZoom : 3,
    maxZoom : 18,
  }

  render() {
    return (
      <Map className="map" center={this.state.centerMap} zoom={this.state.zoom} maxZoom={this.state.maxZoom} minZoom={this.state.minZoom}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      
      </Map>
    )
  }
}