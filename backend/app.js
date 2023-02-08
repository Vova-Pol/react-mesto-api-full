const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const { errors } = require('celebrate');
const centralErrorHandling = require('./middlewares/centralErrorHandling');
const mainRouter = require('./routers');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const {
  checkRequestOrigin,
  allowRequestHeaders,
  allowRequestMethods,
} = require('./middlewares/cors');

const { PORT = 3000 } = process.env;
const DB_URL = 'mongodb://localhost:27017/mestodb';

const app = express();
app.use(express.json());

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

// --- Обработка CORS

app.use(allowRequestMethods);
app.use(allowRequestHeaders);
app.use(checkRequestOrigin);

// --- Обработка роутов

app.use('/', mainRouter);

// --- Обработка ошибок

app.use(errorLogger);

app.use(errors());
app.use(centralErrorHandling);

// --- Запуск сервера

async function startApp() {
  try {
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
    });

    app.listen(PORT, () => {
      console.log(`App is working on PORT ${PORT}`);
    });
  } catch (err) {
    console.log(`Произошла ошибка при запуске приложения: ${err}`);
  }
}

startApp();
