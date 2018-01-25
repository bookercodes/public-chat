import React, { Component } from 'react'
import Chatkit from 'pusher-chatkit-client'

class Rooms extends Component {
  render() {
    return (
      <ul>
        {this.props.rooms.map(room => <li key={room.id}>{room.name}</li>)}{' '}
      </ul>
    )
  }
}

class ChatScreen extends Component {
  constructor(props) {
    super(props)
    this.state = { currentUser: {}, joinableRooms: [] }
  }

  componentDidMount() {
    const tokenProvider = new Chatkit.TokenProvider({
      url:
        'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/18f56ba9-a5ae-4dc9-84e9-c65860773a7d/token?instance_locator=v1:us1:18f56ba9-a5ae-4dc9-84e9-c65860773a7d',
    })
    const chatManager = new Chatkit.ChatManager({
      instanceLocator: 'v1:us1:18f56ba9-a5ae-4dc9-84e9-c65860773a7d',
      userId: this.props.username,
      tokenProvider: tokenProvider,
    })
    chatManager.connect({
      onSuccess: currentUser => {
        this.setState({
          currentUser,
        })
        console.log(currentUser)
        currentUser.getAllRooms(
          joinableRooms => {
            console.log(joinableRooms)
            // Promise.all(
            //   joinableRooms.map(joinableRoom =>
            //     this.state.currentUser.joinRoom(joinableRoom.id, error =>
            //       console.error(error)
            //     )
            //   )
            // ).then(() => {
            //   Promise.all(
            //     joinableRooms.map(joinableRoom =>
            //       this.state.currentUser.deleteRoom(joinableRoom.id)
            //     )
            //   )
            // })
            this.setState({ joinableRooms })
          },
          error => console.error('error', error)
        )
      },
      onError: error => {
        console.error('error', error)
      },
    })
  }

  render() {
    return (
      <div>
        <h1>Hello, {this.state.currentUser.name}</h1>
        <Rooms rooms={this.state.joinableRooms} />
      </div>
    )
  }
}

export default ChatScreen
