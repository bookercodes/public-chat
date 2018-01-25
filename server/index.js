const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const Chatkit = require('pusher-chatkit-server')

const chatkit = new Chatkit.default({
  instanceLocator: 'v1:us1:18f56ba9-a5ae-4dc9-84e9-c65860773a7d',
  key:
    '0e9f13c8-534c-4314-a99e-62e8f95bed52:4/NevyRmCnxZUZMJsvXnCOfDnjYmhPX3HZ8a6w00ptU=',
})

function createRoom(roomName) {
  return chatkit
    .apiRequest({
      method: 'GET',
      path: '/rooms',
      jwt: chatkit.generateAccessToken({ userId: 'admin' }).token,
    })
    .then(response => {
      const { body } = response
      const rooms = JSON.parse(body)
      console.log('rooms', rooms)
      const roomExists = rooms.filter(room => room.name === roomName).length > 0
      console.log(roomExists)
      if (!roomExists) {
        console.log('creating room')
        return chatkit.createRoom('admin', { name: roomName })
      }
    })
}

createRoom('General').catch(error => console.error(error))

// chatkit
//   .getUsers()
//   .then(users => Promise.all(users.map(user => chatkit.deleteUser(user.id))))
//   .then(done => console.log('done'))
// chatkit.getUsers().then(users => console.log(users))

const app = express()
app.use(cors())
app.use(bodyParser.json())

app.get('/users', (req, res) => {
  res.send('hi')
})

app.post('/users', (req, res) => {
  const { username } = req.body
  chatkit
    .createUser(username, username)
    .then(() => res.sendStatus(201))
    .catch(error => {
      res.status(error.statusCode).json(error)
    })
})

const PORT = 3001
app.listen(PORT, error => {
  if (error) {
    console.error(error)
  } else {
    console.log(`Running on port ${PORT}`)
  }
})
