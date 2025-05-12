import mongoose from 'mongoose'
import 'dotenv/config'

mongoose.set('strictQuery', true)

const url = process.env.MONGO_URI

console.log(`connecting to ${url}...`)

mongoose
  .connect(url)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log('Error Connecting to DB', error.message))

const personSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 3
    },
    number: {
      type: String,
      required: true,
      minLength: 8,
      maxLength:11,
      validate: {
        validator: function(v) {
          return /\d{2,3}-\d{7,8}/.test(v)
        },
        message: props => `${props.value} is not a valid number format!`
      }
    }
  },
  { timestamps: true }
)

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject._id = returnedObject._id.toString()
    delete returnedObject.__v
  }
})

const Person = mongoose.model('Person', personSchema)


export default Person
