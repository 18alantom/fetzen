import React from "react";
import { exerciseKeys } from "../../../helpers/constants";
import { withStyles } from "@material-ui/styles";
import styles from "./exercise-modal-styles";

class ExerciseModal extends React.Component {
  render() {
    const { exercise, handleClose } = this.props;
    return (
      <div>
        <h1>{exercise[exerciseKeys.name]}</h1>
        <p>{JSON.stringify(exercise[exerciseKeys.sets])}</p>
        <button onClick={handleClose}>close</button>
      </div>
    );
  }
}

export default withStyles(styles)(ExerciseModal);
