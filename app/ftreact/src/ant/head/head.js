import React, { Component } from 'react'
import './style.css'
import { Row, Col } from 'antd'
import Title from './title.js'
import SearchBox from './search.js'
import Option from './option.js'
import { Button } from 'antd'

class Head extends Component {
  constructor (props) {
    super(props)
    this.state = {
      stick: false,
    }
    this.handleScroll = this.handleScroll.bind(this)
    window.addEventListener('scroll', this.handleScroll)
  }

  handleScroll (e) {
    const scrollT = e.target.scrollingElement.scrollTop
    // console.log('scroll', e.target.scrollingElement.scrollTop)
    if (scrollT > 60) {
      this.setState((state, arg) => {
        return {
          stick: true,
        }
      })
    } else {
      this.setState((state, arg) => {
        return {
          stick: false,
        }
      })
    }
  }

  render () {
    let bg
    if (this.state.stick) {
      bg = null
    } else {
      bg = <div className="bg-blur" style={{
        background: `url("${this.props.src}")`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}></div>
    }
    return (
      <div style={{
        position: this.state.stick ? 'fixed' : 'relative',
        width: this.state.stick ? '100%' : '',
        backgroundColor: this.state.stick ? 'black' : '',
      }}>
        { bg }
        <div className="text">
          <Row>
            <Col span={3} offset={1}>
              <Title></Title>
            </Col>
            <Col span={6} offset={2}>
              <SearchBox></SearchBox>
            </Col>
            <Col span={2} offset={2}>
              {/* <Option text="Home"><Option text="Home"></Option></Option> */}
              <Button type="primary">ABC</Button>
            </Col>
            <Col span={2}>
              <Option text="Upload"></Option>
            </Col>
            <Col span={2}>
              <Option text="Sign In"></Option>
            </Col>
            <Col span={2}>
              <Option text="Sign Up"></Option>
            </Col>
            <Col span={2}>
              <Option text="Contact"></Option>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export default Head
