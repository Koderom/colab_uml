import express from 'express'
import logger from 'morgan'
import path from 'path'
import engine from 'ejs-layout'
import {Server} from 'socket.io'
import {createServer} from 'node:http'
import {routes} from './routes/routes.js'
import SocketConnectionManager from './socket/SocketConnectionHandle.js'

const PORT = process.env.PORT || 3000; 
const path_public_files = path.join(process.cwd(), '/src/client/public')

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(logger('dev'));
app.use(express.static(path_public_files));
app.use(routes);

app.set('view engine', 'ejs');
app.set('views', path_public_files  + '/pages');
app.engine('ejs', engine.__express);

SocketConnectionManager(io);

server.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
}) 