import React, { Component } from 'react'

class Option extends Component {
  render () {
    return (
      <h3 style={{
        color: 'white',
      }}>
        { this.props.text }
      </h3>
    )
  }
}

export default Option
