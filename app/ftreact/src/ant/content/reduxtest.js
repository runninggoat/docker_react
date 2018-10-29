import React, { Component } from 'react'
import store from '../../store.js'

export default class ReduxTest extends Component {
  constructor (props) {
    super(props)
    this.state = {
      count: null,
    }
    store.subscribe(() => {
      this.setState((state) => {
        return {
          count: store.getState(),
        }
      })
    })
    this.handlePlus = this.handlePlus.bind(this)
    this.handleMinus = this.handleMinus.bind(this)
  }

  componentDidMount () {
    this.setState((state) => {
      return {
        count: store.getState().counter,
      }
    })
  }

  handlePlus () {
    store.dispatch({ type: 'INCREMENT' })
  }

  handleMinus () {
    store.dispatch({ type: 'DECREMENT' })
  }

  render () {
    const count = store.getState().counter
    return (
      <div style={{
        display: 'flex',
        padding: '30px',
      }}>
        <h1>
          { `State ${count}` }
        </h1>
        <button
          onClick={ this.handlePlus }
          style={{
            marginLeft: '50px',
          }}
        >
          { '+' }
        </button>
        <button
          onClick={ this.handleMinus }
          style={{
            marginLeft: '50px',
          }}
        >
          { '-' }
        </button>
      </div>
    )
  }
}
