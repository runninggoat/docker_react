import React, { Component } from 'react'
import { connect } from 'react-redux'

class ReduxT extends Component {
  handlePlus (e) {
    this.props.increase()
  }

  handleMinus (e) {
    this.props.decrease()
  }

  render () {
    const count = this.props.counter
    return (
      <div style={{
        display: 'flex',
        padding: '30px',
      }}>
        <h1>
          { `State ${count}` }
        </h1>
        <button
          onClick={ this.handlePlus.bind(this) }
          style={{
            marginLeft: '50px',
          }}
        >
          { '+' }
        </button>
        <button
          onClick={ this.handleMinus.bind(this) }
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

const mapStateToProps = (state, ownProps) => {
  return {
    counter: state.counter,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    increase: () => { dispatch({ type: 'INCREMENT' }) },
    decrease: () => { dispatch({ type: 'DECREMENT' }) },
  }
}

const ReduxTest = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReduxT)

export default ReduxTest
