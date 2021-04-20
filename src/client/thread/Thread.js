import React, { Component } from 'react';
import Message from "./Message";
import MessageInput from './MessageInput';

export default class Thread extends Component {

  constructor(props) {
    super(props);
    props.socket.on('updateThread', threadDto => this.setState({ threadDto }))
    props.socket.emit('getFullThread', props.uuid)
    props.socket.emit('joinRoom', props.uuid)
    this.state = { threadDto: null }
  }

  render() {
    const { threadDto } = this.state
    if (threadDto == null) return <p>Chargement du thread...</p>
    const messages = threadDto.messages.map(m => <Message key={m.date} message={m}/>)
    return (
      <>
        <div onClick={() => this.props.back()}>Retour</div>
        { messages }
        <MessageInput socket={this.props.socket} thread={threadDto.uuid}/>
      </>
    )
  }

}
