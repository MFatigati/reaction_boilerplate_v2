import apiClient from "../lib/ApiClient";
import * as types from "../constants/ActionTypes";

export function createListSuccess(list) {
  return { type: types.CREATE_LIST_SUCCESS, list };
}

export function createList(title, id) {
  return function (dispatch) {
    apiClient.createList(title, id, list => {
      dispatch(createListSuccess(list));
    });
  };
};

export function updateListSuccess(listUpdates) {
  return { type: types.UPDATE_LIST_SUCCESS, listUpdates };
}

export function updateList(listUpdates) {
  return function (dispatch) {
    apiClient.updateList(listUpdates, list => {
      dispatch(updateListSuccess(list));
    });
  };
};