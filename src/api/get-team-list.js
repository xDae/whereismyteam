// @flow

import base from '../firebase-config';
import pickBy from 'lodash/pickBy';

function getTeamList (userId: string) {
  return base.database().ref(`users/${userId}/teams`).once('value')
    .then(teams => {
      const teamsArray = Object.keys(pickBy(teams.val(), (teams => teams === true)));
      return teamsArray;
    })
    .catch(error => console.log(error));
}

function getTeamListExtended (teamKeysArray: Array<Object>) {
    const promises = teamKeysArray.map(key => {
      return base.database().ref(`teams/${key}`).once('value')
        .then(team => ({key, ...team.val()}));
    });

    return Promise.all(promises);
}

export { getTeamList, getTeamListExtended };
