import base from './../firebase-config';

function getTeamList (userId) {
  console.log(userId);
  return base.fetch(`users/${userId}/teams`, {
    context: this,
    asArray: false,
    queries: {
      orderByValue: true,
      equalTo: true
    }
  });
  // .then(data => {
  //   // console.log(data);
  //   const teamKeys = Object.keys(data);

  //   teamKeys.forEach(key => {
  //     base.fetch(`teams/${key}`, {
  //       context: this,
  //       asArray: false
  //     })
  //     .then(data => {
  //       const newData = Object.assign(data, { key })

  //       this.setState({
  //         teams: this.state.teams.concat(newData)
  //       });
  //     })
  //   });
  // })
  // .catch(error => {
  //   console.log(error);
  // })
}

export default getTeamList;
