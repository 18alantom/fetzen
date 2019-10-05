import clone from "clone";
import React from "react";
import { workoutKeys, exerciseKeys } from "../../../../helpers/constants";
import { withStyles } from "@material-ui/styles";
import styles from "./workout-modal-styles";
import CustomDialog from "../../CustomDialog";
import { ExpandMore, ExpandLess } from "@material-ui/icons";
import { Typography, IconButton, ClickAwayListener, Collapse } from "@material-ui/core";
import { CustomTextField2, CustomTextField3 } from "../../CustomTextField";
import { Days, AreYouSure, Exercise } from "./WorkoutModalComponents";
import { endpoints } from "../../../../helpers/endpoints";
import { LeftButton, RightButton } from "../../CustomButton";
import { getDay } from "../../../../helpers/helpers";
import { AddExercise } from "./AddExercise";

class WorkoutModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      name: this.props.workout[workoutKeys.name],
      note: this.props.workout[workoutKeys.note],
      exercises: clone(this.props.workout[workoutKeys.exercises]),
      exercisesRemoved: [],
      days: clone(this.props.workout[workoutKeys.days]),
      change: false,
      confirmDelete: false,
      addExercise: false,
      collapsed: false, // collapsed = false means it is collapsed
      last: []
    };
    this.handleCollapseButton = this.handleCollapseButton.bind(this);
    this.handleRemoveExercise = this.handleRemoveExercise.bind(this);
    this.handleNoteChange = this.handleNoteChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDayChange = this.handleDayChange.bind(this);
    this.handleDeleteWorkout = this.handleDeleteWorkout.bind(this);
    this.handleDeleteChoice = this.handleDeleteChoice.bind(this);
    this.handleAddExerciseToggle = this.handleAddExerciseToggle.bind(this);
    this.handleAddExercise = this.handleAddExercise.bind(this);
    this.handleCancelAddExercise = this.handleCancelAddExercise.bind(this);
    this.updateAndClose = this.updateAndClose.bind(this);
    this.handleDoneDateClick = this.handleDoneDateClick.bind(this);
    this.restoreAndClose = this.restoreAndClose.bind(this);
    // Refs
    this.workoutNameRef = React.createRef();
  }

  componentDidMount() {
    const { sendData, workout } = this.props;
    const body = JSON.stringify({ w_id: workout.id });
    sendData(endpoints.workouts.last, "", body, "POST", last => {
      console.log(last);
      this.setState({ last });
    });
  }

  handleCollapseButton() {
    this.setState(({ collapsed }) => ({ collapsed: !collapsed, error: "" }));
  }

  handleRemoveExercise(id) {
    this.setState(({ exercises, exercisesRemoved }) => {
      let notToRemove = exercises.filter(ex => ex.id !== id);
      if (exercises.length > 1) {
        exercisesRemoved.push(exercises.filter(ex => ex.id === id)[0].id);
        exercises.forEach((e, i) => (e.seq = i));
        return { exercises: notToRemove, change: true, exercisesRemoved };
      } else {
        return { error: "atleast one exercise is required" };
      }
    });
  }

  handleNoteChange(e) {
    this.setState({ note: e.target.value, error: "", change: true });
  }

  handleNameChange(e) {
    this.setState({ name: e.target.value, error: "", change: true });
  }

  updateAndClose() {
    const { handleClose, wid, handleWorkoutUpdate, workout } = this.props;
    const { name, note, exercises, days, exercisesRemoved } = this.state;
    if (name === "") {
      this.setState({ collapsed: true, error: "name can't be blank" });
      this.workoutNameRef.current.getElementsByTagName("input")[0].focus();
      return;
    } else {
      handleWorkoutUpdate(wid, name, note, exercises, days, exercisesRemoved, workout.seq, workout.id);
      // handleWorkoutUpdate(wid, name, note, exercises, days, exercisesRemoved, workout.seq);
      this.setState({
        collapsed: false,
        error: "",
        change: false,
        confirmDelete: false,
        addExercise: false
      });
      handleClose();
    }
  }

  restoreAndClose() {
    const { handleClose, workout } = this.props;
    const { name, note, exercises, days } = workout;
    this.setState({
      name,
      note,
      exercises: clone(exercises),
      days: clone(days),
      collapsed: false,
      error: "",
      change: false,
      confirmDelete: false,
      addExercise: false
    });
    handleClose();
  }

  handleDayChange(e) {
    const value = parseInt(e.target.value);
    this.setState(({ days }) => {
      let diff = days.filter(d => d !== value);
      if (diff.length === days.length) {
        days.push(value);
        days.sort();
        return { days, error: "", change: true };
      } else if (diff.length < days.length && diff.length > 0) {
        return { days: diff, error: "", change: true };
      } else if (diff.length === 0) {
        return { error: "atleast one day is required" };
      }
    });
  }

  handleDeleteWorkout() {
    this.setState({ confirmDelete: true, error: "" });
  }

  handleDeleteChoice(choice) {
    this.setState({ confirmDelete: false });
    if (choice) {
      this.props.handleDeleteWorkoutConfirm(this.props.wid, this.state.name);
      this.props.handleClose();
    }
  }

  handleAddExerciseToggle() {
    this.setState({ addExercise: true, confirmDelete: false, error: "" });
  }

  handleAddExercise(exercise) {
    this.setState(({ exercises }) => {
      const seq = exercises.length;
      exercise.seq = seq;
      exercises.push(exercise);
      return { exercises, addExercise: false, change: true };
    });
  }

  handleCancelAddExercise() {
    this.setState({ addExercise: false });
  }

  handleDoneDateClick() {
    console.log(this.state.last);
  }

  render() {
    const { open, classes, workout } = this.props;
    const { error, collapsed, note, days, name, exercises, change, confirmDelete, addExercise } = this.state;
    const daysString = days.map((d, i) => getDay(d)).join(" ");
    return (
      <CustomDialog
        open={open}
        onKeyPress={e => {
          // if (e.key === "Enter") {
          //   this.updateAndClose();
          // }
        }}
      >
        <ClickAwayListener onClickAway={this.restoreAndClose}>
          <div className={`${classes.container}`}>
            <div className={`${classes.header}`}>
              <CustomTextField3
                ref={this.workoutNameRef}
                className={`${classes.title}`}
                value={name}
                disabled={!collapsed && !(addExercise || confirmDelete)}
                onChange={this.handleNameChange}
              />
              {workout[workoutKeys.last] && (
                <Typography component="h3" className={`${classes.lastCompleted}`} onClick={this.handleDoneDateClick}>
                  {workout[workoutKeys.last].toDateString()}
                </Typography>
              )}
            </div>

            <Collapse in={!confirmDelete && !addExercise}>
              <Collapse in={error !== ""}>
                <Typography component="p" className={`${classes.error}`} color="error">
                  {error}
                </Typography>
              </Collapse>

              <Collapse in={collapsed}>
                <Typography component="h2" className={`${classes.subTitle}`}>
                  Edit Workout
                </Typography>
                <hr className={`${classes.divisor} ${classes.topDivisor}`} />
              </Collapse>

              <Days daysString={daysString} open={collapsed} days={days} handleDayChange={this.handleDayChange} />

              <div className={`${classes.workoutContainer}`} component="ul">
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
              </div>
            </Collapse>

            <Collapse in={(collapsed || note !== "") && !confirmDelete && !addExercise}>
              <CustomTextField2
                placeholder="Add a note"
                value={note}
                rowsMax="4"
                multiline
                onChange={this.handleNoteChange}
                fullWidth
                disabled={!collapsed}
                className={`${classes.note}`}
              />
            </Collapse>
            <Collapse in={collapsed && (!confirmDelete && !addExercise)}>
              <hr className={`${classes.divisor} ${classes.topDivisor}`} />
              <div className={`${classes.buttonContainer}`}>
                <LeftButton className={`${classes.button}`} onClick={this.handleAddExerciseToggle} disableRipple>
                  add an exercise
                </LeftButton>
                <RightButton className={`${classes.button}`} onClick={this.handleDeleteWorkout} disableRipple>
                  delete workout
                </RightButton>
              </div>
            </Collapse>

            <AreYouSure name={name} handleDeleteChoice={this.handleDeleteChoice} open={confirmDelete && collapsed && !addExercise} />
            <AddExercise open={addExercise} handleAddExercise={this.handleAddExercise} handleCancelAddExercise={this.handleCancelAddExercise} />

            <Collapse in={!confirmDelete && !addExercise}>
              <div className={`${classes.buttonContainerThree}`}>
                {!collapsed ? (
                  <LeftButton className={`${classes.button}`} onClick={this.handleAddExerciseToggle} disableRipple>
                    add an exercise
                  </LeftButton>
                ) : (
                  <LeftButton className={`${classes.button}`} onClick={this.updateAndClose} disabled={!change} disableRipple>
                    update
                  </LeftButton>
                )}
                <IconButton disableRipple size="small" className={`${classes.button}`} onClick={this.handleCollapseButton}>
                  {collapsed ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
                <RightButton className={`${classes.button}`} onClick={this.restoreAndClose} disableRipple>
                  close
                </RightButton>
              </div>
            </Collapse>
          </div>
        </ClickAwayListener>
      </CustomDialog>
    );
  }
}

export default withStyles(styles)(WorkoutModal);
