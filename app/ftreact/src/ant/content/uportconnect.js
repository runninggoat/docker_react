import React, { Component } from 'react'
import { Connect } from 'uport-connect'

const uport = new Connect('UnityLabs_authorization', {network: 'ropsten'})

export default class UportConnect extends Component {
  state ={
    payload: null,
  }

  constructor (props) {
    super(props)
    uport.onResponse('disclosureReq').then(resp => {
      this.setState((state) => {
        return {
          payload: resp.payload,
        }
      })
      console.log('response', resp)
    })
  }

  handleClick (e) {
    uport.requestDisclosure({
      requested: ['name', 'avatar', 'phone', 'country'],
      notifications: true,
    })
  }

  render () {
    const p = this.state.payload
    let info = null
    if (p) {
      info = (
        <div>
          { `country: ${p.country}, did: ${p.did}, name: ${p.name}` }
        </div>
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
      </div>
    )
  }
}
