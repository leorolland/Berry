import { io } from './io';
import { Db } from './types/Db';

const express = require('express');
const app = express();
const http = require('http').createServer(app);
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const router = require('./router');

app.use(cookieParser());
app.use(bodyParser.json());

app.set('db', new Db());

// Open a socket.io instance and save it as "io" in our express app
// Then the io instance will be accessible using req.app.get('io')
app.set('io', io(http, app.get('games')));

// Tell our app to use this router
app.use(router);

// Run server
http.listen(8080, () => { console.log('listening on *:8080'); });
