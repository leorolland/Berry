import React from 'react'

export default function Message(props) {
  const msg = props.message
  return (
    <div>
      <b>{msg.nickname}</b> : {msg.message}
    </div>
  )
}
