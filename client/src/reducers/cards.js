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
    default:
      return state;
  }
}
