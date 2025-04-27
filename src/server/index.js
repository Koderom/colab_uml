import express from 'express'
import logger from 'morgan'
import path from 'path'
import engine from 'ejs-layout'
import {Server} from 'socket.io'
import {createServer} from 'node:http'
import {routes} from './routes/routes.js'
import SocketConnectionManager from './socket/SocketConnectionHandle.js'
import bodyParser from 'body-parser'
import cors from 'cors'
import Auth from './middleware/Auth.js'

const PORT = process.env.PORT || 3000; 
const path_public_files = path.join(process.cwd(), '/src/client/public')
console.log(process.env.PORT);
const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(logger('dev'));
app.use(express.static(path_public_files));
app.use(cors());
app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json());
app.use(routes);
app.use(Auth.authenticate)

app.set('view engine', 'ejs');
app.set('views', path_public_files  + '/pages');
app.engine('ejs', engine.__express);

SocketConnectionManager(io);

server.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
}) 