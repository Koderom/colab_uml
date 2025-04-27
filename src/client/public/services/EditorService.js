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

export {EditorService}