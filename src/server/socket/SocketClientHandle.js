const SocketClientHandle = {};
let io = null;

SocketClientHandle.init = (connection) => {
    io = connection;
}
SocketClientHandle.new = (socket) => {
    console.log("new client connected");
   
    socket.on('mensaje', (data) => {
        console.log("mensaje");
        if(io) io.emit('respuesta', data);
    })
}

export default SocketClientHandle;
