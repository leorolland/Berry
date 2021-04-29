import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ThreadThumbnail from './ThreadThumbnail';
import ThreadInput from './ThreadInput';

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
  }

  render() {
    const { threads } = this.state;
    const openThread = this.props.openThread
    const threadList = threads.map(t => <ThreadThumbnail key={t.uuid} thread={t} openThread={openThread} />);
    return (
      <>
        <div className="topics">
          {threadList}
        </div>
        <ThreadInput socket={this.props.socket} />
      </>
    );
  }
}

ThreadList.propTypes = {
  socket: PropTypes.object.isRequired,
  channel: PropTypes.string.isRequired
};
