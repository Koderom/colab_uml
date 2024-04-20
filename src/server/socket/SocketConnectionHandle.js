import SocketClientHandle from "./SocketClientHandle.js";

const SocketConnectionHandle = (io) => {
    SocketClientHandle.init(io);
    io.on('connection', SocketClientHandle.new);
}
export default SocketConnectionHandle;