import uuid from "uuid/v1";
export const getLoginJson = ({ username: u_uname, password: u_passw }) => {
  const user = { u_uname, u_passw };
  return JSON.stringify(user);
};

export const getRegisterJson = ({ username: u_uname, password: u_passw, height, weight, "first name": u_first_name, "last name": u_last_name }) => {
  const user = {
    u_id: uuid(),
    u_uname,
    u_passw,
    u_first_name,
    u_last_name,
    u_height: parseFloat(height),
    u_weight: parseFloat(weight),
    u_date_created: new Date().toISOString().split("Z")[0]
  };
  return JSON.stringify(user);
};

export const getGoalAddJson = ({ uid: u_id, id: g_id, title: g_title, detail: g_detail, deadline, complete }) => {
  const goal = {
    u_id,
    g_id,
    g_title,
    g_detail,
    g_deadline: deadline.toISOString().split("T")[0],
    g_complete: complete ? 1 : 0
  };
  return JSON.stringify(goal);
};

export const getGoalDeleteJson = g_id => {
  return JSON.stringify({ g_id });
};

export const getGoalUpdateJson = ({ id: g_id, complete, dateCompleted }) => {
  const goal = {
    g_id,
    g_complete: complete ? 1 : 0,
    g_date_completed: complete ? dateCompleted.toISOString().split("T")[0] : ""
  };
  return JSON.stringify(goal);
};

const getCycle = ({ id: c_id, intensity: c_intensity, reps: c_reps, rest: c_rest }) => {
  return { c_id, c_intensity, c_reps, c_rest };
};

const getCycles = sets => {
  const e_cycles = [];
  for (let i in sets) {
    e_cycles.push(getCycle(sets[i]));
  }
  return e_cycles;
};

export const getExerciseJson = ({ wid: w_id, eid: e_id, sets, note: e_note, name: e_name, seq: e_seq, units: e_unit }) => {
  const exercise = {
    w_id,
    e_id,
    e_name,
    e_note,
    e_seq,
    e_unit,
    w_date: new Date().toISOString().split("T")[0],
    e_cycles: getCycles(sets)
  };
  return JSON.stringify(exercise);
};

const getExercise = ({ id: e_id, name: e_name, note: e_note, seq: e_seq, sets, units: e_unit }) => {
  return {
    e_id,
    e_name,
    e_note,
    e_seq,
    e_unit,
    e_cycles: getCycles(sets)
  };
};

const getExerciseDone = ({ id: e_id, units: e_unit, note: e_note, sets }) => {
  return {
    e_id,
    e_unit,
    e_note,
    e_cycles: getCycles(sets)
  };
};

const getExercises = (exercises, done = false) => {
  const w_exercises = [];
  for (let i in exercises) {
    if (done) {
      w_exercises.push(getExerciseDone(exercises[i]));
    } else {
      w_exercises.push(getExercise(exercises[i]));
    }
  }
  return w_exercises;
};

export const getWorkoutAddJson = ({ uid: u_id, id: w_id, days, exercises, name: w_name, note: w_note, seq: w_seq }) => {
  const workout = {
    u_id,
    w_id,
    w_seq,
    w_name,
    w_note,
    w_days: days.join(","),
    w_exercises: getExercises(exercises),
    w_date: new Date().toISOString().split("T")[0]
  };
  return JSON.stringify(workout);
};

export const getWorkoutUpdateJson = ({ id: w_id, name: w_name, seq: w_seq, days, note: w_note, exercises, wED: w_exercises_deleted }) => {
  const workout = {
    w_id,
    w_name,
    w_seq,
    w_date: new Date().toISOString().split("T")[0],
    w_days: days.join(","),
    w_note,
    w_exercises: getExercises(exercises),
    w_exercises_deleted
  };
  return JSON.stringify(workout);
};

export const getWorkoutDone = ({ id: w_id, last, note: w_note, exercises }) => {
  const workout = {
    w_id,
    w_date: last.toISOString().split("T")[0],
    w_note,
    w_exercises: getExercises(exercises, true)
  };
  return JSON.stringify(workout);
};

export const getWorkoutDelete = w_id => {
  return JSON.stringify({ w_id });
};
