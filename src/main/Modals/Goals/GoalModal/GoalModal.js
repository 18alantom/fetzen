import React from "react";
import { goalKeys } from "../../../../helpers/constants";
import { withStyles } from "@material-ui/styles";
import { Typography, ClickAwayListener } from "@material-ui/core";
import { LeftButton, RightButton } from "../../CustomButton";
import CustomDialog from "../../CustomDialog";
import styles from "./goal-modal-styles";

class GoalModal extends React.Component {
  render() {
    const { goal, handleNotDone, handleDone, handleClose, open } = this.props;
    const { classes } = this.props;
    return (
      <CustomDialog
        open={open}
        className={`${classes.paper}`}
        onKeyPress={e => {
          if (e.key === "Enter") {
            handleNotDone();
          }
        }}
      >
        <ClickAwayListener onClickAway={handleClose}>
          <div className={`${classes.container}`}>
            <Typography component="h2" className={`${classes.title}`}>
              {goal[goalKeys.title]}
            </Typography>
            <Typography className={`${classes.detail}`}>{goal[goalKeys.detail]}</Typography>
            {goal[goalKeys.complete] ? (
              <Typography className={`${classes.deadline}`}>{goal[goalKeys.dateCompleted].toDateString()}</Typography>
            ) : (
              <Typography className={`${classes.deadline}`}>{goal[goalKeys.deadline].toDateString()}</Typography>
            )}
            <div className={`${classes.buttonContainer}`}>
              <LeftButton className={`${classes.button}`} onClick={handleNotDone}>
                not done
              </LeftButton>
              <RightButton className={`${classes.button}`} onClick={handleDone}>
                done
              </RightButton>
            </div>
          </div>
        </ClickAwayListener>
      </CustomDialog>
    );
  }
}

export default withStyles(styles)(GoalModal);
