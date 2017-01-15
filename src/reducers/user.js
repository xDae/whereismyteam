const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'FETCH_USER':
      return state
    case 'USER_FETCHED':
      return action.payload
    case 'LOGOUT_USER':
      return null
    default:
      return state
  }
}

export default userReducer;
