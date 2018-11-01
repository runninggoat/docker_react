import React, { Component } from 'react'
import { Connect } from 'uport-connect'
import { verifyJWT } from 'did-jwt'

const uport = new Connect('UnityLabs_authorization', {network: 'ropsten'})

export default class UportConnect extends Component {
  state ={
    userInfo: null,
    token: null,
  }

  constructor (props) {
    super(props)
    uport.onResponse('disclosureReq').then(resp => {
      this.setState((state) => {
        return { userInfo: resp.payload }
      })
      console.log(resp)
    })
    uport.onResponse('signVerReq').then(resp => {
      console.log(resp)
      this.setState((state) => {
        return { token: resp.payload }
      })
    })
  }

  componentDidMount () {
    this.setState({
      userInfo: {
        name: 'Tom uPort',
        avatar: {
          uri:
            'https://ipfs.infura.io/ipfs/QmfRmhV1BVdNuDhW4qR7tqfazJ4Ftaf85k2ZAwLoDWcawC',
        },
        country: 'China',
        did: 'did:ethr:0xb6240d53e0558a0c6a812539c7a031c680dacc62',
        boxPub: undefined,
      },
      token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NkstUiJ9.eyJpYXQiOjE1NDEwNjQ3NzMsImV4cCI6MTU0MTE1MTE3Mywic3ViIjoiZGlkOmV0aHI6MHhiNjI0MGQ1M2UwNTU4YTBjNmE4MTI1MzljN2EwMzFjNjgwZGFjYzYyIiwiY2xhaW0iOnsiY2xhaW0iOnsibmFtZSI6IlRvbSB1UG9ydCJ9LCJzdWIiOiJkaWQ6ZXRocjoweGI2MjQwZDUzZTA1NThhMGM2YTgxMjUzOWM3YTAzMWM2ODBkYWNjNjIifSwiaXNzIjoiZGlkOmV0aHI6MHhiNjI0MGQ1M2UwNTU4YTBjNmE4MTI1MzljN2EwMzFjNjgwZGFjYzYyIn0.7fQarfl47PTvD65hPwK1JAdhWp0GYtp3cTpFty49yva_e_5Yspi7FECJLSlSBA7NYMn8WAd1HrjCFVCTsPBI2AA',
    })
  }

  handleClick (e) {
    uport.requestDisclosure({
      requested: ['name', 'avatar', 'phone', 'country', 'email'],
      notifications: true,
    })
  }

  handleRequestCredential (e) {
    let unsignedClaim = {
      claim: {
        name: this.state.userInfo.name,
      },
      sub: this.state.userInfo.did,
    }
    let p = uport.requestVerificationSignature(unsignedClaim, this.state.userInfo.did, 'signVerReq')
    console.log(p)
  }

  /**
   * Verifying credential should be done in back-end, here is an exaple using javascript to verify.
   * @param {event} e no use
   */
  handleVerification (e) {
    verifyJWT(this.state.token).then((payload, doc, did, signer, jwt) => {
      console.log(payload)
    })
    let now = new Date()
    console.log(now.getTime() / 1000)
  }

  render () {
    const p = this.state.userInfo
    let info = null
    if (p) {
      info = (
        <div>
          { `country: ${p.country}, did: ${p.did}, name: ${p.name}` }
        </div>
      )
    }
    let step2 = null
    if (p) {
      step2 = (
        <button
          onClick={ this.handleRequestCredential.bind(this) }
          style={{
            background: '#5C4FC9',
            color: 'white',
            fontSize: '30px',
          }}
        >
          Request for credential
        </button>
      )
    }
    let t = null
    if (this.state.token) {
      t = (
        <div>
          { `token: ${this.state.token}` }
        </div>
      )
    }
    let verification = null
    if (this.state.token) {
      verification = (
        <button
          onClick={ this.handleVerification.bind(this) }
          style={{
            background: '#5C4FC9',
            color: 'white',
            fontSize: '30px',
          }}
        >
          Verify credential
        </button>
      )
    }
    return (
      <div style={{ padding: '30px' }}>
        <button
          onClick={ this.handleClick.bind(this) }
          style={{
            background: '#5C4FC9',
            color: 'white',
            fontSize: '30px',
          }}
        >
          Connect to uPort
        </button>
        { info }
        { step2 }
        { t }
        { verification }
      </div>
    )
  }
}
