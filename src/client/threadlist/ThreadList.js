import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ThreadThumbnail from './ThreadThumbnail';
import { SocketContext } from '../context/SocketContext';

export default class ThreadList extends Component {

  constructor(props) {
    super(props);
    this.state = { threads: [] };
  }

  componentDidMount() {
    const socket = this.context
    socket.emit('joinRoom', this.props.channel);
    socket.emit('getRecentThreads', this.props.channel);
    socket.on('updateThreads', (update) => {
      if (update.channel !== this.props.channel) return;
      this.setState(state => ({
        threads: [...state.threads, ...update.threads]
      }));
    });
    socket.on('newThread', (thread) => {
      this.setState(state => ({
        threads: [...state.threads, thread]
      }));
    });
  }

  componentWillUnmount() {
    const socket = this.context
    socket.emit('leaveRoom', this.props.channel)
  }

  render() {
    const { threads } = this.state;
    const { openThread, listKey } = this.props
    const threadList = threads.map(t => <ThreadThumbnail key={listKey + t.uuid} thread={t} openThread={openThread} />);
    return (
      <>
        <div className="topics">
          {threadList}
        </div>
      </>
    );
  }
}

ThreadList.contextType = SocketContext

ThreadList.propTypes = {
  channel: PropTypes.string.isRequired
};
