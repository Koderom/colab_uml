import config from "../scripts/config.js";

const SERVER_API_URL = config.SERVER_API_URL;
const authToken = localStorage.getItem('authToken');

const EditorService = {};
EditorService.getEditor = async (idEditor) => {
    const url = `${SERVER_API_URL}/editor?idEditor=${idEditor}`;
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


EditorService.generarCodigoAngular = async ({ html, css }) => {
    const url = `${SERVER_API_URL}/editor/download`;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${authToken}`
        },
        body: JSON.stringify({ html, css })
    };

    const response = await fetch(url, options);

    if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
    }

    // Convertir la respuesta a un Blob (archivo binario)
    const blob = await response.blob();

    // Crear un enlace temporal para descargar el archivo
    const downloadUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = "directorio.zip"; // Nombre sugerido del archivo
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(downloadUrl);
}
export {EditorService}