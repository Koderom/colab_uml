import config from "../scripts/config.js";

const SERVER_API_URL = config.SERVER_API_URL;
const authToken = localStorage.getItem('authToken');

const DiagramaService = {};
DiagramaService.Diagramas = async (idProyecto) => {
    const url = `${SERVER_API_URL}/Diagramas?idProyecto=${idProyecto}`;
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
}

DiagramaService.createDiagrama = async ({nombre, idProyecto}) => {
    const url = `${SERVER_API_URL}/diagrama/create`;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization" : `Bearer ${authToken}`
        },
        body: JSON.stringify({nombre, idProyecto})
    };  

    const response = await fetch(url, options);
    if(!response.ok) throw new Error("WARN", response.status);
    if (response.redirected) {
        window.location.href = response.url;
    } else {
        return response.json();
    }
    
}
export {DiagramaService}