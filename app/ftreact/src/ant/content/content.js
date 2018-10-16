import React, { Component } from 'react'
import Card1 from './card1/card1.js'
import ReduxTest from './reduxtest.js'
import UserTest from './usertest.js'

class Cont extends Component {
  render () {
    return (
      <div>
        <Card1
          bgsrc="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          width={ 300 }
          percent={ 80 }
        ></Card1>
        <hr />
        <ReduxTest></ReduxTest>
        <hr />
        <UserTest></UserTest>
        <hr />
      </div>
    )
  }
}

export default Cont
