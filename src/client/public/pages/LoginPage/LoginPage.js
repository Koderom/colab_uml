import { ProyectoService } from "../../services/ProyectoService.js";
import { UsuarioService } from "../../services/UsuarioService.js";
//import {routes} from '../../scripts/routes.js'

const infoMessge = document.getElementById('infoMessage');
const formularioLogin = document.getElementById('form-login');

formularioLogin.addEventListener('submit', async (event) => {
    try {
        event.preventDefault();
        const data = event.target;
        const login = data['login'].value;
        const password = data['password'].value;
        infoMessge.innerHTML = "";
        const response = await UsuarioService.login({login, password});
        
        localStorage.setItem('authToken', response.token);
        console.log(response)
        await ProyectoService.proyectos(response.idEmpleado);
        return false;
    } catch (error) {
        infoMessge.innerHTML = "Error al iniciar sesion " + error.message;
    }
})