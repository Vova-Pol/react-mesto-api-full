const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const centralErrorHandling = require('./middlewares/centralErrorHandling');
const mainRouter = require('./routers');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('cors');
const { PORT, DB_URL } = require('./appConfig');
const {
  checkRequestOrigin,
  checkPreflightRequest,
} = require('./middlewares/cors');

const app = express();
app.use(express.json());

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

// --- Обработка CORS

// app.use(checkPreflightRequest);
// app.use(checkRequestOrigin);

app.use(cors());

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
