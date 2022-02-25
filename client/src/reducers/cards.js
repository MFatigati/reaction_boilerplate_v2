export default function cards(state = [], action) {
  switch (action.type) {
    case "GET_BOARD_SUCCESS": {
      const lists = action.board.lists
      const justCards = lists.reduce((acc, listItem) => {
        const { cards } = listItem;
        return acc.concat(cards);
      }, []);
      return justCards;
    }
    case "GET_CARD_SUCCESS": {
      return state.concat(action.card)
      //return [action.card];
    }
    case "CREATE_CARD_SUCCESS": {
      return state.concat(action.card);
    }
    default:
      return state;
  }
}
