import jwt from 'jsonwebtoken';

const unverifiedRoutes = [
    '/',
    '/test',
    '/usario/login',
    '/usuario/registro'
]

const Auth = {};
Auth.ensureToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    }else{
        console.log("se requiere inicio de sesion");
        res.status(403).send('Inicio de session requerido');
    }
}

Auth.authenticate = (req, res, next) => {
    next();
    console.log("----------------------------->"+req.path);
    console.log(unverifiedRoutes.includes(req.path))
    if(unverifiedRoutes.includes(req.path)) next();
    else{
        Auth.ensureToken(req, res, () => {
            jwt.verify(req.token, process.env.SECRET_KEY , (err, data) => {
                console.log()
                if(err) res.status(403).send('token invalido');
                else{
                    req.body.usuario = {
                        name: data.usuario.name,
                    };
                    next();
                }
            });
        })
    }
}

export default Auth;