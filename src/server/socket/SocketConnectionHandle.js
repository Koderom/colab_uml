import SocketClientHandle from "./SocketClientHandle.js";

const SocketConnectionHandle = (io) => {
    io.on('connection', SocketClientHandle.new);
}
export default SocketConnectionHandle;