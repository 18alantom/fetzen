import React from "react";
import { setKeys } from "../../../../helpers/constants";
import { withStyles } from "@material-ui/styles";
import styles from "./workout-modal-styles";
import { Typography, Collapse } from "@material-ui/core";
import { CustomTextField4, CustomTextField2 } from "../../CustomTextField";
import { LeftButton, RightButton } from "../../CustomButton";
import { Cycle, Exercise } from "../../../../helpers/classes";
import { intensityUnits } from "../../../../helpers/constants";
import { Set } from "../../Exercises/ExerciseModal";

export const AddExercise = withStyles(styles)(
  class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        name: "",
        note: "",
        sets: [],
        newSet: new Cycle(0, 0, 0),
        error: "",
        units: intensityUnits.kg
      };
      this.handleSetChange = this.handleSetChange.bind(this);
      this.handleNewSetChange = this.handleNewSetChange.bind(this);
      this.handleNoteChange = this.handleNoteChange.bind(this);
      this.handleNameChange = this.handleNameChange.bind(this);
      this.handleAddRemove = this.handleAddRemove.bind(this);
      this.handleAdd = this.handleAdd.bind(this);
      this.handleCancel = this.handleCancel.bind(this);
      this.stateReset = this.stateReset.bind(this);
      // Refs
      this.exerciseNameRef = React.createRef();
    }

    handleSetChange(id, name, value) {
      this.setState(({ sets }) => {
        sets.forEach(s => {
          if (s.id === id) {
            s[name] = value;
          }
        });
        return { sets, change: true };
      });
    }

    handleNewSetChange(id, name, value) {
      this.setState(({ newSet }) => {
        newSet[name] = value;
        return { newSet };
      });
    }

    handleNoteChange(e) {
      this.setState({ note: e.target.value, error: "" });
    }

    handleNameChange(e) {
      this.setState({ name: e.target.value, error: "" });
    }

    handleAddRemove(id) {
      this.setState(({ sets, newSet }) => {
        let error = "";
        const toNotRemove = sets.filter(s => s.id !== id);
        if (toNotRemove.length === sets.length) {
          if (newSet[setKeys.reps] === 0) {
            error = "reps can't be 0";
          } else if (newSet[setKeys.rest] === 0) {
            error = "rest can't be 0";
          } else {
            sets.push(newSet);
            return { sets, newSet: new Cycle(0, 0, 0), error: "" };
          }
        } else if (sets.length >= 1) {
          return { sets: toNotRemove, error: "F" };
        }
        return { error };
      });
    }

    stateReset() {
      const e = "";
      this.setState({ name: e, note: e, sets: [], newSet: new Cycle(0, 0, 0), error: "" });
    }

    handleAdd() {
      const { name, sets, note, units } = this.state;
      let error = "";
      if (name === "") {
        error = "name can't be blank";
      } else if (sets.length === 0) {
        error = "atleast one set is required";
      } else {
        const exercise = new Exercise(name, sets, units, note);
        this.props.handleAddExercise(exercise);
        this.stateReset();
        return;
      }
      this.setState({ error });
    }

    handleCancel() {
      this.stateReset();
      this.props.handleCancelAddExercise();
    }

    render() {
      const { open, classes } = this.props;
      const { error, name, sets, note, newSet, units } = this.state;
      const { length } = sets;
      if (open && name.trim() === "") {
        // Focus on the exercise title input.
        setTimeout(() => this.exerciseNameRef.current.getElementsByTagName("input")[0].focus(), 300);
      }
      return (
        <Collapse in={open}>
          <Typography component="h2" className={`${classes.subTitle}`}>
            Add Exercise
          </Typography>
          <Collapse in={error !== ""}>
            <Typography component="p" className={`${classes.error}`} color="error">
              {error}
            </Typography>
          </Collapse>
          <hr className={classes.divisor} />
          <div className={`${classes.header}`}>
            <CustomTextField4
              className={`${classes.exerciseAddTitle}`}
              value={name}
              onChange={this.handleNameChange}
              placeholder="Exercise name"
              ref={this.exerciseNameRef}
            />
            <Typography component="h3" className={`${classes.setsCount}`}>
              {length} sets
            </Typography>
          </div>

          <div className={`${classes.setsContainer}`}>
            {sets.map((set, i) => (
              <Set
                key={i}
                set={set}
                index={i + 1}
                units={units}
                onSetContentUpdate={this.handleSetChange}
                onAddRemoveClick={this.handleAddRemove}
                collapsed={true}
              />
            ))}
          </div>

          <div>
            <Set
              set={newSet}
              index={length + 1}
              units={units}
              onNewSetContentUpdate={this.handleNewSetChange}
              onAddRemoveClick={this.handleAddRemove}
              collapsed={true}
            />
          </div>

          <CustomTextField2
            placeholder="Add a note"
            value={note}
            rowsMax="4"
            multiline
            onChange={this.handleNoteChange}
            fullWidth
            className={`${classes.note}`}
          />
          <hr className={classes.divisor} />

          <div className={`${classes.buttonContainer}`}>
            <LeftButton className={`${classes.button}`} onClick={this.handleCancel} disableRipple>
              cancel
            </LeftButton>
            <RightButton className={`${classes.button}`} onClick={this.handleAdd} disableRipple>
              add
            </RightButton>
          </div>
        </Collapse>
      );
    }
  }
);
