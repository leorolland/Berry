import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactTimeAgo from 'react-time-ago'

import React from 'react';

export default function ThreadThumbnail(props) {
  const { thread, openThread } = props;
  const threadCreation = new Date(thread.messages[0].date)
  return (
    <div
      onClick={() => openThread(thread.uuid)}
      className="topic">
      <div className="tags">{thread.channel}</div>
      <div className="date">
        <ReactTimeAgo date={threadCreation} locale="fr-FR" timeStyle="twitter" />
      </div>
      <div className="topic-container">
        <div className="text">
          {thread.messages[0].message}
        </div>
        <div className="arrow-container">
          <i className="arrow right"></i>
        </div>
      </div>
    </div>
  );
}
