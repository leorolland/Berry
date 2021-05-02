import React from 'react';
import ThreadList from './threadlist/ThreadList'
import Thread from "./thread/Thread";

export default class Explore extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      openedThread: null
    }
    this.openThread = this.openThread.bind(this)
    this.back = this.back.bind(this)
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
        {
          openedThread == null &&
          <>
            <ThreadList listKey="exploreList" channel="main" openThread={this.openThread} />
          </>
        }
        {
          openedThread != null &&
          <>
            <Thread uuid={openedThread} back={this.back} />
          </>
        }
      </>
    )
  }
}
