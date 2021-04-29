import React from 'react';

export default function ThreadThumbnail(props) {
  const { thread, openThread } = props;
  return (
    <div 
      onClick={() => openThread(thread.uuid)}
      className="topic">
      <div className="tags">{ thread.channel }</div>
      <div class="topic-container">
        <div class="text">
          { thread.messages[0].message }
        </div>
        <div class="arrow-container">
          <i class="arrow right"></i>
        </div>
      </div>
    </div>
  );
}
