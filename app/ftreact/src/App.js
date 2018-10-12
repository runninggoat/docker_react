import React, { Component } from 'react'
import {Route, BrowserRouter} from 'react-router-dom'
import logo from './logo.svg'
import './App.css'
import Game from './tic/index.js'
import AntT from './ant/index.js'

class Home extends Component {
  render () {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    )
  }
}

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={Home} />
          <Route exact path="/tic" component={Game} />
          <Route exact path="/ant" component={AntT} />
        </div>
      </BrowserRouter>
    )
  }
}

export default App
