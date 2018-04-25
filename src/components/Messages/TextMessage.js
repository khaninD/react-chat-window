import React from 'react'
import moment from 'moment'

const TextMessage = props => {
  const { message: { data: { text }, timestamp }, authorInfo, timeFormat } = props
  const messageTime = moment.unix(timestamp).format(timeFormat)
  return (
    <div className='sc-message--text'>
      <div className='header-message'>
        <div className='authorInfo-container'>
          <span className='author-username'>{authorInfo && authorInfo.firstName}</span>
          <span className='author-lastname'>{authorInfo && authorInfo.lastName}</span>
        </div>
      </div>
      <div className='content'>{text}</div>
      <div className='footer-message'>
        <span className='timestamp'>{messageTime}</span>
      </div>
    </div>
  )
}

export default TextMessage