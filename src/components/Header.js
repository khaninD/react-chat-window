import React, { Component } from 'react'
import closeIcon from './../assets/close-icon.png'


class Header extends Component {
  render() {
    const {
      agentProfile,
      onClose
    } = this.props
    const titleContainer = typeof agentProfile === 'function' ? agentProfile() :
      [
        <img key={0} width={50} className='sc-header--img' src={agentProfile.imageUrl} alt='' />,
        <div key={1} className='sc-header--team-name'>{agentProfile.teamName}</div>
      ]
    return (
      <div className='sc-header'>
        {titleContainer}
        <div className='sc-header--close-button' onClick={onClose}>
          <img src={closeIcon} alt='' />
        </div>
      </div>
    )
  }
}

export default Header
