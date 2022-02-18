export default function boards(state = [], action) {
  switch (action.type) {
    case "FETCH_BOARDS_SUCCESS": {
      return action.boards;
    }
    case "CREATE_BOARD_SUCCESS": {
      const newBoard = action.board;
      return state.concat(newBoard);
    }
    case "GET_BOARD_SUCCESS": {
      let board = state.find(board => {
        return board._id === action.board._id
      });

      if (board) {
        return state
      }

      const { lists, ...boardWithoutLists } = action.board;
      return state.concat(boardWithoutLists);
    }
    default:
      return state;
  }
}
