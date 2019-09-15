import React from "react";
import { workoutKeys, exerciseKeys } from "../../../../helpers/constants";
import { withStyles } from "@material-ui/styles";
import styles from "./workout-add-modal-styles";
import CustomDialog from "../../CustomDialog";
import { Typography, Button, ClickAwayListener, Collapse } from "@material-ui/core";
import { CustomTextField2, CustomTextField3 } from "../../CustomTextField";
import { Days, Exercise } from "../WorkoutModal/WorkoutModalComponents";
import { AddExercise } from "../WorkoutModal/AddExercise";
import { LeftButton, RightButton } from "../../CustomButton";
import { getDay } from "../../../../helpers/helpers";
import { Workout } from "../../../../helpers/classes";

class WorkoutAddModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      workout: new Workout(),
      next: false, // addExercise section
      addExercise: false
    };
    this.handleAddExerciseToggle = this.handleAddExerciseToggle.bind(this);
    this.handleCancelAddWorkout = this.handleCancelAddWorkout.bind(this);
    this.handleRemoveExercise = this.handleRemoveExercise.bind(this);
    this.handleAddExercise = this.handleAddExercise.bind(this);
    this.handleNoteChange = this.handleNoteChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDayChange = this.handleDayChange.bind(this);
    this.handleDone = this.handleDone.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.resetState = this.resetState.bind(this);
    // Refs
    this.workoutNameRef = React.createRef();
  }

  resetState() {
    this.setState({ workout: new Workout(), next: false, addExercise: false, error: "" });
  }
  j;
  handleNameChange(e) {
    const { value } = e.target;
    this.setState(({ workout }) => {
      workout[workoutKeys.name] = value;
      return { workout, error: "" };
    });
  }

  handleNoteChange(e) {
    const { value } = e.target;
    this.setState(({ workout }) => {
      workout[workoutKeys.note] = value;
      return { workout, error: "" };
    });
  }

  handleDayChange(e) {
    const value = parseInt(e.target.value);
    this.setState(({ workout }) => {
      let { days } = workout;
      let diff = days.filter(d => d !== value);
      if (diff.length === days.length) {
        days.push(value);
        days.sort();
        workout[workoutKeys.days] = days;
        return { workout, error: "", change: true };
      } else if (diff.length < days.length) {
        workout[workoutKeys.days] = diff;
        return { workout, error: "", change: true };
      }
    });
  }

  handleNext() {
    const { workout } = this.state;
    if (workout[workoutKeys.name] === "") {
      this.setState({ error: "name can't be blank" });
    } else if (workout[workoutKeys.days].length === 0) {
      this.setState({ error: "atleast one day is required" });
    } else {
      this.setState({ next: true, error: "" });
    }
  }

  handleBack() {
    this.setState({ next: false, error: "" });
  }

  handleDone() {
    const { workout } = this.state;
    if (workout[workoutKeys.exercises].length === 0) {
      this.setState({ error: "atleast one exercise is required" });
    } else {
      this.props.handleWorkoutAdd(workout);
      this.handleCancelAddWorkout();
    }
  }

  handleCancelAddWorkout() {
    this.resetState();
    this.props.handleWorkoutAddModalToggle();
  }

  handleAddExercise(exercise) {
    this.setState(({ workout }) => {
      const seq = workout[workoutKeys.exercises].length;
      exercise.seq = seq;
      workout[workoutKeys.exercises].push(exercise);
      return { workout, addExercise: false };
    });
  }

  handleRemoveExercise(id) {
    this.setState(({ workout }) => {
      let notToRemove = workout[workoutKeys.exercises].filter(ex => ex.id !== id);
      workout[workoutKeys.exercises] = notToRemove;
      return { workout };
    });
  }

  handleAddExerciseToggle() {
    this.setState(({ addExercise }) => ({ addExercise: !addExercise }));
  }

  render() {
    const { open, classes } = this.props;
    const { error, workout, addExercise, next } = this.state;
    const { name, exercises, note, days } = workout;
    let daysString = days.map((d, i) => getDay(d)).join(" ");
    daysString = daysString === "" ? " " : daysString;
    if (open && name.trim() === "") {
      // Focus on the workout title input.
      setTimeout(() => this.workoutNameRef.current.getElementsByTagName("input")[0].focus(), 300);
    }
    return (
      <CustomDialog
        open={open}
        onKeyPress={e => {
          // if (e.key === "Enter") {
          //   this.updateAndClose();
          // }
        }}
      >
        <ClickAwayListener onClickAway={this.handleCancelAddWorkout}>
          <div className={`${classes.container}`}>
            <Collapse in={!addExercise}>
              <Typography component="h2" className={`${classes.subTitle}`}>
                Add Workout
              </Typography>
              <Collapse in={error !== ""}>
                <Typography component="p" className={`${classes.error}`} color="error">
                  {error}
                </Typography>
              </Collapse>
              <hr className={`${classes.divisor} ${classes.topDivisor}`} />
              <div className={`${classes.header}`}>
                <CustomTextField3
                  ref={this.workoutNameRef}
                  className={`${classes.title}`}
                  value={name}
                  disabled={next}
                  onChange={this.handleNameChange}
                  placeholder="Add workout name"
                />
                <Typography component="h3" className={`${classes.exerciseCount}`}>
                  {workout[workoutKeys.exercises].length} exercises
                </Typography>
              </div>
              <Days daysString={daysString} open={!next} days={days} handleDayChange={this.handleDayChange} />
            </Collapse>
            <Collapse in={!next}>
              <CustomTextField2
                placeholder="Add note"
                value={note}
                rowsMax="4"
                multiline
                onChange={this.handleNoteChange}
                fullWidth
                disabled={next}
                className={`${classes.note}`}
              />
            </Collapse>

            <Collapse in={next && !addExercise}>
              {workout[workoutKeys.exercises].length === 0 && (
                <Typography component="p" className={`${classes.message}`}>
                  Add some exercises to your workout.
                </Typography>
              )}
              <div className={`${classes.workoutContainer}`} component="ul">
                {exercises.map((ex, i) => (
                  <Exercise key={i} name={ex[exerciseKeys.name]} id={ex.id} index={i + 1} collapsed={true} onRemoveExerciseClick={this.handleRemoveExercise} />
                ))}
              </div>
            </Collapse>

            <AddExercise open={addExercise} handleAddExercise={this.handleAddExercise} handleCancelAddExercise={this.handleAddExerciseToggle} />
            <Collapse in={next && !addExercise}>
              <hr className={`${classes.divisor}`} />
              <div className={`${classes.buttonContainerThree}`}>
                <LeftButton className={`${classes.button}`} onClick={this.handleBack} disableRipple>
                  back
                </LeftButton>
                <Button className={`${classes.button}`} onClick={this.handleAddExerciseToggle} disableRipple>
                  add exercise
                </Button>
                <RightButton className={`${classes.button}`} onClick={this.handleDone} disableRipple>
                  done
                </RightButton>
              </div>
            </Collapse>

            <Collapse in={!next && !addExercise}>
              <hr className={`${classes.divisor}`} />
              <div className={`${classes.buttonContainer}`}>
                <LeftButton className={`${classes.button}`} onClick={this.handleCancelAddWorkout} disableRipple>
                  cancel
                </LeftButton>
                <RightButton className={`${classes.button}`} onClick={this.handleNext} disableRipple>
                  next
                </RightButton>
              </div>
            </Collapse>
          </div>
        </ClickAwayListener>
      </CustomDialog>
    );
  }
}

export default withStyles(styles)(WorkoutAddModal);
