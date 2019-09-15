const getGoals = goals => {
  for (let i in goals) {
    const { deadline, complete, dateCompleted } = goals[i];
    goals[i].deadline = new Date(deadline);
    goals[i].complete = complete === 0 ? false : true;
    if (dateCompleted) {
      goals[i].dateCompleted = new Date(dateCompleted);
    } else {
      goals[i].dateCompleted = undefined;
    }
  }
};

const getWorkouts = workouts => {
  for (let i in workouts) {
    const { last } = workouts[i];
    if (last) {
      workouts[i].last = new Date(last);
    } else {
      workouts[i].last = undefined;
    }
  }
};

// Convert dates into date objects
export const getUser = userData => {
  getGoals(userData.goals);
  getWorkouts(userData.workouts);
  return userData;
};
