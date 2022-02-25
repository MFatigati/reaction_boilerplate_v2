import axios from "axios";
import * as routes from "../constants/ApiRoutes";

function logError(errorResponse) {
  const response = errorResponse.response;

  if (response && response.data && response.data.error) {
    console.error(`HTTP Error: ${response.data.error}`);
  } else {
    console.error("Error: ", errorResponse);
  }
}

function unwrapData(response) {
  return response.data;
}

axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.headers.common["Accept"] = "application/json";

const apiClient = {
  getBoards: function (callback) {
    return axios
      .get(routes.BOARDS_INDEX_URL)
      .then(unwrapData)
      .then(callback)
      .catch(logError);
  },
  createBoard: function (board, callback) {
    return axios
      .post(routes.CREATE_BOARD_URL, { board })
      .then(unwrapData)
      .then(callback)
      .catch(logError);
  },
  getBoard: function (id, callback) {
    return axios
      .get(routes.GET_BOARD_URL + id)
      .then(unwrapData)
      .then(callback)
      .catch(logError)
  },
  createList: function (title, id, callback) {
    return axios
      .post(routes.CREATE_LIST, { boardId: id, list: { title } })
      .then(unwrapData)
      .then(callback)
      .catch(logError)
  },
  updateList: function (listUpdates, callback) {
    return axios
      .put(routes.UPDATE_LIST + listUpdates.id, { title: listUpdates.title })
      .then(unwrapData)
      .then(callback)
      .catch(logError)
  },
  getCardById: function (cardId, callback) {
    return axios
      .get(routes.CARDS_URL + cardId)
      .then(unwrapData)
      .then(callback)
      .catch(logError)
  },
  createCard: function (newCard, callback) {
    return axios 
      .post(routes.CARDS_URL, newCard)
      .then(unwrapData)
      .then(callback)
      .catch(logError)
  }
};

export default apiClient;
