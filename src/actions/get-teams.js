// import base from './../firebase-config';
// import { push } from 'react-router-redux'
import getTeamList from './../api/get-team-list';

function getTeams(userId) {
  return dispatch => {
    dispatch({
      type: 'FETCH_TEAM_LIST'
    });

    getTeamList(userId)
    .then(data => {
      const teamKeys = Object.keys(data);
      console.log(teamKeys);
    });

    // const authDataCallback = user => user && dispatch(userFetched(user));
  }
}

function teamListFetched(teams) {
  return {
    type: 'TEAM_LIST_FETCHED',
    payload: teams
  };
}

export { getTeams, teamListFetched }
