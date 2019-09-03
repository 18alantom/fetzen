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
      days: clone(this.props.workout[workoutKeys.days]),
      change: false,
      confirmDelete: false,
      addExercise: false,
      collapsed: false // collapsed = false means it is collapsed
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
    this.restoreAndClose = this.restoreAndClose.bind(this);
  }
  handleCollapseButton() {
    this.setState(({ collapsed }) => ({ collapsed: !collapsed, error: "" }));
  }

  handleRemoveExercise(id) {
    this.setState(({ exercises }) => {
      let notToRemove = exercises.filter(ex => ex.id !== id);
      if (exercises.length > 1) {
        return { exercises: notToRemove };
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
    const { handleClose } = this.props;
    handleClose();
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
      this.props.handleClose();
    }
  }

  handleAddExerciseToggle() {
    this.setState({ addExercise: true, confirmDelete: false, error: "" });
  }

  handleAddExercise(exercise) {
    this.setState(({ exercises }) => {
      exercises.push(exercise);
      return { exercises, addExercise: false, change: true };
    });
  }
  handleCancelAddExercise() {
    this.setState({ addExercise: false });
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
                className={`${classes.title}`}
                value={name}
                disabled={!collapsed && !(addExercise || confirmDelete)}
                onChange={this.handleNameChange}
              />
              <Typography component="h3" className={`${classes.lastCompleted}`}>
                {workout[workoutKeys.last].toDateString()}
              </Typography>
            </div>

            <Collapse in={!confirmDelete && !addExercise}>
              <Collapse in={error !== ""}>
                <Typography component="p" className={`${classes.error}`} color="error">
                  {error}
                </Typography>
              </Collapse>

              <Collapse in={collapsed}>
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

            <Collapse in={collapsed && (!confirmDelete && !addExercise)}>
              <hr className={classes.divisor} />
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
