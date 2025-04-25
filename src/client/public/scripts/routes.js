import config from "./config.js";
const baseRoute = config.SERVER_API_URL;

const routes = {}

routes.LOGIN = 'login';
routes.PROGRAMAS = 'programas';

routes.login = (params) => {
    return `${baseRoute}/pages/login`;
}
routes.programas = (params) => {
    return `${baseRoute}/programas`;
}
routes.reproductor = (params) => {
    return `${baseRoute}/pages/reproductor/index.html?idProgramacion=${params.idProgramacion}`;
}

routes.goToRoute = (name, params) => {
    console.log(routes[name](params));
    window.location.href = routes[name](params);
}
export default routes