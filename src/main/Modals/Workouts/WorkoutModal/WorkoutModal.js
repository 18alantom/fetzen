import React from "react";
import { workoutKeys } from "../../../../helpers/constants";
import { withStyles } from "@material-ui/styles";
import styles from "./workout-modal-styles";

class WorkoutModal extends React.Component {
  render() {
    const { workout, handleClose } = this.props;
    return (
      <div>
        <h1>{workout[workoutKeys.name]}</h1>
        <p>{JSON.stringify(workout[workoutKeys.exercises])}</p>
        <button onClick={handleClose}>close</button>
      </div>
    );
  }
}

export default withStyles(styles)(WorkoutModal);
