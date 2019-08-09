class User {
  constructor(name, weight, height, goals, workouts) {
    this.name = name;
    this.weight = weight; // in kgs
    this.height = height; // in centimeters
    this.goals = goals; // Array of goals
    this.workouts = workouts; // Array of workouts
  }
}

class Goal {
  constructor(title, detail, deadline, complete = false) {
    this.title = title;
    this.detail = detail;
    this.deadline = deadline;
    this.complete = complete;
  }
}

class Workout {
  constructor(name, days, exercises) {
    this.name = name;
    this.days = days;
    this.exercises = exercises; // Array of exercise
  }
}

// units can be kg, lbs, knph, mph.
class Exercise {
  constructor(name, sets, units = "kg", note = "") {
    this.name = name;
    this.sets = sets;
    this.units = units;
    this.note = note;
  }
}

// Sets is an exisiting class name
class Cycle {
  constructor(intensity, reps, rest) {
    this.intensity = intensity;
    this.reps = reps;
    this.rest = rest;
  }
}

// All weights are stored in kg, in preferances
// weights can be switched to lbs
// rest time in seconds
const pushExercises = [
  new Exercise("Dumbell Bench Press", [new Cycle(20, 15, 60), new Cycle(25, 12, 90), new Cycle(25, 12, 90)]),
  new Exercise("Dumbell Shoulder Press", [new Cycle(12.5, 15, 60), new Cycle(15, 12, 90), new Cycle(15, 12, 90)]),
  new Exercise("Incline Dumbell Press", [new Cycle(20, 15, 60), new Cycle(25, 12, 90), new Cycle(25, 12, 90)]),
  new Exercise("Tricep Pushdown", [new Cycle(30, 15, 60), new Cycle(35, 12, 90), new Cycle(35, 12, 90)]),
  new Exercise("Lateral Raises", [new Cycle(10, 12, 60), new Cycle(12.5, 12, 90), new Cycle(10, 12, 90)]),
  new Exercise("Chest Fly Machine", [new Cycle(60, 15, 60), new Cycle(70, 12, 90), new Cycle(70, 12, 90)]),
  new Exercise("Cable Tricep Extention", [new Cycle(30, 15, 60), new Cycle(35, 12, 90), new Cycle(35, 12, 90)]),
  new Exercise("Shoulder Press Machine", [new Cycle(30, 15, 60), new Cycle(40, 12, 90), new Cycle(40, 12, 90)]),
  new Exercise("Chest Press Machine", [new Cycle(30, 15, 60), new Cycle(40, 12, 90), new Cycle(40, 12, 90)])
];
const pullExercises = [
  new Exercise("Barbell Rows", [new Cycle(20, 15, 60), new Cycle(25, 12, 90), new Cycle(25, 12, 90)]),
  new Exercise("Lat Pulldowns", [new Cycle(12.5, 15, 60), new Cycle(15, 12, 90), new Cycle(15, 12, 90)]),
  new Exercise("Seated Cable Rows", [new Cycle(20, 15, 60), new Cycle(25, 12, 90), new Cycle(25, 12, 90)]),
  new Exercise("Facepull", [new Cycle(30, 15, 60), new Cycle(35, 12, 90), new Cycle(35, 12, 90)]),
  new Exercise("Bicep Curls", [new Cycle(10, 12, 60), new Cycle(12.5, 12, 90), new Cycle(10, 12, 90)]),
  new Exercise("Hammer Curls", [new Cycle(60, 15, 60), new Cycle(70, 12, 90), new Cycle(70, 12, 90)])
];
const legDlExercises = [
  new Exercise("Romanian Deadlift", [new Cycle(90, 8, 90), new Cycle(110, 5, 120), new Cycle(120, 5, 120)]),
  new Exercise("Deadlift", [new Cycle(110, 3, 120), new Cycle(120, 3, 120)]),
  new Exercise("Leg Press", [new Cycle(140, 15, 60), new Cycle(160, 12, 90), new Cycle(160, 12, 90)]),
  new Exercise("Leg Curls", [new Cycle(50, 12, 90), new Cycle(50, 12, 90), new Cycle(50, 12, 90)])
];
const legSqExercises = [
  new Exercise("Squats", [new Cycle(70, 12, 90), new Cycle(90, 10, 120), new Cycle(90, 10, 120)]),
  new Exercise("Romanian Deadlift", [new Cycle(90, 8, 90), new Cycle(110, 5, 120), new Cycle(120, 5, 120)]),
  new Exercise("Leg Press", [new Cycle(140, 12, 60), new Cycle(140, 12, 90), new Cycle(140, 12, 90)]),
  new Exercise("Leg Curls", [new Cycle(50, 12, 90), new Cycle(50, 12, 90), new Cycle(50, 12, 90)])
];

// Workouts week starts on 0 = sunday
const pushWorkout = new Workout("Push", [1, 4], pushExercises);
const pullWorkout = new Workout("Pull", [2, 5], pullExercises);
const legDlWorkout = new Workout("Legs (Dl)", [3], legDlExercises);
const legSqWorkout = new Workout("Legs (Sq)", [6], legSqExercises);

// Goals
const benchGoal = new Goal("Dumbell Bench 40kg", "Reach a dumbell bench of 40kg for atleast 5 reps with good form.", "21/01/20");
const deadliftGoal = new Goal("Deadlift 150kg", "Reach a deadlift (Romainian?) of 150kg for 3 reps with good form.", "21/01/20");

// User
const alanTheUser = new User("Alan Tom", 76, 173, [benchGoal, deadliftGoal], [pushWorkout, pullWorkout, legDlWorkout, legSqWorkout]);

export default alanTheUser;
