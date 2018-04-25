import React, { Component } from 'react'
import EmojiConvertor from 'emoji-js'
import emojiData from './emojiData'


class EmojiPicker extends Component {
  constructor() {
    super()
    this.emojiConvertor = new EmojiConvertor()
    this.emojiConvertor.init_env()
  }

  componentDidMount() {
    const { hideEmojiPicker } = this.props
    const elem = this.domNode
    elem.style.opacity = 0
    window.requestAnimationFrame(() => {
      elem.style.transition = 'opacity 350ms'
      elem.style.opacity = 1
    })
    this.domNode.focus()
    this.checkToShowEmojiPicker = e => {
      const { target } = e
      const emodjiContainer = document.querySelector('.sc-emoji-picker')
      if (!emodjiContainer.contains(target)) {
        hideEmojiPicker()
      }
    }
    document.addEventListener('click', this.checkToShowEmojiPicker)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.checkToShowEmojiPicker)
  }

  render() {
    return (
      <div
        tabIndex='0'
        onBlur={this.props.onBlur}
        className='sc-emoji-picker'
        ref={e => { this.domNode = e }}
      >
        <div className='sc-emoji-picker--content'>
          {emojiData.map(category => (
            <div className='sc-emoji-picker--category' key={category.name}>
              <div className='sc-emoji-picker--category-title'>{category.name}</div>
              {category.emojis.map(emoji => (
                <span
                  key={emoji}
                  className='sc-emoji-picker--emoji'
                  onClick={() => {
                        this.props.onEmojiPicked(emoji)
                        this.domNode.blur()
                      }}
                >
                  {emoji}
                </span>
                  ))}
            </div>
            ))}
        </div>
      </div>
    )
  }
}

export default EmojiPicker
