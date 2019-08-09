import React from "react";
import { goalKeys } from "../../../../helpers/constants";
import { withStyles } from "@material-ui/styles";
import styles from "./goal-modal-styles";

class GoalModal extends React.Component {
  render() {
    const { goal, handleClose } = this.props;
    return (
      <div>
        <h1>{goal[goalKeys.title]}</h1>
        <p>{goal[goalKeys.detail]}</p>
        <p>{goal[goalKeys.deadline]}</p>
        <button onClick={handleClose}>close</button>
      </div>
    );
  }
}

export default withStyles(styles)(GoalModal);
