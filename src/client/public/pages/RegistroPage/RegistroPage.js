import { UsuarioService } from "../../services/UsuarioService.js";
import { ProyectoService } from "../../services/ProyectoService.js";

const infoMessge = document.getElementById('infoMessage');
const formularioLogin = document.getElementById('form-registro');

formularioLogin.addEventListener('submit', async (event) => {
    try {
        event.preventDefault();
        const data = event.target;
        const empleadoNombre = data['empleado_nombre'].value;
        const empleadoCargo = data['empleado_cargo'].value;
        const usuarioName = data['usuario_nombre'].value;
        const usuarioPassword = data['usuario_password'].value;
        
        infoMessge.innerHTML = "";
        const response = await UsuarioService.registro({empleadoNombre,empleadoCargo, usuarioName, usuarioPassword});
        
        localStorage.setItem('authToken', response.token);
        await ProyectoService.proyectos(response.idEmpleado);
        return false;
    } catch (error) {
        infoMessge.innerHTML = `Error al registrar usuario: ${error.message}`;
    }
})