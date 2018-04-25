import React, { Component } from 'react'
import isFunction from 'lodash/isFunction'
import isString from 'lodash/isString'
import TextMessage from './TextMessage'
import EmojiMessage from './EmojiMessage'
import chatIconUrl from './../../assets/chat-icon.svg'

class Message extends Component {
  _renderMessageOfType(type) {
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
      authorInfo: { id: authorId },
      messageComponent,
      avatar
    } = this.props
    const typeClass = authorInfo && authorInfo.id === authorId ? 'sent' : 'received'
    const isCustomAvatar = isFunction(avatar) && avatar()
    const avatarIcon = isString(avatar) ? avatar : chatIconUrl
    const messageContent = isFunction(messageComponent) ? messageComponent() :
      (<div className='sc-message'>
        <div className={`sc-message--content ${typeClass}`}>
          {isCustomAvatar || <div
            className='sc-message--avatar'
            style={{
                backgroundImage: `url(${avatarIcon})`
              }}
          />
          }
          {this._renderMessageOfType(type)}
        </div>
       </div>)
    return messageContent
  }
}

export default Message
