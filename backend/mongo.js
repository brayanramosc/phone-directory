const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const databaseName = 'phonebook'
const password = process.argv[2]

const url = `mongodb+srv://brayanrcaicedo:${password}@cluster0.vsupxh6.mongodb.net/${databaseName}?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length > 3) {
    const name = process.argv[3]
    const number = process.argv[4]

    const person = new Person({
        name: name,
        number: number
    })
    person.save().then(res => {
        console.log(`added ${name} number ${number} to phonebook`)
        mongoose.connection.close()
    })
} else {
    Person.find({}).then(res => {
        console.log('phonebook:')
        res.forEach(person => {
            console.log(person.name, ' ', person.number)
        })
        mongoose.connection.close()
    })
}

