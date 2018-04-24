import PropTypes from 'prop-types'
import React, { Component } from 'react'
import moment from 'moment'
import SendIcon from './icons/SendIcon'
import EmojiIcon from './icons/EmojiIcon'
import EmojiPicker from './emoji-picker/EmojiPicker'

const caret = oField => {
  console.log(oField)
  // Initialize
  let iCaretPos = 0

  // IE Support
  if (document.selection) {

    // Set focus on the element
    oField.focus()

    // To get cursor position, get empty selection range
    const oSel = document.selection.createRange()

    // Move selection start to 0 position
    oSel.moveStart('character', -oField.textContent.length)

    // The caret position is selection length
    iCaretPos = oSel.text.length
  } else if (oField.selectionStart || oField.selectionStart == '0') {

    // Firefox support
    iCaretPos = oField.selectionStart
  }

  // Return results
  return iCaretPos
}


class UserInput extends Component {
  constructor() {
    super()
    this.state = {
      inputActive: false
    }
  }

  handleKey(event) {
    if (event.keyCode === 13 && !event.shiftKey) {
      this._submitText(event)
    }
  }

  _submitText(event) {
    event.preventDefault()
    const text = this.userInput.textContent
    const { authorInfo } = this.props
    if (text && text.length > 0) {
      const info = {
        authorInfo,
        authorType: 'me',
        type: 'text',
        data: { text },
        timestamp: moment().unix()
      }
      this.props.onSubmit(info)
      this.userInput.innerHTML = ''
    }
  }

  _handleEmojiPicked(emoji) {
    // @TODO здесь нужно дописать код по ставке в нужное место
    const text = this.userInput.textContent
    this.caretPosition = caret(this.userInput)
    console.log(this.caretPosition)
    this.userInput.innerHTML += emoji
    setTimeout(() => document.querySelector('.sc-user-input--text').focus(), 1000)
  }

  render() {
    return (
      <form className={`sc-user-input ${(this.state.inputActive ? 'active' : '')}`}>
        <textarea
          tabIndex='0'
          onFocus={() => { this.setState({ inputActive: true }) }}
          onBlur={() => { this.setState({ inputActive: false }) }}
          ref={e => { this.userInput = e }}
          onKeyDown={this.handleKey.bind(this)}
          contentEditable='true'
          placeholder='Write a reply...'
          className='sc-user-input--text'
        />
        <div className='sc-user-input--buttons'>
          <div className='sc-user-input--button'>
            {this.props.showEmoji &&
            <EmojiIcon onEmojiPicked={this._handleEmojiPicked.bind(this)} />}
          </div>
          <div className='sc-user-input--button'>
            <SendIcon onClick={this._submitText.bind(this)} />
          </div>
        </div>
      </form>
    )
  }
}

UserInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  showEmoji: PropTypes.bool
}

export default UserInput
