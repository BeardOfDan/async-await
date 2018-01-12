
const users = [{
  'id': 1,
  'name': 'Andrew',
  'schoolId': 101
}, {
  'id': 2,
  'name': 'Jessica',
  'schoolId': 999
}];

const grades = [{
  'id': 1,
  'schoolId': 101,
  'grade': 86
}, {
  'id': 2,
  'schoolId': 999,
  'grade': 100
}, {
  'id': 1,
  'schoolId': 101,
  'grade': 80
}];

const getUser = (id) => {
  return new Promise((resolve, reject) => {
    const user = users.find((user) => {
      return (user.id === id);
    });

    if (user) {
      resolve(user);
    } else {
      reject(`Unable to find user with id of ${id}.`);
    }
  });
};

const getGrades = (schoolId) => {
  return new Promise((resolve, reject) => {
    resolve(grades.filter((grade) => {
      return (grade.schoolId === schoolId);
    }));
  });
};

// returns 'name has avg. average in the class'
const getStatus = (userId) => {
  let user;

  return getUser(userId)
    .then((tempUser) => {
      user = tempUser
      return getGrades(user.schoolId);
    })
    .then((grades) => {
      if (grades.length > 0) {
        const average = grades.reduce((memo, grade, grades) => {
          return memo + grade.grade;
        }, 0) / grades.length;

        return `${user.name} has an average of ${average}%`;
      }

      return `${user.name} has no grades!`;
    });
};

// getStatus(1)
//   .then((status) => {
//     console.log(status);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

// ========================

const getStatusAlt = async (userId) => {
  const user = await getUser(userId);
  const grades = await getGrades(user.schoolId);

  if (grades.length > 0) {
    const average = grades.reduce((memo, grade, grades) => {
      return memo + grade.grade;
    }, 0) / grades.length;

    return `${user.name} has an average of ${average}%`;
  }

  return `${user.name} has no grades!`;
};

getStatusAlt(1)
  .then((status) => {
    console.log(status);
  })
  .catch((e) => {
    console.log('error:', e);
  });




