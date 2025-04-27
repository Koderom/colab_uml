import EditorUseCase from "../use_cases/EditorUseCase.js";

const SocketClientHandle = {};
let io = null;

SocketClientHandle.init = (connection) => {
    io = connection;
}
SocketClientHandle.new = (socket) => {
    console.log("new client connected");

    socket.on('join-editor', (idEditor) => {
        console.log("entrando a la sala" + idEditor)
        socket.join(idEditor);
    });

    socket.on('leave-editor', (idEditor) => {
        socket.leave(idEditor);
    })

    socket.on('editor-change', ( data ) => {
        console.log(data);
        EditorUseCase.editorUpdate(data);
        socket.to(data.id).emit('editor-change', data.data);
    });

    socket.on('disconnect', () => {
        console.log('Usuario desconectado:', socket.id);
    });
}

export default SocketClientHandle;
