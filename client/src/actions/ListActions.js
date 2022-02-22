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