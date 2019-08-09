import React from "react";
import { withStyles } from "@material-ui/styles";
import styles from "./goal-add-modal-styles";
// import { goalKeys } from "../../../../helpers/constants";

class GoalAddModal extends React.Component {
  render() {
    const { handleClose } = this.props;
    return (
      <div>
        <h1>This a goal add modal</h1>
        <button onClick={handleClose}>close</button>
      </div>
    );
  }
}

export default withStyles(styles)(GoalAddModal);
