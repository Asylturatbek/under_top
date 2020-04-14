const express = require('express')
const app = express()
const cors = require('cors')
const monk = require('monk')

const isValid = require('./config/validate.js')
require('dotenv').config()

//with this middleware my server adds cors header to any
//incoming request coming from clients 
app.use(cors())
app.use(express.json())

const db = monk(process.env.DB_URI);
db.then(() => {
  console.log('Connected correctly to server')
})
const Books = db.get('Books')


const Port = process.env.PORT || 5000

app.get('/', (req, res) => {
	res.json({
		message: "One book okay"
	})
})

app.get('/books', (req, res) => {
	Books.find()
	.then((books) => {
		res.json(books)
	})
})

app.post('/books', (req, res) => {
	if (isValid(req.body)) {
		const newBook = {
			name: req.body.name.toString(),
			description: req.body.description.toString(),
			photo: req.body.photo.toString(),
			price: req.body.price.toString(),
			created: new Date()
		}
		Books.insert(newBook)
		  .then((docs) => {
		  	res.json(docs)
		    // docs contains the documents inserted with added **_id** fields
		    // Inserted 3 documents into the document collection
		  }).catch((err) => {
		  	console.log('error occured while inserting')
		    // An error happened while inserting
		  }).then(() => db.close())
	} else {
		res.status(422)
		res.json({
			message: "Type in everything in correctly"
		})
	}
})

app.listen(Port, ()=> {
	console.log('LIstening to port '+ Port)
})