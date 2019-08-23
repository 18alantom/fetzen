import React from "react";
import { exerciseKeys } from "../../../helpers/constants";
import { withStyles } from "@material-ui/styles";
import styles from "./exercise-modal-styles";
import { Dialog } from "@material-ui/core";

class ExerciseModal extends React.Component {
  render() {
    const { open, exercise, handleClose } = this.props;
    return (
      <Dialog open={open}>
        <h1>{exercise[exerciseKeys.name]}</h1>
        <p>{JSON.stringify(exercise[exerciseKeys.sets])}</p>
        <button onClick={handleClose}>close</button>
      </Dialog>
    );
  }
}

export default withStyles(styles)(ExerciseModal);
