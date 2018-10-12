import React, { Component } from 'react'
import 'antd/dist/antd.css'
import './style.css'

class Head extends Component {
  render () {
    return (
      <div style={{ position: 'relative' }}>
        <div className="bg-blur" style={{
          background: `url("${this.props.src}")`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}></div>
        <div className="text">fkldafdjfadskfldsakjgajlsdkfjashlkjfdsa</div>
      </div>
    )
  }
}

export default Head
