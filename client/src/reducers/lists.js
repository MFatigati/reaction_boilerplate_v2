import * as types from "../constants/ActionTypes";

export default function lists(state = [], action) {
  switch (action.type) {
    case "GET_BOARD_SUCCESS": {
      const lists = action.board.lists
      const listsWithoutCards = lists.map(listItem => {
        const { cards, ...noCardsList } = listItem;
        return noCardsList;
      });

      return listsWithoutCards;
    }
    case "CREATE_LIST_SUCCESS": {
      const list = action.list;
      state = state.concat(list);
      return state;
    }


    default:
      return state;
  }
}
