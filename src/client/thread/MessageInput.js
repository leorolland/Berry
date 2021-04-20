import React, { Component } from 'react';

export default class MessageInput extends Component {

  constructor(props) {
    super(props);
    this.send = this.send.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  send(msg) {
    this.props.socket.emit('sendMessage', {
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
