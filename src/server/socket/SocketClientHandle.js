const SocketClientHandle = {};

SocketClientHandle.new = (socket) => {
    console.log("new client connected");
    socket.on('mensaje', (data) => {})
}

export default SocketClientHandle;
