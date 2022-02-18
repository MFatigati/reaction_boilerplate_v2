import * as types from "../constants/ActionTypes";

export default function lists(state = [], action) {
  switch (action.type) {
    case "GET_BOARD_SUCCESS":{
      const lists = action.board.lists
      const listsWithoutCards = lists.map(listItem => {
        const { cards, ...noCardsList } = listItem;
        return noCardsList;
      });

      return state.concat(listsWithoutCards);
    }


    default:
      return state;
  }
}
