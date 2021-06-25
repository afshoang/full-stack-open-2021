const mongoose = require('mongoose')

// eslint-disable-next-line
if (process.argv.length < 3) {
  console.log(
    'Please provide the password as an argument: node mongo.js <password>'
  )
  // eslint-disable-next-line
  process.exit(1)
}
// eslint-disable-next-line
const password = process.argv[2]

const url = `mongodb+srv://hoangpham0506:${password}@nodejsmasterclass.ktj0f.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

// Add person to DB
// eslint-disable-next-line
if (process.argv.length === 5) {
  const person = new Person({
    // eslint-disable-next-line
    name: process.argv[3],
    // eslint-disable-next-line
    number: process.argv[4],
  })
  person.save().then(() => {
    console.log('person saved!')
    mongoose.connection.close()
  })
}

// Get all person in DB
// eslint-disable-next-line
if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`)
    })
  })
}
