import React, { Component } from 'react';
import './app.css';
import Explore from './Explore';
import Header from './Header'
import { io } from 'socket.io-client';
import Cookies from 'js-cookie';
import { SocketContext } from "./SocketContext";
import BottomBar from "./BottomBar";

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
        <SocketContext.Provider value={socket}>
          <Header title="Explore"/>
          <Explore/>
          <BottomBar></BottomBar>
        </SocketContext.Provider>
      </>
    );
  }
}
