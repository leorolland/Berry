import React, { Component } from 'react';
import './app.css';
import Explore from './Explore';
import Header from './Header'
import { io } from 'socket.io-client';
import Cookies from 'js-cookie';
import { SocketContext } from "./context/SocketContext";
import { NavigationContext } from "./context/NavigationContext";
import { BottomBar } from "./BottomBar";

export default class App extends Component {

  constructor() {
    super();
    this.changeCurrentPage = newPage => {
      this.setState({
        navigation: {
          currentPage: newPage,
          changeCurrentPage: this.changeCurrentPage
        }
      })
    }
    const s = io()
    this.state = {
      socket: s,
      navigation: {
        currentPage: "explore",
        changeCurrentPage: this.changeCurrentPage
      }
    };
    s.emit('authenticate', Cookies.get('token'));
    s.on('notAuthenticated', () => {
      s.emit('authenticate', Cookies.get('token'));
    })
  }

  render() {
    const { socket, navigation } = this.state;
    return (
      <>
        <SocketContext.Provider value={socket}>
          <NavigationContext.Provider value={navigation}>
            <Header title="Explore" />
            {navigation.currentPage}

            <Explore />
            <BottomBar></BottomBar>
          </NavigationContext.Provider>
        </SocketContext.Provider>
      </>
    );
  }
}
