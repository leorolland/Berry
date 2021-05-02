import React, { Component } from 'react';
import { SocketContext } from "../context/SocketContext";

export default class ThreadInput extends Component {

  constructor(props) {
    super(props);
    this.state = {
      channel: '',
      message: '',
      invalidInput: false
    }
    this.send = this.send.bind(this)
    this.reset = this.reset.bind(this)
    this.onChannelChange = this.onChannelChange.bind(this)
    this.onMessageChange = this.onMessageChange.bind(this)
  }

  send() {
    const channel = this.state.channel.trim()
    const message = this.state.message.trim()
    if (channel.length < 2 || message.length < 1) {
      this.reset()
      return
    }
    this.context.emit('createThread', { channel, message });
  }

  reset() {
    this.setState({
      channel: '',
      message: '',
      invalidInput: false
    })
  }

  onChannelChange(e) {
    this.setState({ channel: e.target.value })
  }

  onMessageChange(e) {
    this.setState({ message: e.target.value })
  }

  render() {
    const { invalidInput } = this.state
    return (
      <>
        {
          invalidInput &&
          <p>Le canal doit contenir au moins 2 caractères et le message 1 caractère</p>
        }
        <h3>Créer un thread</h3>
        <input type="text" value={this.state.channel} onChange={this.onChannelChange} placeholder="main, animaux, rencontre, astuce, débat, ..."></input>
        <input type="text" value={this.state.message} onChange={this.onMessageChange} placeholder="Lancez une discussion..."></input>
        <span className="btn" onClick={this.send}>Créer</span>
      </>
    )
  }
}

ThreadInput.contextType = SocketContext