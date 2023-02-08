const allowedMethods = 'GET,HEAD,PUT,PATCH,POST,DELETE';

function allowRequestMethods(req, res, next) {
  const { method } = req.headers;

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', allowedMethods);
  }
}

function allowRequestHeaders(req, res, next) {
  const { method } = req.headers;
  const requestHeaders = req.headers['access-control-request-headers'];

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
}

const allowedCors = [
  'http://mesto.vova-pol.nomoredomainsclub.ru',
  'https://mesto.vova-pol.nomoredomainsclub.ru',
];

function checkRequestOrigin(req, res, next) {
  const { origin } = req.headers;
  console.log(origin);

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  } else {
    console.log('No orogin included');
  }

  next();
}

module.exports = {
  checkRequestOrigin,
  allowRequestMethods,
  allowRequestHeaders,
};
