import React, { Component } from 'react'
import TextMessage from './TextMessage'
import EmojiMessage from './EmojiMessage'
import chatIconUrl from './../../assets/chat-icon.svg'


class Message extends Component {
  _renderMessageOfType(type) {
    const { message, timeFormat } = this.props
    switch (type) {
      case 'text':
        return <TextMessage {...this.props} />
      case 'emoji':
        return <EmojiMessage {...this.props} />
    }
  }

  render() {
    const {
      message: { authorInfo, type },
      authorInfo: { id: authorId }
    } = this.props
    const typeClass = authorInfo && authorInfo.id === authorId ? 'sent' : 'received'
    return (
      <div className='sc-message'>
        <div className={`sc-message--content ${typeClass}`}>
          <div
            className='sc-message--avatar'
            style={{
            backgroundImage: `url(${chatIconUrl})`
          }}
          />
          {this._renderMessageOfType(type)}
        </div>
      </div>)
  }
}

export default Message
