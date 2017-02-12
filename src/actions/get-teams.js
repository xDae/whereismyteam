// @flow
import { getTeamList, getTeamListExtended } from './../api/get-team-list';

function getTeams(userId: string) {
  return dispatch => {
    dispatch({
      type: 'FETCH_TEAM_LIST'
    });

    getTeamList(userId)
      .then(getTeamListExtended)
      .then(teams => dispatch(teamListFetched(teams)));
  }
}

function teamListFetched(teams: Array<Object>) {
  return {
    type: 'TEAM_LIST_FETCHED',
    payload: teams
  };
}

export { getTeams, teamListFetched };
