import React from 'react';

export default function ThreadThumbnail(props) {
  const { thread } = props;
  return <div>{ thread.messages[0].message }</div>;
}
