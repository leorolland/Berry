import React from 'react';
import ThreadList from './threadlist/ThreadList'
import Thread from "./thread/Thread";
import { CreateThread } from "./threadlist/CreateThread";
import ThreadInput from './threadlist/ThreadInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default class Explore extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      openedThread: null,
      creatingThread: false
    }
    this.openThread = this.openThread.bind(this)
    this.toggleCreateThread = this.toggleCreateThread.bind(this)
    this.back = this.back.bind(this)
  }

  openThread(threadId) {
    this.setState({ openedThread: threadId })
  }

  back() {
    this.setState({ openedThread: null })
  }

  toggleCreateThread() {
    if (!this.state.creatingThread) window.scrollTo(0, 0)
    this.setState(prev => ({ creatingThread: !prev.creatingThread }))
  }

  render() {
    const { openedThread, creatingThread } = this.state
    return (
      <>
        {
          openedThread == null ?
            <>
              { !creatingThread && <div onClick={this.toggleCreateThread}><CreateThread /></div>}
              <div style={{ display: creatingThread ? 'block' : 'none' }}>
                <ThreadInput channel="main" back={this.toggleCreateThread} />
              </div>
              <div style={{ display: creatingThread ? 'none' : 'block' }}>
                <ThreadList listKey="exploreList" channel="main" openThread={this.openThread} />
              </div>
            </>
            :
            <Thread uuid={openedThread} back={this.back} />
        }
      </>
    )
  }
}
