import base from './../firebase-config';

function registerTeam (id, name, adminId) {
  return base.post(`teams/${id}`, {
    data: {
      name,
      admin: {
        [adminId]: true
      },
      users: {
        [adminId]: true
      },
      created: base.database.ServerValue.TIMESTAMP
    }
  });
}

function addUser (userid, teamId) {
    return base.update(`users/${userid}/teams`, {
      data: {
        [teamId]: true
      }
    });
  }

export { registerTeam, addUser };
