import clone from "clone";
import React from "react";
import { workoutKeys, exerciseKeys } from "../../../../helpers/constants";
import { withStyles } from "@material-ui/styles";
import styles from "./workout-modal-styles";
import CustomDialog from "../../CustomDialog";
import { ExpandMore, ExpandLess, Remove } from "@material-ui/icons";
import { Typography, FormControl, FormControlLabel, IconButton, ClickAwayListener, Collapse } from "@material-ui/core";
import { CustomTextField2, CustomTextField3 } from "../../CustomTextField";
import { CustomCheckbox } from "../../CustomCheckbox";
import { LeftButton, RightButton } from "../../CustomButton";
import { getDay } from "../../../../helpers/helpers";

const Days = withStyles(styles)(function(props) {
  const { classes, daysString, collapsed, days, handleDayChange } = props;
  return (
    <div className={`${classes.daysContainer}`}>
      <Typography component="p" className={`${classes.days}`}>
        {daysString}
      </Typography>
      <Collapse in={collapsed}>
        <FormControl className={`${classes.checkboxContainer}`}>
          {[...Array(7).keys()].map(i => {
            let checked = false;
            if (days.find(d => d === i) + 1) {
              checked = true;
            }
            return (
              <FormControlLabel
                className={classes.checkboxLabel}
                label={getDay(i)}
                key={i}
                control={
                  <CustomCheckbox
                    onChange={handleDayChange}
                    checked={checked}
                    value={i}
                    color="primary"
                    inputProps={{
                      "aria-label": "primary checkbox"
                    }}
                  />
                }
              />
            );
          })}
        </FormControl>
        <hr className={classes.divisor} />
      </Collapse>
    </div>
  );
});

const AreYouSure = withStyles(styles)(function(props) {
  const { name, classes, confirmDelete, collapsed, handleDeleteChoice } = props;
  return (
    <Collapse in={confirmDelete && collapsed}>
      <Typography component="p" className={`${classes.areYouSure}`}>
        {`Are you sure you want to delete the workout ${name}, this action can't be undone.`}
      </Typography>
      <div className={`${classes.buttonContainer}`}>
        <LeftButton
          className={`${classes.button}`}
          onClick={() => {
            handleDeleteChoice(false);
          }}
        >
          cancel
        </LeftButton>
        <RightButton
          className={`${classes.button}`}
          onClick={() => {
            handleDeleteChoice(true);
          }}
        >
          delete
        </RightButton>
      </div>
    </Collapse>
  );
});

const Exercise = withStyles(styles)(function(props) {
  const { classes, index, id, name, onRemoveExerciseClick, collapsed } = props;
  return (
    <div className={`${classes.exercise} ${classes[`col${(index - 1) % 2}`]}`} component="li">
      <Typography component="p" className={`${classes.index}`}>
        {index}.
      </Typography>
      <Typography component="p" className={`${classes.exerciseName}`}>
        {name}
      </Typography>
      {collapsed && (
        <IconButton
          disableRipple
          size="small"
          className={`${classes.button} ${classes.addRemoveButton}`}
          onClick={() => {
            onRemoveExerciseClick(id);
          }}
        >
          <Remove />
        </IconButton>
      )}
    </div>
  );
});

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
      collapsed: false // collapsed = false means it is collapsed
    };
    this.handleCollapseButton = this.handleCollapseButton.bind(this);
    this.handleRemoveExercise = this.handleRemoveExercise.bind(this);
    this.handleNoteChange = this.handleNoteChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDayChange = this.handleDayChange.bind(this);
    this.handleDeleteWorkout = this.handleDeleteWorkout.bind(this);
    this.handleDeleteChoice = this.handleDeleteChoice.bind(this);
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
    this.setState({ name, note, exercises: clone(exercises), days: clone(days), collapsed: false, error: "", change: false,confirmDelete: false });
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

  render() {
    const { open, classes, workout } = this.props;
    const { error, collapsed, note, days, name, exercises, change, confirmDelete } = this.state;
    const daysString = days.map((d, i) => getDay(d)).join(" ");
    return (
      <CustomDialog
        open={open}
        onKeyPress={e => {
          if (e.key === "Enter") {
            this.updateAndClose();
          }
        }}
      >
        <ClickAwayListener onClickAway={this.restoreAndClose}>
          <div className={`${classes.container}`}>
            <div className={`${classes.header}`}>
              <CustomTextField3 className={`${classes.title}`} value={name} disabled={!collapsed} onChange={this.handleNameChange} />
              <Typography component="h3" className={`${classes.lastCompleted}`}>
                {workout[workoutKeys.last].toDateString()}
              </Typography>
            </div>

            <Collapse in={!confirmDelete}>
              <Collapse in={error !== ""}>
                <Typography component="p" className={`${classes.error}`} color="error">
                  {error}
                </Typography>
              </Collapse>

              <Collapse in={collapsed}>
                <hr className={`${classes.divisor} ${classes.topDivisor}`} />
              </Collapse>

              <Days daysString={daysString} collapsed={collapsed} days={days} handleDayChange={this.handleDayChange} />

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

            <Collapse in={collapsed && !confirmDelete}>
              <hr className={classes.divisor} />
            </Collapse>

            <Collapse in={(collapsed || note !== "") && !confirmDelete}>
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
            <Collapse in={collapsed && !confirmDelete}>
              <hr className={`${classes.divisor} ${classes.topDivisor}`} />
              <div className={`${classes.buttonContainer}`}>
                <LeftButton className={`${classes.button}`} onClick={() => {}}>
                  add an exercise
                </LeftButton>
                <RightButton className={`${classes.button}`} onClick={this.handleDeleteWorkout}>
                  delete workout
                </RightButton>
              </div>
            </Collapse>

            <AreYouSure name={name} handleDeleteChoice={this.handleDeleteChoice} confirmDelete={confirmDelete} collapsed={collapsed} />

            <Collapse in={!confirmDelete}>
              <div className={`${classes.buttonContainer}`}>
                <LeftButton className={`${classes.button}`} onClick={this.updateAndClose} disabled={!change}>
                  update
                </LeftButton>
                <IconButton disableRipple size="small" className={`${classes.button}`} onClick={this.handleCollapseButton}>
                  {collapsed ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
                <RightButton className={`${classes.button}`} onClick={this.restoreAndClose}>
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
