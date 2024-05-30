const personRouter = require('express').Router()
const Person = require('../models/person')

personRouter.get('/', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons)
    })
})

personRouter.get('/:id', (req, res, next) => {
    Person.findById(req.params.id)
        .then(person => {
            if (person) {
                res.json(person)
                return
            }

            res.status(404).end()
        })
        .catch(error => next(error))
})

personRouter.delete('/:id', (req, res, next) => {
    Person.findByIdAndDelete(req.params.id)
        .then(() => {
            res.status(204).end()
        })
        .catch(error => next(error))
})

personRouter.post('/', (req, res, next) => {
    const body = req.body

    if (!body.name || !body.number) {
        return res.status(400).json({
            error: 'content missing'
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number
    })
    // if (matchPerson) {
    //     return res.status(400).json({
    //         error: 'name must be unique'
    //     })
    // }

    person.save()
        .then(savedPerson => {
            res.json(savedPerson)
        })
        .catch(error => next(error))
})

personRouter.put('/:id', (req, res, next) => {
    const { name, number } = req.body

    Person.findByIdAndUpdate(
        req.params.id,
        { name, number },
        { new: true, runValidators: true, context: 'query' }
    )
        .then(updatedPerson => {
            res.json(updatedPerson)
        })
        .catch(error => next(error))
})

module.exports = personRouter
