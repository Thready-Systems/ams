import amsApi from '../../services/amsApi';
import io from 'socket.io-client';

import React, { PureComponent } from 'react';
import {
  PieChart, Pie, Tooltip,
} from 'recharts';

export default class Example extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/k9jkog04/';

  state = {
    docs : []
  }

  componentDidMount(){
    this.LoadData();
    this.RegisterSocket();
  }

  async LoadData(){
    const response = await amsApi.get('api/asset');
    const { docs } = await response.data;
    this.setState({docs});
  }

  async RegisterSocket(){
    const socket = io(process.env.REACT_APP_BACKEND);
    socket.on('assetPost',newasset =>{
      this.setState({docs : [newasset,...this.state.docs]});
      this.LoadData();
    })
  }

  render() {
    return (
      <PieChart 
      width={400} height={250} 
      margin={{
        top: 20, right: 0, left: 0, bottom: 0,
      }} 
      >
        <Pie dataKey="value" isAnimationActive={false} data={this.state.docs} cx={200} cy={100} outerRadius={80} fill="#8884d8" label />
        <Tooltip />
      </PieChart>
    );
  }
}