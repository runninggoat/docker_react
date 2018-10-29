import React, { Component } from 'react'
import { connect } from 'react-redux'

class UserT extends Component {
  state = {
    un: '',
    ui: '',
  }

  handleSubmit (un, ui, e) {
    this.props.submit(un, ui)
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
            { `User Name: ${this.props.user.userName}; UID: ${this.props.user.uid}` }
          </h1>
          <input
            placeholder="User Name"
            value={ this.state.un }
            onChange={ this.handleUN.bind(this) }
          />
          <input
            placeholder="UID"
            value={ this.state.ui }
            onChange={ this.handleUI.bind(this) }
          />
          <button
            onClick={ this.handleSubmit.bind(this, this.state.un, this.state.ui) }
          >Submit</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    submit: (userName, uid) => {
      dispatch({
        type: 'LOGIN',
        userName: userName,
        uid: uid,
      })
    },
  }
}

const UserTest = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserT)

export default UserTest
