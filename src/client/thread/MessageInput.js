import React, { Component } from 'react';
import { SocketContext } from '../SocketContext';

export default class MessageInput extends Component {

  constructor(props) {
    super(props);
    this.send = this.send.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  send(msg) {
    const socket = this.context
    socket.emit('sendMessage', {
      thread: this.props.thread,
      message: msg
    })
  }

  handleKeyPress(e) {
    if (e.key != 'Enter') return
    this.send(e.target.value)
    e.target.value = ""
  }

  render() {
    return (
      <>
        <input type="text" onKeyPress={this.handleKeyPress} placeholder="Votre message..."></input>
      </>
    )
  }

}

MessageInput.contextType = SocketContext
