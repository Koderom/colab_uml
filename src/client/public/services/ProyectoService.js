import config from "../scripts/config.js";

const SERVER_API_URL = config.SERVER_API_URL;
const authToken = localStorage.getItem('authToken');

const ProyectoService = {};
ProyectoService.proyectos = async (idEmpleado) => {
    const url = `${SERVER_API_URL}/proyectos?idEmpleado=${idEmpleado}`;
    console.log(url);
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Authorization" : `Bearer ${authToken}`
        }
    };  

    const response = await fetch(url, options);
    if(!response.ok) throw new Error("WARN", response.status);
    else window.location.href = url;
    // const html = await response.text();
    // document.documentElement.innerHTML = html;
}

ProyectoService.createProyecto = async ({nombre, descripcion, idEmpleado}) => {
    const url = `${SERVER_API_URL}/proyecto/create`;
    console.log(url);
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization" : `Bearer ${authToken}`
        },
        body: JSON.stringify({nombre, descripcion, idEmpleado})
    };  

    const response = await fetch(url, options);
    if(!response.ok) throw new Error("WARN", response.status);
    if (response.redirected) {
        window.location.href = response.url;
    } else {
        return response.json();
    }
    
}

ProyectoService.unirseProyecto = async ({idProyecto, idEmpleado}) => {
    const url = `${SERVER_API_URL}/proyecto/unirse`;    
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization" : `Bearer ${authToken}`
        },
        body: JSON.stringify({idProyecto, idEmpleado})
    };  

    const response = await fetch(url, options);
    if(!response.ok) throw new Error("WARN", response.status);
    if (response.redirected) {
        window.location.href = response.url;
    } else {
        return response.json();
    }
}
export {ProyectoService}