import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Thread from './Thread';

export default class ThreadList extends Component {
  constructor(props) {
    super(props);
    const room = `channel/${props.channel}`;
    props.socket.emit('joinRoom', room);
    props.socket.on('newThread', (thread) => {
      this.setState(state => ({
        threads: [...state.threads, thread]
      }));
    });
    this.state = { threads: [] };

    props.socket.emit('createThread', { room, message: 'hello world' });
  }

  render() {
    const { threads } = this.state;
    console.log(threads);
    const threadList = threads.map(t => <Thread key={t.id} thread={t} />);
    return (
      <div>
        threadList :
        { threadList }
      </div>
    );
  }
}

ThreadList.propTypes = {
  socket: PropTypes.object.isRequired,
  channel: PropTypes.string.isRequired
};
