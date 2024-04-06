import express from 'express'
import logger from 'morgan'
import path from 'path'
import {Server} from 'socket.io'
import {createServer} from 'node:http'

const PORT = process.env.PORT || 3000; 
const path_public_files = path.join(process.cwd(), '/src/public')

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(logger('dev'));
app.use(express.static(path_public_files));

io.on('connection', async (socekt) => {
    console.log("conectado");
})


app.get(('/'), (req, res) => {
    res.sendFile(process.cwd() + '/src/client/index.html')
})

server.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
    console.log(`public files: ${path_public_files}`);
})