import { io } from 'https://cdn.socket.io/4.3.2/socket.io.esm.min.js'

class SocketClient{
    constructor(){
        this.socket = io();
    }
    emit(mensaje){
        console.log("mensaje");
        this.socket.emit("mensaje", mensaje);
    }
    static getSocket(){
        return this.socket;
    }
    static getInstance (){
        if(!this.instance){
            this.instance = new SocketClient();
        }
        return this.instance;
    }
}

export default SocketClient.getInstance();

