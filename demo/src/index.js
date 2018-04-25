import React, { Component } from 'react'
import { render } from 'react-dom'
import { Launcher } from '../../src'
import messageHistory from './messageHistory'
import TestArea from './TestArea'
import Header from './Header'
import Footer from './Footer'
import monsterImgUrl from './../assets/monster.png'
import Highlight from 'react-highlight.js'
import './../assets/styles'


class Demo extends Component {
  constructor() {
    super()
    this.state = {
      messageList: messageHistory,
      newMessagesCount: 0,
      isOpen: false
    }
    this.randomId = Math.random()
    this.socket = new WebSocket('ws://localhost:8081')
    this.socket.onmessage = event => {
      const { messageList, newMessagesCount } = this.state
      const incomingMessage = JSON.parse(event.data)
      this.setState({
        newMessagesCount: newMessagesCount + 1,
        messageList: [ ...messageList, incomingMessage ]
      })
      // showMessage(incomingMessage);
    }
  }

  _onMessageWasSent(message) {
    this.socket.send(JSON.stringify(message))
  }

  _sendMessage(text) {
    if (text.length > 0) {
      const newMessagesCount = this.state.isOpen ?
        this.state.newMessagesCount : this.state.newMessagesCount + 1
      this.setState({
        newMessagesCount,
        messageList: [ ...this.state.messageList, {
          authorType: 'them',
          type: 'text',
          data: { text }
        }]
      })
    }
  }

  _handleClick() {
    this.setState({
      isOpen: !this.state.isOpen,
      newMessagesCount: 0
    }, () => {
      // if don't use setTimeout focus not working
      setTimeout(() => {
        document.querySelector('.sc-user-input--text').focus()
      }, 100)
    })
  }

  render() {
    return (<div>
      <Header />
      <TestArea
        onMessage={this._sendMessage.bind(this)}
      />
      <Launcher
        agentProfile={{
          teamName: 'Osminog.tv Chat',
          imageUrl: 'https://osminog.tv/static/dist/img/logo.png'
        }}
        authorInfo={{
          id: this.randomId,
          firstName: 'Daniil',
          secondName: 'Khanin'
        }}
        onMessageWasSent={this._onMessageWasSent.bind(this)}
        messageList={this.state.messageList}
        newMessagesCount={this.state.newMessagesCount}
        handleClick={this._handleClick.bind(this)}
        messageItem={props => <div>{props.text}</div>}
        placeholder='Введите ваше сообщение'
        isOpen={this.state.isOpen}
        timeFormat='HH:mm'
        showEmoji
      />
      <img className='demo-monster-img' src={monsterImgUrl} />
      <Footer />
    </div>)
  }
}

render(<Demo />, document.querySelector('#demo'))
