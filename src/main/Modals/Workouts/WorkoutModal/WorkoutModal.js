import React from "react";
import { workoutKeys } from "../../../../helpers/constants";
import { withStyles } from "@material-ui/styles";
import styles from "./workout-modal-styles";
import { Dialog } from "@material-ui/core";

class WorkoutModal extends React.Component {
  render() {
    const { open, workout, handleClose } = this.props;
    return (
      <Dialog open={open}>
        <h1>{workout[workoutKeys.name]}</h1>
        <p>{JSON.stringify(workout[workoutKeys.exercises])}</p>
        <button onClick={handleClose}>close</button>
      </Dialog>
    );
  }
}

export default withStyles(styles)(WorkoutModal);
