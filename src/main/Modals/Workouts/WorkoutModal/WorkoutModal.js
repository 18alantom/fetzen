import React from "react";
import { workoutKeys, exerciseKeys } from "../../../../helpers/constants";
import { withStyles } from "@material-ui/styles";
import styles from "./workout-modal-styles";
import CustomDialog from "../../CustomDialog";
import { CustomTextField2 } from "../../CustomTextField";
import { ExpandMore, ExpandLess, Remove } from "@material-ui/icons";
import { Typography, IconButton, Button, ClickAwayListener, Collapse } from "@material-ui/core";
import { getDay } from "../../../../helpers/helpers";

// TODO: Add a key to the workout modal component to force update on key change.
const Exercise = withStyles(styles)(function(props) {
  const { classes, index, id, name, onAddRemoveClick, collapsed } = props;
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
            onAddRemoveClick(id);
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
      note: this.props.workout[workoutKeys.note],
      collapsed: false // collapsed = false means it is collapsed
    };
    this.handleCollapseButton = this.handleCollapseButton.bind(this);
    this.handleAddRemove = this.handleAddRemove.bind(this);
  }
  handleCollapseButton() {
    this.setState(({ collapsed }) => ({ collapsed: !collapsed, error: "" }));
  }

  handleAddRemove(id) {
    console.log(id);
  }

  render() {
    const { open, classes, workout, handleClose } = this.props;
    const { error, collapsed } = this.state;
    const { note } = workout;
    const days = workout[workoutKeys.days].map((d, i) => getDay(d)).join(" ");
    return (
      <CustomDialog
        open={open}
        onKeyPress={e => {
          if (e.key === "Enter") {
            // this.updateAndClose();
            handleClose();
          }
        }}
      >
        <ClickAwayListener onClickAway={handleClose}>
          <div className={`${classes.container}`}>
            <div className={`${classes.header}`}>
              <Typography component="h2" className={`${classes.title}`}>
                {workout[workoutKeys.name]}
              </Typography>
              <Typography component="h3" className={`${classes.lastCompleted}`}>
                {workout[workoutKeys.last].toDateString()}
              </Typography>
            </div>

            <Collapse in={error !== ""}>
              <Typography component="p" className={`${classes.error}`} color="error">
                {error}
              </Typography>
            </Collapse>

            <div className={`${classes.daysContainer}`}>
              <Typography component="p" className={`${classes.days}`}>
                {days}
              </Typography>
            </div>

            <div className={`${classes.workoutContainer}`} component="ul">
              {workout[workoutKeys.exercises].map((ex, i) => (
                <Exercise key={i} name={ex[exerciseKeys.name]} id={ex.id} index={i + 1} collapsed={collapsed} onAddRemoveClick={this.handleAddRemove} />
              ))}
            </div>

            {/* <Collapse in={collapsed}>
              <div>
                <AddExercise />
              </div>
            </Collapse> */}
            <Collapse in={collapsed || note !== ""}>
              <CustomTextField2
                placeholder="Add a note"
                value={note}
                rowsMax="4"
                multiline
                // onChange={this.handleNoteChange}
                fullWidth
                disabled={!collapsed}
                className={`${classes.note}`}
              />
            </Collapse>

            <div className={`${classes.buttonContainer}`}>
              <Button className={`${classes.button}`} onClick={this.updateAndClose}>
                update
              </Button>
              <IconButton disableRipple size="small" className={`${classes.button}`} onClick={this.handleCollapseButton}>
                {collapsed ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
              <Button className={`${classes.button}`} onClick={handleClose}>
                close
              </Button>
            </div>
          </div>
        </ClickAwayListener>
      </CustomDialog>
    );
  }
}

export default withStyles(styles)(WorkoutModal);
