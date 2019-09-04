import uuid from "uuid/v1";
// Classes
export class User {
  constructor(name = "", weight = 0, height = 0, goals = [], workouts = []) {
    this.id = uuid();
    this.name = name;
    this.weight = weight; // in kgs
    this.height = height; // in centimeters
    this.goals = goals; // Array of goals
    this.workouts = workouts; // Array of workouts
  }
}

export class Goal {
  constructor(title = "", detail = "", deadline = undefined, complete = false, dateCompleted = undefined) {
    this.id = uuid();
    this.title = title;
    this.detail = detail;
    this.deadline = deadline;
    this.complete = complete;
    this.dateCompleted = dateCompleted;
  }
}

export class Workout {
  constructor(name = "", days = [], exercises = [], last = undefined, note = "") {
    this.id = uuid();
    this.name = name;
    this.days = days;
    this.exercises = exercises; // Array of exercise
    this.last = last;
    this.note = note;
  }
}

// units can be kg, lbs, knph, mph.
export class Exercise {
  constructor(name = "", sets = [], units = "kg", note = "") {
    this.id = uuid();
    this.name = name;
    this.sets = sets;
    this.units = units;
    this.note = note;
  }
}

// Sets is an exisiting class name
export class Cycle {
  constructor(intensity = 0, reps = 0, rest = 0) {
    this.id = uuid();
    this.intensity = intensity;
    this.reps = reps;
    this.rest = rest;
  }
}
