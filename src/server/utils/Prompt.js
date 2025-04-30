const Prompt = {};
Prompt.getGenerarCodigoAngular = () => {
    return `Quiero que interpretes el contenido y la estructura del los siguientes html y css, me generes los archivos con el codigo necesario para un frontend con angular 19 desde la interfaz hasta el consumo de los servicios con una ApiREST, debes poder identificar las entidades que se intenta representar en codigo html y css, tu respuesta debe seguir el siguiente formato:
        {
            "error" : 0, /*0: no hay error, 1: existe un error*/
            "message" : "Este es un mensaje de ejemplo", /*mensaeje si existe error o cualquier mensaje extra */
            "files":[
                {
                    "filepath": "filepath/ejemplo/directory/",
                    "filename": "filename.ext",
                    "filecontent" : "content css, html, component, js, etc"
                },
                {/*Demas archivos necesarios */}
            ]
        }
        no necesito texto extra ni explicacion solo el array de objetos, la respuesta debe ser directamente  utilizada en JSON.parse(), lo que espero como respuesta en un unico objeto, con los campos de error, message, y files, este ultimo con todos los files necesarios, no debe contener caracteres que puedan interrumpir la deserializacion con JSON.parce`;
};
export default Prompt;