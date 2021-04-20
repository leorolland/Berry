import React from 'react';
import ThreadList from './threadlist/ThreadList'
import Thread from "./thread/Thread";

export default class Flux extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      openedThread: null 
    }
    this.openThread   = this.openThread.bind(this)
    this.back         = this.back.bind(this)
  }

  openThread(threadId) {
    this.setState({ openedThread: threadId })
  }

  back() {
    this.setState({ openedThread: null })
  }

  render() {
    const { openedThread } = this.state
    return (
      <>
        <h2>Flux</h2>
        {
          openedThread == null &&
          <ThreadList socket={this.props.socket} channel="main" openThread={this.openThread}/>
        }
        {
          openedThread != null &&
          <Thread socket={this.props.socket} uuid={openedThread} back={this.back}/>
        }
      </>
    )
  }
}
