'use strict'

const express = require('express')
const path = require('path')
const app = express()
const { db  } = require('./server/db')
const PORT = process.env.PORT || 3000
const http = require('http');
const https = require('https');

// body parsing middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// static middleware
app.use(express.static(path.join(__dirname, './public')))
app.use(express.static(path.join(__dirname, './')))

app.get('/.well-known/acme-challenge/:id', (req, res) =>{

        console.log('hitting with ', req.params)
        let file = __dirname + '/.well-known/acme-challenge/' + req.params.id
        // res.status(200).send('HITTING')
        require('fs').readFile(file, (data) =>{
        	
        	console.log(data)
	        res.status(200).send(data)
	        res.end()
        })
})

app.use('./server/api', require('./server/api')) // include our routes!

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'))
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

const httpsServer = https.createServer(credentials, app);


const httpServer = http.createServer(app);

async function startServer(){

	// await db.sync()

    // console.log('db synced')
    
	httpServer.listen(PORT, () => {

		console.log('HTTP Server running on port ', PORT);
	});

	process.env.mode === 'secure' ? httpsServer.listen(443, () => { console.log('HTTPS Server running on port 443'); }) : '' ;

}

startServer()