/* eslint-disable no-console */

import Express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import database from './database';
import { todoRoutes } from './todo';

const app = new Express();
const server = http.createServer(app);
database('mongodb://localhost/test');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/v1', [todoRoutes]);

server.listen(5000, () => console.log('Server Running'));

export default server;
