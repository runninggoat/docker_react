import React, { Component } from 'react'
import store from '../../store.js'

class UserTest extends Component {
  constructor (props) {
    super(props)
    this.state = {
      un: '',
      ui: '',
      userName: null,
      uid: null,
    }
    store.subscribe(() => {
      this.setState((state) => {
        return {
          userName: store.getState().user.userName,
          uid: store.getState().user.uid,
        }
      })
    })
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleUN = this.handleUN.bind(this)
    this.handleUI = this.handleUI.bind(this)
  }

  componentDidMount () {
    this.setState((state) => {
      return {
        userName: store.getState().user.userName,
        uid: store.getState().user.uid,
      }
    })
  }

  handleSubmit () {
    store.dispatch({
      type: 'LOGIN',
      userName: this.state.un,
      uid: this.state.ui,
    })
  }

  handleUN (e) {
    const nv = e.target.value
    this.setState((state) => {
      return {
        un: nv,
      }
    })
  }

  handleUI (e) {
    const nv = e.target.value
    this.setState((state) => {
      return {
        ui: nv,
      }
    })
  }

  render () {
    return (
      <div style={{
        marginLeft: '30px',
      }}>
        <div>
          <h1>
            { `User Name: ${this.state.userName}; UID: ${this.state.uid}` }
          </h1>
          <input placeholder="User Name" value={ this.state.un } onChange={ this.handleUN } />
          <input placeholder="UID" value={ this.state.ui } onChange={ this.handleUI } />
          <button
            onClick={ this.handleSubmit }
          >Submit</button>
        </div>
      </div>
    )
  }
}

export default UserTest
