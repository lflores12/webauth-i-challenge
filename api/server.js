const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const knexSessionStore = require('connect-session-knex')(session);


const usersRouter = require('../users/users-router.js');
const authRouter = require('../auth/auth-router.js');

const server = express ();

const sessionConfig = {
    name: 'monkey',
    secret: 'keep it a secret, keep it safe',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 10,
        secure: false,
        httpOnly: true,
    },
    store: new knexSessionStore({
        knex: require('../database/dbConfig.js'),
        tablename: 'session',
        sidfieldname: 'sid',
        createtable: true,
        clearInterval: 1000 * 60 * 30,
    }),
};

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));


server.use('/api/users', usersRouter)
server.use('/api/auth', authRouter)

module.exports = server;