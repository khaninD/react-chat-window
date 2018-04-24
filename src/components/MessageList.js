import React, { Component } from 'react'
import Message from './Messages'

class MessageList extends Component {
  componentDidUpdate(prevProps, prevState) {
    this.scrollList.scrollTop = this.scrollList.scrollHeight
  }

  render() {
    const { messages } = this.props
    return (
      <div className='sc-message-list' ref={el => this.scrollList = el}>
        {messages.map((message, i) =>
          <Message {...this.props} message={message} key={i} />)}
      </div>)
  }
}

export default MessageList
