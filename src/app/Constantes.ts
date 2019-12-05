export const URLSPRODUCTOS = {
    GETN: 'http://localhost:301/api/productos/getn',
    GET: 'http://localhost:301/api/productos/get',
    CREATE: 'http://localhost:301/api/productos/create'
};

export const DOMINIOVALOR = {
    CATEGORIAS: 'http://localhost:301/api/productos/getn',
    GET: 'http://localhost:301/api/productos/get'
};

export const LOCALSTORESTR = {
    LS_USER: 'DEUser',
    LS_PERSONA: 'DEPersona',
    FACT: 'DEFact'
};

export const RESULTS = {
    OK: 0,
    ERROR: 1,
    TOKENINVALID: 2,
    TOKENEXPIRED: 3,
    NOTOKEN: 4,
    CHANGEPASSWORD: 5,
    PASSWORDINVALID: 6,
    USERINVALID: 7,
    JSONINVALID: 8,
    NOEMAIL: 9,
    INVALIDCODE: 10,
    REPITED: 11,
    NOAFECTED: 12,
    SESIONANOTHER: 13,
    INVALIDIP: 14
};

export const URLPERSONA = {
    GETTOKEN: 'http://localhost:301/api/persona/getToken',
    VALIDARUSUARIOURL: 'http://localhost:301/api/persona/login',
    REALIZARCAMBIOCLAVE: 'http://localhost:301/api/persona/changePassword',
    SOLICITARCAMBIOCLAVE: 'http://localhost:301/api/persona/requestChangePassword',
    GET: 'http://localhost:301/api/persona/get',
    MERGE: 'http://localhost:301/api/persona/merge',
    REALIZARCAMBIOCLAVELOCAL: '',
    CREARUSUARIO: 'http://localhost:301/api/persona/crearPersona'
};

export const MENSAJES = {
    SUSSES: 1,
    ERROR: 2,
    WARN: 3
};

export const REALIZARCAMBIOCLAVELOCAL = 'http://localhost:301/api/persona/changeoldpassword';
