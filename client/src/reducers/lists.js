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
    case "UPDATE_LIST_SUCCESS": {
      return state.map(list => {
        if (list._id === action.list._id) {
          return action.list;
        } else {
          return list;
        }
      })
    }

    default:
      return state;
  }
}
