const cardsRouter = require('express').Router();
const { celebrate } = require('celebrate');
const {
  postCardConfig,
  deleteCardConfig,
  handleLikeConfig,
} = require('../utils/celebrateValidConfig');

const {
  getCards,
  postCard,
  deleteCard,
  putLike,
  deleteLike,
} = require('../controllers/cards');

cardsRouter.get('/', getCards);
cardsRouter.post('/', celebrate(postCardConfig), postCard);
cardsRouter.delete('/:cardId', celebrate(deleteCardConfig), deleteCard);

cardsRouter.put('/:cardId/likes', celebrate(handleLikeConfig), putLike);
cardsRouter.delete('/:cardId/likes', celebrate(handleLikeConfig), deleteLike);

module.exports = cardsRouter;
