import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ThreadThumbnail from './ThreadThumbnail';
import ThreadInput from './ThreadInput';
import { SocketContext } from '../SocketContext';

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

  render() {
    const { threads } = this.state;
    const openThread = this.props.openThread
    const threadList = threads.map(t => <ThreadThumbnail key={t.uuid} thread={t} openThread={openThread} />);
    return (
      <>
        <div className="topics">
          {threadList}
        </div>
        <ThreadInput/>
      </>
    );
  }
}

ThreadList.contextType = SocketContext

ThreadList.propTypes = {
  channel: PropTypes.string.isRequired
};
