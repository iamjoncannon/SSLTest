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

// static middleware
app.use(express.static(path.join(__dirname, './public')))
app.use(express.static(path.join(__dirname, './')))
app.use(require('helmet')());

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

	if(!req.secure){
		res.redirect('https://' + req.url)
	}

	console.log('hitting *')
	  res.sendFile(path.join(__dirname, './public/index.html'))
	  res.end()
}) // Send index.html for any other requests

// error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal server error')
})

// SSL certificates

const privateKey = fs.readFileSync('/etc/letsencrypt/live/ssltest.joncannon.codes/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/ssltest.joncannon.codes/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/ssltest.joncannon.codes/chain.pem', 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};

const httpServer = http.createServer(app);

httpServer.listen(80, ()=>{console.log('started 80')});

https.createServer(credentials, app).listen(443, (x)=>{console.log('started 443')} )
