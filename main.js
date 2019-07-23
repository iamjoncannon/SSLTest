'use strict'

const express = require('express')
const path = require('path')
const app = express()
// const { db  } = require('./server/db')
const PORT = process.env.PORT || 3000
const http = require('http');
const https = require('https');
const fs = require('fs')

// body parsing middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next)=>{

	if (req.secure) {
	
		next();
	} else {
		console.log('hitting the redirect middleware', req.url)
		
		res.redirect('https://' + req.headers.host + req.url)
	}
});

// static middleware
app.use(express.static(path.join(__dirname, './public')))
app.use(express.static(path.join(__dirname, './')))

app.get('/.well-known/acme-challenge/:id', (req, res) =>{

        console.log('hitting with ', req.params)
        let file = './.well-known/acme-challenge/' + req.params.id
        // res.status(200).send('HITTING')
        require('fs').readFile(file, (data) =>{

        	console.log(data)
	        res.status(200).send(data)
	        res.end()
        })
})

app.get('*', (req, res) => {

	console.log('hitting wildcard ', req.url)
	  // res.sendFile(path.join(__dirname, './public/index.html'))
	  res.end()


}) // Send index.html for any other requests

// error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal server error')
})

// SSL certificates


const httpServer = http.createServer(app);

httpServer.listen(80, ()=>{console.log('started 80')});

if(process.env.MODE === "secured"){

	const privateKey = fs.readFileSync('/etc/letsencrypt/live/townhall.joncannon.codes/privkey.pem', 'utf8');
	const certificate = fs.readFileSync('/etc/letsencrypt/live/townhall.joncannon.codes/cert.pem', 'utf8');
	const ca = fs.readFileSync('/etc/letsencrypt/live/townhall.joncannon.codes/chain.pem', 'utf8');

	const credentials = {
		key: privateKey,
		cert: certificate,
		ca: ca
	};

	https.createServer(credentials, app).listen(443, (x)=>{console.log('started 443')} )

}



