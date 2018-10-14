import React, { Component } from 'react'
import './style.css'
import Image from '../image.js'

class BG extends Component {
  render() {
    return (
      <div>
        <Image
          ratio={16 / 9}
          src={ this.props.src }
        >
          { this.props.children }
        </Image>
      </div>
    )
  }
}

export default BG
