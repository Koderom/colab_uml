import config from "../scripts/config.js";

const SERVER_API_URL = config.SERVER_API_URL;

const UsuarioService = {};
UsuarioService.login = async ({login, password}) => {
    const url = `${SERVER_API_URL}/usuario/login`;
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify({login, password})
    };  
    const response = await fetch(url, options);

    console.log("login response:" + response);
    if(!response.ok) throw new Error("WARN", response.status);
    const data = await response.json();
    return data;
}


UsuarioService.registro = async ({empleadoNombre,empleadoCargo, usuarioName, usuarioPassword}) => {
    try {
        const url = `${SERVER_API_URL}/usuario/registro`;
        console.log({empleadoNombre,empleadoCargo, usuarioName, usuarioPassword, url})
        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify({empleadoNombre,empleadoCargo, usuarioName, usuarioPassword})
        };  
        const response = await fetch(url, options);

        if(!response.ok) throw new Error("WARN", response.status);
        const data = await response.json();
        return data;    
    } catch (error) {
        console.log(error.message);
        throw error;
    }
    
}


export {UsuarioService}