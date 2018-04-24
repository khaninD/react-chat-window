import PropTypes from 'prop-types'
import React, { Component } from 'react'
import classNames from 'classnames'
import ChatWindow from './ChatWindow'
import launcherIcon from './../assets/logo-no-bg.svg'
import launcherIconActive from './../assets/close-icon.png'

class Launcher extends Component {
  constructor() {
    super()
    this.state = {
      isOpen: false
    }
  }

  handleClick() {
    const { handleClick } = this.props
    const { isOpen } = this.state
    if (handleClick !== undefined) {
      handleClick()
    } else {
      this.setState({
        isOpen: !isOpen
      }, () => {
        setTimeout(()=> {
          const el = document.querySelector('.sc-user-input--text')
          console.log(el.focus)
          el.focus()
        }, 1000)
      })
    }
  }

  render() {
    const { onMessageWasSent, newMessagesCount } = this.props
    const isOpen = this.props.hasOwnProperty('isOpen') ? this.props.isOpen : this.state.isOpen
    const classList = classNames({
      'sc-launcher': true,
      opened: isOpen
    })
    return (
      <div>
        <div className={classList} onClick={() => this.handleClick()} role='button'>
          <MessageCount count={newMessagesCount} isOpen={isOpen} />
          <img className='sc-open-icon' src={launcherIconActive} alt='Chat logo' />
          <img className='sc-closed-icon' src={launcherIcon} alt='Chat logo' />
        </div>
        <ChatWindow
          onUserInputSubmit={onMessageWasSent}
          isOpen={isOpen}
          onClose={() => this.handleClick()}
          {...this.props}
        />
      </div>
    )
  }
}

const MessageCount = props => {
  if (props.count === 0 || props.isOpen === true) { return null }
  return (
    <div className='sc-new-messsages-count'>
      {props.count}
    </div>
  )
}

Launcher.propTypes = {
  onMessageWasReceived: PropTypes.func,
  onMessageWasSent: PropTypes.func,
  newMessagesCount: PropTypes.number,
  isOpen: PropTypes.bool,
  handleClick: PropTypes.func,
  messageList: PropTypes.arrayOf(PropTypes.object),
  showEmoji: PropTypes.bool
}

Launcher.defaultProps = {
  newMessagesCount: 0,
  showEmoji: true
}

export default Launcher
