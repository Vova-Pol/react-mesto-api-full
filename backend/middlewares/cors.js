const allowedCors = [
  'http://mesto.vova-pol.nomoredomainsclub.ru',
  'https://mesto.vova-pol.nomoredomainsclub.ru',
  'http://localhost:3000',
];

function checkRequestOrigin(req, res, next) {
  const { origin } = req.headers;

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  next();
}

const allowedMethods = 'GET,HEAD,PUT,PATCH,POST,DELETE';

function checkPreflightRequest(req, res, next) {
  const { method } = req.headers;
  const requestHeaders = req.headers['access-control-request-headers'];

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', allowedMethods);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.status(200).send({ mess: 'Hello' });

    return res.end();
  }

  next();
}

module.exports = {
  checkRequestOrigin,
  checkPreflightRequest,
};
