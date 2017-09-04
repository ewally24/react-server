const express = require('express');

const app = express();

const PORT = process.env.PORT || 5000; // dynamic port binding

app.get('/', (req, res) => {
	res.send({greeting: 'Hello World!'});
})

app.listen(3000, () => {
	console.log('App listening on Port 3000');
})