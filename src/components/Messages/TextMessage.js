import React from 'react'
import moment from 'moment'
import isFunction from 'lodash/isFunction'
import isString from 'lodash/isString'

const TextMessage = props => {
  const { message: { data: { text }, timestamp }, authorInfo, timeFormat, messageItem } = props
  const messageTime = moment.unix(timestamp).format(timeFormat)
  const messageComponent = isFunction(messageItem) ? messageItem(text, messageTime) :
    <div className='sc-message--text'>
      <div className='header-message'>
        <div className='authorInfo-container'>
          <span className='author-username'>{authorInfo && authorInfo.firstName}</span>
          <span className='author-lastname'>{authorInfo && authorInfo.lastName}</span>
        </div>
        <div className='time-container'>
          <span>{messageTime}</span>
        </div>
      </div>
      <div className='content'>{text}</div>
    </div>
  return messageComponent
}

export default TextMessage