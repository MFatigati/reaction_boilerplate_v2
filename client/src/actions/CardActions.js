import apiClient from "../lib/ApiClient";
import * as types from "../constants/ActionTypes";

export function getCardSuccess(cardData) {
  return {
    type: types.GET_CARD_SUCCESS,
    card: cardData
  }
}

export function createCardSuccess(cardData) {
  return {
    type: types.CREATE_CARD_SUCCESS,
    card: cardData
  }
}

export function getCard(cardId, callback) {
  return function (dispatch) {
    apiClient.getCardById(cardId, cardData => {
      dispatch(getCardSuccess(cardData))
      if (callback) {
        callback()
      }
    });
  }

}

export function createCard(newCard) {
  return function (dispatch) {
    apiClient.createCard(newCard, cardData => {
      dispatch(createCardSuccess(cardData))
    })
  }
}