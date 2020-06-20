const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')

app.get('/api', (req, res)=> {
	res.json({
		message: 'Welcome to the API ok my son'
	})
})

app.post('/api/posts', verifyToken, (req, res)=> {
	jwt.verify(req.token, 'somekey', (err, authData) => {
		if(err){
			res.sendStatus(403)
		} else {
			res.json({
				message: 'the post is created...',
				authData
			})
		}
	})
})

app.post('/api/login', (req, res) => {
	jwt.sign({myName: 'Asyl'}, 'somekey',{expiresIn: '30s'}, (err, token) => {
		res.json({
			token
		})
	})
})


function verifyToken(req, res, next){
	//get header value
	const bearerHeader = req.headers['authorization']
	//check if bearer is undefined
	if(typeof bearerHeader !== 'undefined'){
		//split the bearer at the space
		const bearer = bearerHeader.split(' ')
		//get token from array
		const bearerToken = bearer[1];
		//set the token
		req.token = bearerToken
		next();
	} else {
		res.sendStatus(403)
	}
}


app.listen(5000, ()=>{
	console.log('App listening on port 5000')
})