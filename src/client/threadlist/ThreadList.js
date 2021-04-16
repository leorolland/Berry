import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ThreadThumbnail from './ThreadThumbnail';

export default class ThreadList extends Component {
  constructor(props) {
    super(props);
    props.socket.emit('joinRoom', props.channel);
    props.socket.emit('getRecentThreads', props.channel);
    props.socket.on('updateThreads', (update) => {
      if (update.channel !== props.channel) return;
      this.setState(state => ({
        threads: [...state.threads, ...update.threads]
      }));
    });
    props.socket.on('newThread', (thread) => {
      this.setState(state => ({
        threads: [...state.threads, thread]
      }));
    });
    this.state = { threads: [] };

    props.socket.emit('createThread', { channel: props.channel, message: 'hello world' });
  }

  render() {
    const { threads } = this.state;
    console.log(threads);
    const threadList = threads.map(t => <ThreadThumbnail key={t.id} thread={t} />);
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
