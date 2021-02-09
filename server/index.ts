import express from 'express';
import * as http from 'http';
import * as https from 'https';
import cookieParser from 'cookie-parser';
import api from './routes/api';

const app = express();
const server = http.createServer(app);

app.use(api.use, api.router);

app.use(cookieParser());

server.listen(3000, () => {
  console.info('Frontend started at http://localhost:3000/');
  console.info('Open http://localhost:3000/api/v1/test');
});

process
  .on('unhandledRejection', (reason, p) => {
    console.error(`NODE app.js Unhandled Rejection at: ${p} reason: ${reason}`);
  })
  .on('uncaughtException', error => {
    console.error(`NODE app.js Uncaught Exception thrown: ${error}`);
  });

process.on('SIGTERM', () =>  require('child_process').execSync(`kill -9 ${process.pid}`))

