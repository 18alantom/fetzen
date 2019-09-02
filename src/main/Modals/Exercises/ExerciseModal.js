import React from "react";
import clone from "clone";
import { exerciseKeys, setKeys } from "../../../helpers/constants";
import { withStyles } from "@material-ui/styles";
import { ExpandMore, ExpandLess, Add, Remove } from "@material-ui/icons";
import { IconButton, Collapse, Typography, Button, InputAdornment, ClickAwayListener } from "@material-ui/core";
import { CustomTextField1, CustomTextField2 } from "../CustomTextField";
import { Cycle } from "../../../helpers/classes";
import styles from "./exercise-modal-styles";
import CustomDialog from "../CustomDialog";

const Set = withStyles(styles)(function(props) {
  function onChangeHandler(e) {
    const { name, value } = e.target;
    const { onSetContentUpdate, onNewSetContentUpdate } = props;
    const { id } = props.set;
    const onSetUpdate = onSetContentUpdate || onNewSetContentUpdate;
    onSetUpdate(id, name, value);
  }

  const { classes, units, set, collapsed, index } = props;

  return (
    <div className={`${classes.setContainerOuter}`}>
      <Typography className={`${classes.index}`}>{index}.</Typography>
      <div className={`${classes.setContainer}`}>
        <CustomTextField1
          className={`${classes.detail}`}
          value={set[setKeys.intensity]}
          name="intensity"
          type="number"
          onChange={onChangeHandler}
          InputProps={{ endAdornment: <InputAdornment position="end">{units}</InputAdornment> }}
        />
        <CustomTextField1
          className={`${classes.detail}`}
          value={set[setKeys.reps]}
          name="reps"
          type="number"
          onChange={onChangeHandler}
          InputProps={{ endAdornment: <InputAdornment position="end">reps</InputAdornment> }}
        />
        <CustomTextField1
          className={`${classes.rest} ${classes.detail}`}
          value={set[setKeys.rest]}
          name="rest"
          type="number"
          onChange={onChangeHandler}
          InputProps={{ endAdornment: <InputAdornment position="end">s</InputAdornment> }}
        />
        {collapsed && (
          <IconButton
            disableRipple
            size="small"
            className={`${classes.button} ${classes.addRemoveButton}`}
            onClick={() => {
              props.onAddRemoveClick(props.set.id);
            }}
          >
            {props.onSetContentUpdate ? <Remove /> : <Add />}
          </IconButton>
        )}
      </div>
    </div>
  );
});

class ExerciseModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      sets: clone(this.props.exercise[exerciseKeys.sets]),
      note: this.props.exercise[exerciseKeys.note],
      newSet: new Cycle(0, 0, 0),
      collapsed: false // collapsed = false means it is collapsed
    };
    this.handleSetChange = this.handleSetChange.bind(this);
    this.handleNewSetChange = this.handleNewSetChange.bind(this);
    this.restoreAndClose = this.restoreAndClose.bind(this);
    this.updateAndClose = this.updateAndClose.bind(this);
    this.handleCollapseButton = this.handleCollapseButton.bind(this);
    this.handleNoteChange = this.handleNoteChange.bind(this);
    this.handleAddRemove = this.handleAddRemove.bind(this);
  }

  handleSetChange(id, name, value) {
    this.setState(({ sets }) => {
      sets.forEach(s => {
        if (s.id === id) {
          s[name] = parseFloat(value);
        }
      });
      return { sets };
    });
  }

  handleNewSetChange(id, name, value) {
    this.setState(({ newSet }) => {
      newSet[name] = parseFloat(value);
      return { newSet };
    });
  }

  restoreAndClose() {
    this.setState({ sets: clone(this.props.exercise[exerciseKeys.sets]), collapsed: false, error: "" });
    this.props.handleClose();
  }

  updateAndClose() {
    const { handleClose, handleExerciseUpdate, exercise } = this.props;
    const { sets, note } = this.state;
    this.setState({ collapsed: false, error: "" });
    handleExerciseUpdate(exercise.id, sets, note);
    handleClose();
  }

  handleCollapseButton() {
    this.setState(({ collapsed }) => ({ collapsed: !collapsed, error: "" }));
  }

  handleNoteChange(e) {
    this.setState({ note: e.target.value, error: "" });
  }

  handleAddRemove(id) {
    this.setState(({ sets, newSet }) => {
      let error = "";
      const toNotRemove = sets.filter(s => s.id !== id);
      if (toNotRemove.length === sets.length) {
        if (newSet[setKeys.intensity] === 0) {
          error = "intensity can't be 0";
        } else if (newSet[setKeys.reps] === 0) {
          error = "reps can't be 0";
        } else if (newSet[setKeys.rest] === 0) {
          error = "rest can't be 0";
        } else {
          sets.push(newSet);
          return { sets, newSet: new Cycle(0, 0, 0) };
        }
      } else if (sets.length > 1) {
        return { sets: toNotRemove };
      } else if (sets.length === 1) {
        error = "atleast one set is required";
      }
      return { error };
    });
  }

  render() {
    const { open, classes, exercise } = this.props;
    const { collapsed, note, newSet, error, sets } = this.state;
    const { length } = sets;
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
              <Typography component="h2" className={`${classes.title}`}>
                {exercise[exerciseKeys.name]}
              </Typography>
              <Typography component="h3" className={`${classes.setsCount}`}>
                {exercise[exerciseKeys.sets].length} sets
              </Typography>
            </div>
            <Collapse in={error !== ""}>
              <Typography component="p" className={`${classes.error}`} color="error">
                {error}
              </Typography>
            </Collapse>

            <div className={`${classes.setsContainer}`}>
              {sets.map((set, i) => (
                <Set
                  key={i}
                  set={set}
                  index={i + 1}
                  units={exercise[exerciseKeys.units]}
                  onSetContentUpdate={this.handleSetChange}
                  collapsed={collapsed}
                  onAddRemoveClick={this.handleAddRemove}
                />
              ))}
            </div>

            <Collapse in={collapsed}>
              <div>
                <Set
                  set={newSet}
                  index={length + 1}
                  units={exercise[exerciseKeys.units]}
                  onNewSetContentUpdate={this.handleNewSetChange}
                  onAddRemoveClick={this.handleAddRemove}
                  collapsed={collapsed}
                />
              </div>
            </Collapse>
            <Collapse in={collapsed || note !== ""}>
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

            <div className={`${classes.buttonContainer}`}>
              <Button className={`${classes.button}`} onClick={this.updateAndClose}>
                update
              </Button>
              <IconButton disableRipple size="small" className={`${classes.button}`} onClick={this.handleCollapseButton}>
                {collapsed ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
              <Button className={`${classes.button}`} onClick={this.restoreAndClose}>
                close
              </Button>
            </div>
          </div>
        </ClickAwayListener>
      </CustomDialog>
    );
  }
}

export default withStyles(styles)(ExerciseModal);
