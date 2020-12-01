require('dotenv').config()
const express = require('express')
const app = express()
const Note = require('./models/note')

app.use(express.static('build'))
app.use(express.json())

app.get('/api/notes', (req, res) => {
    Note.find({}).then(notes => {
        res.json(notes)
    })
})

app.get('/api/notes/:id', (req, res, next) => {
    Note.findById(req.params.id)
        .then(note => {
            if (note) {
                res.json(note)
            } else {
                res.status(404).end()
            }

        })
        .catch((err) => next(err))
})

app.delete('/api/notes/:id', (req, res, next) => {
    Note.findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end()
        })
        .catch(err => next(err))
})


app.post('/api/notes', (req, res, next) => {
    const body = req.body

    if (body.content === undefined) {
        return res.status(400).json({
            error: 'content missing'
        })
    }

    const note = new Note({
        content: body.content,
        important: body.important || false,
        date: new Date(),
    })

    note
        .save()
        .then(savedNote => {
            res.json(savedNote)
        })
        .catch(err => next(err))
})

app.put('/api/notes/:id', (req, res, next) => {
    const body = req.body

    const note = {
        content: body.content,
        important: body.important,
    }

    Note.findByIdAndUpdate(req.params.id, note, { new: true })
        .then(updatedNote => {
            res.json(updatedNote)
        })
        .catch(err => next(err))
})



const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}


app.use(unknownEndpoint)


const errorHandler = (err, req, res, next) => {
    console.error(err.message)

    if (err.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' })
    } else if (err.name === 'ValidationError') {
        return res.status(400).json({ error: error.message })
    }

    next(err)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})