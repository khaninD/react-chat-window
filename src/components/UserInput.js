import PropTypes from 'prop-types'
import React, { Component } from 'react'
import moment from 'moment'
import SendIcon from './icons/SendIcon'
import EmojiIcon from './icons/EmojiIcon'

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
      inputActive: false,
      messageValue: ''
    }
  }

  handleKey(event) {
    if (event.keyCode === 13 && !event.shiftKey) {
      this._submitText(event)
    }
  }

  handleChange(e) {
    const { target: { value } } = e
    this.setState({
      messageValue: value
    })
  }

  _submitText(event) {
    event.preventDefault()
    const text = this.userInput.value
    const { authorInfo, onSubmit } = this.props
    if (text && text.length > 0) {
      const info = {
        authorInfo,
        authorType: 'me',
        type: 'text',
        data: { text },
        timestamp: moment().unix()
      }
      onSubmit(info)
      this.setState({
        messageValue: ''
      })
    }
  }

  _handleEmojiPicked(emoji) {
    const { value } = this.userInput
    this.caretPosition = caret(this.userInput)
    const textBeforeCaret = value.slice(0, this.caretPosition)
    const textAfterCaret = value.slice(this.caretPosition)
    const resultValue = textBeforeCaret.concat(emoji, textAfterCaret)
    this.setState({
      messageValue: resultValue
    }, () => {
      this.userInput.setSelectionRange(
        this.caretPosition + emoji.length,
        this.caretPosition + emoji.length
      )
      this.userInput.focus()
    })
  }

  render() {
    const { placeholder } = this.props
    const { messageValue } = this.state
    return (
      <form className={`sc-user-input ${(this.state.inputActive ? 'active' : '')}`}>
        <textarea
          tabIndex='0'
          value={messageValue}
          onFocus={() => { this.setState({ inputActive: true }) }}
          onBlur={() => { this.setState({ inputActive: false }) }}
          ref={e => { this.userInput = e }}
          onKeyDown={e => this.handleKey(e)}
          onChange={e => this.handleChange(e)}
          placeholder={placeholder}
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
