import React, { Component } from 'react'
import './App.css'
import WhatIsYourUsernameScreen from './WhatIsYourUsername'
import ChatScreen from './ChatScreen'
import axios from 'axios'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      screen: 'ChatScreen',
      username: 'admin',
    }
    this.onSubmit = this.onSubmit.bind(this)
  }
  onSubmit(form) {
    const { username } = form
    console.log('username', username)
    axios
      .post('http://localhost:3001/users', { username })
      .then(response => {
        this.setState({
          screen: 'ChatScreen',
          username,
        })
      })
      .catch(error => console.error('error', error))
  }
  render() {
    if (this.state.screen === 'WhatIsYourUsernameScreen') {
      return <WhatIsYourUsernameScreen onSubmit={this.onSubmit} />
    }

    if (this.state.screen === 'ChatScreen') {
      return <ChatScreen username={this.state.username} />
    }
  }
}

export default App
