

const InitialState = {
  user: null
};

const userReducer = (state = InitialState, action) => {
  switch (action.type) {
    case 'FETCH_USER':
      return state
    case 'USER_FETCHED':
      return {...state, user: action.payload }
    default:
      return state
  }
}

export default userReducer;
