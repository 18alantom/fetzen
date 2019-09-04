import clone from "clone";
import React from "react";
import { workoutKeys, exerciseKeys } from "../../../../helpers/constants";
import { withStyles } from "@material-ui/styles";
import styles from "./workout-add-modal-styles";
import CustomDialog from "../../CustomDialog";
import { ExpandMore, ExpandLess } from "@material-ui/icons";
import { Typography, IconButton, ClickAwayListener, Collapse } from "@material-ui/core";
import { CustomTextField2, CustomTextField3 } from "../../CustomTextField";
import { Days, AreYouSure, Exercise } from "../WorkoutModal/WorkoutModalComponents";
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
      next: false // addExercise section
    };
    // this.handleCollapseButton = this.handleCollapseButton.bind(this);
    // this.handleRemoveExercise = this.handleRemoveExercise.bind(this);
    // this.handleDeleteWorkout = this.handleDeleteWorkout.bind(this);
    // this.handleDeleteChoice = this.handleDeleteChoice.bind(this);
    // this.handleAddExerciseToggle = this.handleAddExerciseToggle.bind(this);
    // this.handleAddExercise = this.handleAddExercise.bind(this);
    // this.handleCancelAddExercise = this.handleCancelAddExercise.bind(this);
    // this.updateAndClose = this.updateAndClose.bind(this);
    // this.restoreAndClose = this.restoreAndClose.bind(this);
    this.handleCancelAddWorkout = this.handleCancelAddWorkout.bind(this);
    this.handleNoteChange = this.handleNoteChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDayChange = this.handleDayChange.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.resetState = this.resetState.bind(this);
    // Refs
    this.workoutNameRef = React.createRef();
  }

  // handleRemoveExercise(id) {
  // this.setState(({ exercises }) => {
  //   let notToRemove = exercises.filter(ex => ex.id !== id);
  //   if (exercises.length > 1) {
  //     return { exercises: notToRemove };
  //   } else {
  //     return { error: "atleast one exercise is required" };
  //   }
  // });
  // }

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

  // handleAddExerciseToggle() {
  //   this.setState({ addExercise: true, confirmDelete: false, error: "" });
  // }

  resetState() {
    this.setState({ workout: new Workout(), next: false, error: "" });
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

  handleCancelAddWorkout() {
    this.resetState();
    this.props.handleWorkoutAddModalToggle();
  }

  // handleAddExercise(exercise) {
  //   this.setState(({ exercises }) => {
  //     exercises.push(exercise);
  //     return { exercises, addExercise: false, change: true };
  //   });
  // }
  // handleCancelAddExercise() {
  //   this.setState({ addExercise: false });
  // }

  render() {
    const { open, classes } = this.props;
    const { error, workout, next } = this.state;
    const { name, exercises, note, days } = workout;
    let daysString = days.map((d, i) => getDay(d)).join(" ");
    daysString = daysString === "" ? " " : daysString;
    return (
      <CustomDialog
        open={open}
        onKeyPress={e => {
          // if (e.key === "Enter") {
          //   this.updateAndClose();
          // }
        }}
      >
        {/* <ClickAwayListener onClickAway={this.handleCancelAddWorkout}> */}
        <div className={`${classes.container}`}>
          <Typography component="h2" className={`${classes.subTitle}`}>
            Add Workout
          </Typography>
          <Collapse in={error !== ""}>
            <Typography component="p" className={`${classes.error}`} color="error">
              {error}
            </Typography>
          </Collapse>
          <hr className={`${classes.divisor} ${classes.topDivisor}`} />
          {/* <div className={`${classes.header}`}> */}
          <CustomTextField3
            ref={this.workoutNameRef}
            className={`${classes.title}`}
            value={name}
            disabled={next}
            onChange={this.handleNameChange}
            placeholder="Add workout name"
          />
          <Days daysString={daysString} open={!next} days={days} handleDayChange={this.handleDayChange} />
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
          {/* </div> */}

          <Collapse in={!next}>
            {/* <div className={`${classes.workoutContainer}`} component="ul">
                {exercises.map((ex, i) => (
                  <Exercise
                    key={i}
                    name={ex[exerciseKeys.name]}
                    id={ex.id}
                    index={i + 1}
                    collapsed={collapsed}
                    onRemoveExerciseClick={this.handleRemoveExercise}
                  />
                ))}
              </div> */}
          </Collapse>
          <hr className={`${classes.divisor}`} />

          <Collapse in={!next}>
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
        {/* </ClickAwayListener> */}
      </CustomDialog>
    );
  }
}

export default withStyles(styles)(WorkoutAddModal);
