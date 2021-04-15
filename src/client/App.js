import React, { Component } from 'react';
import './app.css';
import { io } from 'socket.io-client';
import Cookies from 'js-cookie';
import ThreadList from './threadlist/ThreadList';

export default class App extends Component {
  constructor() {
    super();
    const s = io();
    this.state = { socket: s };
    s.emit('authenticate', Cookies.get('token'));
  }

  render() {
    const { socket } = this.state;
    return (
      <ThreadList socket={socket} channel="main" />
    );
  }
}
