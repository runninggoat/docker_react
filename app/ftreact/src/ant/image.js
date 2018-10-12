import React, { Component } from 'react'
import 'antd/dist/antd.css'

class Image extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selfWidth: null,
    }
  }

  componentDidMount () {
    // console.log(this)
    // console.log('mount width', this.refs.inner.clientWidth)
    this.setState((state, props) => {
      return {
        selfWidth: this.refs.inner.clientWidth,
      }
    })
  }

  componentDidUpdate () {
    // console.log('update width', this.refs.inner.clientWidth)
    if (this.state.selfWidth === this.refs.inner.clientWidth) return
    this.setState((state, props) => {
      return {
        selfWidth: this.refs.inner.clientWidth,
      }
    })
  }

  render () {
    const h = this.state.selfWidth / this.props.ratio
    return (
      <div ref="inner" style={{
        backgroundImage: `url(${this.props.src})`,
        height: h,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}>
        { this.props.children }
      </div>
    )
  }
}

export default Image
