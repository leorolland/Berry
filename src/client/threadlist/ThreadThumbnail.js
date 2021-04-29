import React from 'react';

export default function ThreadThumbnail(props) {
  const { thread, openThread } = props;
  return (
    <div 
      onClick={() => openThread(thread.uuid)}
      className="topic">
      <div className="tags">{ thread.channel }</div>
      <div className="topic-container">
        <div className="text">
          { thread.messages[0].message }
        </div>
        <div className="arrow-container">
          <i className="arrow right"></i>
        </div>
      </div>
    </div>
  );
}
