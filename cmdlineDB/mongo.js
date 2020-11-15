const mongoose = require("mongoose")

const len = process.argv.length

if (len < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
} else if (len >= 3) {
    const password = process.argv[2]
    const url = `mongodb+srv://fullstackopen:${password}@cluster0.t6ejb.mongodb.net/phonebook?retryWrites=true&w=majority`

    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

    const personSchema = new mongoose.Schema({
        name: {type: String, unique: true},
        number: String,
    })

    const Person = mongoose.model('Person', personSchema)
    if (len === 3) {
        Person.find({}).then(result => {
            console.log('phonebook:')
            result.forEach(p => {
                console.log(`${p.name} ${p.number}`)
            })
            mongoose.connection.close()
        })
    } else if (len === 5) {
        const name = process.argv[3]
        const number = process.argv[4]
        const person = new Person({
            name: name,
            number: number,
        })
        person.save().then(result => {
            console.log(`added ${name} number ${number} to phonebook`)
            mongoose.connection.close()
        })
    }
}