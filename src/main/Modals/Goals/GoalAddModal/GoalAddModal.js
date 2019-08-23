import React from "react";
import { withStyles } from "@material-ui/styles";
import styles from "./goal-add-modal-styles";
import { Dialog } from "@material-ui/core";
// import { goalKeys } from "../../../../helpers/constants";

class GoalAddModal extends React.Component {
  render() {
    const { handleClose, open } = this.props;
    return (
      <Dialog open={open}>
        <h1>This a goal add modal</h1>
        <button onClick={handleClose}>close</button>
      </Dialog>
    );
  }
}

export default withStyles(styles)(GoalAddModal);
