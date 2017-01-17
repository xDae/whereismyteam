const teamsReducer = (state = [], action) => {
  switch (action.type) {
    case 'TEAM_LIST_FETCHED':
      return action.payload
    default:
      return state
  }
}

export default teamsReducer;
