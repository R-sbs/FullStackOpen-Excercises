import express, { json } from 'express'
import morgan from 'morgan'
import Person from './models/person.js'

const app = express()

app.use(express.static('dist'))
app.use(json())

//  morgan is a logging library to use with nodeJS Servers, mainly used for logging important information(tokens( in-built or custom)) into the console.

morgan.token('body', (req) => JSON.stringify(req.body))

app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms | body: :body'
  )
)

app.get('/api/health', (req, res) => {
  res.send('<p>Healthy</p>')
})

app.get('/info', async (req, res, next) => {
  const currentTime = new Date().toLocaleString()
  const persons = await Person.find({})
    .then((result) => result)
    .catch((error) => next(error))
  console.log(persons)
  const info = `Phonebook has info on ${persons.length} people`
  res.send({ info, currentTime })
})

app.get('/api/persons', (req, res) => {
  Person.find({})
    .then((people) => res.json(people))
    .catch((error) => res.status(400).json(error.message))
})

app.get('/api/persons/:id', (req, res) => {
  const { id } = req.params
  // const person = persons.find((person) => person.id === id)
  // if (person) {
  //   res.json(person)
  // } else {
  //   res.status(404).send('Person Not Found')
  // }

  Person.findById(id)
    .then((person) => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch((error) => {
      console.log(error)
      res.status(400).send({ error: 'MalFormatted Id' })
    })
})

app.delete('/api/persons/:id', async (req, res, next) => {
  const { id } = req.params
  await Person.findByIdAndDelete(id)
    .then((result) => {
      console.log(result)
      res.status(204).end()
    })
    .catch((error) => {
      next(error)
      // res.status(404).send('Person Does't Exists')
    })
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Person.findById(request.params.id)
    .then((person) => {
      if (!person) {
        return response.status(404).end()
      }

      person.name = name
      person.number = number

      return person
        .save()
        .then((updatedPerson) => {
          response.json(updatedPerson)
        })
        .catch((error) => next(error))
    })
    .catch((error) => next(error))
})

app.post('/api/persons', (req, res, next) => {
  const name = req.body.name || null
  const number = req.body.number || null

  if (!name || !number) {
    return res.status(400).json({ error: 'Missing name or number' })
  }
  // const nameExistsAlready = persons.find((person) => person.name === name)
  // if (nameExistsAlready) {
  //   return res
  //     .status(400)
  //     .json({ error: `${name} already exists in phonebook` })
  // }

  // const newPerson = { id, name, number }
  // // console.log(newPerson)

  // persons = persons.concat(newPerson)
  // console.log(persons)

  const newPerson = new Person({
    name,
    number,
  })

  newPerson
    .save()
    .then((savedPerson) => {
      res.json(savedPerson)
    })
    .catch((error) => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if ( error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001

app.listen(PORT, async () => {
  console.log(`Server is Running on port ${PORT}`)
})
