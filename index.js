// aplication programing interface
const express = require('express')
const app = express()
// const http = require('http')
const logger = require('./loggerMiddleware')

app.use(express.json())

app.use(logger)

let notes = [
  {
    id: 1,
    content: 'varias cosas qeu sirbven de string en este objeto',
    date: '2019-05-30t18:39:34091z',
    important: false
  },
  {
    id: 2,
    content: 'varias cosas qeu sirbve de JSON en local',
    date: '2019-05-30t18:39:34091z',
    important: false
  },
  {
    id: 3,
    content: 'varias cosas qeu sirbven de string en este objeto',
    date: '2019-05-30t18:39:34091z',
    important: false
  },
  {
    id: 4,
    content: 'varias cosas qeu sirbven de string en este objeto',
    date: '2019-05-30t18:39:34091z',
    important: false
  }
]

// const app = http.createServer((request, response) => {
//   response.writeHead(200, {'Content-Type': 'application/json'})
//   // response.end("hola a todos")
//   response.end(JSON.stringify(notes))
// })
app.get('/', (request, response) => {
  response.send('<h1>Hello coco</h1>')
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = notes.find(note => note.id === id)

  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = notes.find(note => note.id !== id)
  response.status(204).end(note)
})

app.post('/api/notes/', (request, response) => {
  const note = request.body

  response.json(note)

  const ids = notes.map(note => note.id)
  const maxId = Math.max(...ids)

  const newNote = {
    id: maxId + 1,
    content: note.content,
    important: typeof note.important !== 'undefined' ? note.important : false,
    date: new Date().toISOString()
  }

  notes = notes.concat(newNote)

  response.status(201).json(newNote)
})
app.use((request, response) => {
  response.status(404).json({
    error: 'Not Found'
  })
})

const PORT = 3002
app.listen(PORT, () => {
  console.log(`Server corriendo en puerto ${PORT}`)
})
