import PropTypes from 'prop-types'
import React, { Component } from 'react'
import classNames from 'classnames'
import MessageList from './MessageList'
import UserInput from './UserInput'
import Header from './Header'

class ChatWindow extends Component {

  onUserInputSubmit(message) {
    const { onUserInputSubmit } = this.props
    onUserInputSubmit(message)
  }

  render() {
    const {
      messageList = [],
      isOpen
    } = this.props
    const classList = classNames('sc-chat-window', isOpen ? 'opened' : 'closed')
    return (
      <div className={classList}>
        <Header
          {...this.props}
        />
        <MessageList
          messages={messageList}
          {...this.props}
        />
        <UserInput
          {...this.props}
          onSubmit={message => this.onUserInputSubmit(message)}
        />
      </div>
    )
  }
}

ChatWindow.propTypes = {
  showEmoji: PropTypes.bool
}

export default ChatWindow
