import React from 'react';

export default function ThreadThumbnail(props) {
  const { thread, openThread } = props;
  return <div onClick={() => openThread(thread.uuid)}>{ thread.messages[0].message }</div>;
}
