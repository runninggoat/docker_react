import React, { Component } from 'react'
import Card1 from './card1/card1.js'

class Cont extends Component {
  render () {
    return (
      <div>
        <Card1
          bgsrc="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          width={ 300 }
          percent={ 80 }
        ></Card1>
      </div>
    )
  }
}

export default Cont
