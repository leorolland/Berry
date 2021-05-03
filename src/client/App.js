import React, { Component } from 'react';
import './app.css';
import Explore from './Explore';
import Header from './Header'
import { io } from 'socket.io-client';
import Cookies from 'js-cookie';
import { SocketContext } from "./context/SocketContext";
import { NavigationContext } from "./context/NavigationContext";
import { BottomBar } from "./BottomBar";
import Messages from "./Messages";

export default class App extends Component {

  constructor() {
    super();
    this.changeCurrentPage = newPage => {
      const y = window.scrollY
      this.setState(prevState => ({
        navigation: {
          ...prevState.navigation,
          scrolls: {
            ...prevState.navigation.scrolls,
            [prevState.navigation.currentPage]: y
          },
          currentPage: newPage
        }
      }))
      window.scrollTo(0, this.state.navigation.scrolls[newPage]);
    }
    const s = io()
    this.state = {
      socket: s,
      navigation: {
        currentPage: "explore",
        changeCurrentPage: this.changeCurrentPage,
        scrolls: {
          explore: 0,
          messages: 0,
          profile: 0
        },
      }
    };
    s.emit('authenticate', Cookies.get('token'));
    s.on('notAuthenticated', () => {
      s.emit('authenticate', Cookies.get('token'));
    })
    this.getXOffset = this.getXOffset.bind(this)
  }

  getXOffset(page) {
    const { currentPage } = this.state.navigation
    if (currentPage == page)
      return "0%"
    switch (page) {
      case "explore":
        return "-100%"
      case "messages":
        if (currentPage == "explore")
          return "+100%"
        else
          return "-100%"
      case "profile":
        return "+100%"
    }
  }

  render() {
    const { socket, navigation } = this.state;
    const { currentPage } = navigation
    return (
      <>
        <SocketContext.Provider value={socket}>
          <NavigationContext.Provider value={navigation}>
            <Header title={currentPage} />
            <div className='page' style={{ transform: `translateX(${this.getXOffset('explore')})` }}>
              <Explore />
            </div>
            <div className='page' style={{ transform: `translateX(${this.getXOffset('messages')})` }}>
              <Messages />
            </div>
            <BottomBar></BottomBar>
          </NavigationContext.Provider>
        </SocketContext.Provider>
      </>
    );
  }
}
