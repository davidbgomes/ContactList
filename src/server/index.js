const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const fs = require('fs')
const app = express()
const file = require('../db/contacts.json')
const _ = require("lodash")

//Allowing server to receive cross origin requests
app.use(cors())

// Be able to retrieve body
app.use(express.json())

app.use(bodyParser.urlencoded({ extended: false }))


app.post('/api/setProfile', (req, res) => {
    res.setHeader('Content-Type', 'application/json')

	user = _.filter(file, {UserUID: req.body.userId})

  	for(let i = 0; i < file.length; i++){
  	
  		if(JSON.stringify(file[i]) === JSON.stringify(user[0])){
  			file[i].PhoneNumber = req.body.PhoneNumber
  			file[i].City = req.body.City
  		}
  	}

  	fs.writeFile('../db/contacts.json', JSON.stringify(file, null, 4), function writeJSON(err) {
  		if (err) {
    		return console.log(err)
  		}
	})

})

app.listen(3001, () =>
	console.log('Express server is running on localhost:3001')
)