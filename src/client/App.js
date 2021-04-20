import React, { Component } from 'react';
import './app.css';
import Flux from './Flux';
import { io } from 'socket.io-client';
import Cookies from 'js-cookie';

export default class App extends Component {
  constructor() {
    super();
    const s = io();
    this.state = { socket: s };
    s.emit('authenticate', Cookies.get('token'));
    s.on('notAuthenticated', () => {
      s.emit('authenticate', Cookies.get('token'));
    })
  }

  render() {
    const { socket } = this.state;
    return (
      <>
        <Flux socket={socket}/>
      </>
    );
  }
}
