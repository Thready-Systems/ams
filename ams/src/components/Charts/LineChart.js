import React, { PureComponent } from 'react';
import amsApi from '../../services/amsApi';
import io from 'socket.io-client';

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

export default class Example extends PureComponent {

  state = {
    docs : []
  }

  componentDidMount(){
    this.LoadData();
    this.RegisterSocket();
  }

  async RegisterSocket(){
    const socket = io(process.env.REACT_APP_BACKEND);
    socket.on('assetPost', newasset =>{
      this.setState({docs : [newasset,...this.state.docs]});
      this.LoadData();
    })
  }

  async LoadData(){
    const response = await amsApi.get('api/asset');
    const { docs } = await response.data;
    this.setState({docs});
  }

  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/xqjtetw0/';

  render() {
    return (
      <LineChart
        width={1000}
        height={250}
        data={this.state.docs}
        margin={{
          top: 10, right: 0, left: 30, bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="createdAt" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="name" stroke="#82ca9d" />

      </LineChart>
    );
  }
}
