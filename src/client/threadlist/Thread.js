import React from 'react';

export default function Thread(props) {
  const { thread } = props;
  return <div>{ thread.messages[0].message }</div>;
}
