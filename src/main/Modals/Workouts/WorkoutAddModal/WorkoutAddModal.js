import React from "react";
import { withStyles } from "@material-ui/styles";
import styles from "./workout-add-modal-styles";
// import { goalKeys } from "../../../../helpers/constants";

class WorkoutAddModal extends React.Component {
  render() {
    const { handleClose } = this.props;
    return (
      <div>
        <h1>This a workout add modal</h1>
        <button onClick={handleClose}>close</button>
      </div>
    );
  }
}

export default withStyles(styles)(WorkoutAddModal);
