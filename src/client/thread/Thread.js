import React, { Component } from 'react';
import { SocketContext } from '../context/SocketContext';
import Message from "./Message";
import MessageInput from './MessageInput';

export default class Thread extends Component {

  constructor(props) {
    super(props);
    this.state = { threadDto: null }
  }

  componentDidMount() {
    const socket = this.context
    socket.on('updateThread', threadDto => this.setState({ threadDto }))
    socket.emit('getFullThread', this.props.uuid)
    socket.emit('joinRoom', this.props.uuid)
  }

  componentWillUnmount() {
    const socket = this.context
    socket.emit('leaveRoom', this.props.uuid)
  }

  render() {
    const { threadDto } = this.state
    if (threadDto == null) return <p>Chargement du thread...</p>
    const messages = threadDto.messages.map(m => <Message key={m.date} message={m} />)
    return (
      <>
        <div onClick={() => this.props.back()}>Retour</div>
        { messages}
        <MessageInput thread={threadDto.uuid} />
      </>
    )
  }

}

Thread.contextType = SocketContext
