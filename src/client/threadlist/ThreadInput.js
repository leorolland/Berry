import React, { Component } from 'react';
import { SocketContext } from "../context/SocketContext";
import { Button } from "../tools/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default class ThreadInput extends Component {

  constructor(props) {
    super(props);
    this.state = {
      channel: props.channel,
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
      this.setState({ invalidInput: true })
      return
    }
    this.reset()
    this.context.emit('createThread', { channel, message });
    this.props.back()
  }

  reset() {
    this.setState({
      channel: this.props.channel,
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
      <div className="fullScreen">
        <h2>Créer un thread</h2>
        <input type="text" value={this.state.channel} onChange={this.onChannelChange} placeholder="main, animaux, rencontre, astuce, débat, ..."></input>
        <div className="fullHeightTextarea">
          <textarea value={this.state.message} onChange={this.onMessageChange} placeholder="Lancez une discussion..."></textarea>
        </div>
        {
          invalidInput &&
          <p>Le canal doit contenir au moins 2 caractères et le message 1 caractère</p>
        }
        <div className="rightAlignedItems">
          <Button onClick={this.props.back} addClasses="btn-wide">
            <FontAwesomeIcon icon={faArrowLeft} /> Retour
          </Button>
          <Button onClick={this.send} addClasses="btn-wide btn-confirm">
            Créer
          </Button>
        </div>
      </div>
    )
  }
}

ThreadInput.contextType = SocketContext