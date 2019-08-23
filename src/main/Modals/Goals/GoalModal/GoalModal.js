import React from "react";
import { goalKeys } from "../../../../helpers/constants";
import { withStyles } from "@material-ui/styles";
import { Typography, Button, Dialog } from "@material-ui/core";
import styles from "./goal-modal-styles";

const CustomDialog = withStyles(theme => ({
  root: {
    "& .MuiPaper-rounded": {
      borderRadius: "0px",
      backgroundColor: theme.palette.secondary.main
    }
  }
}))(Dialog);

class GoalModal extends React.Component {
  render() {
    const { goal, handleNotDone, handleDone, open } = this.props;
    console.log("from goalmodal");
    console.log(goal);
    const { classes } = this.props;
    return (
      <CustomDialog open={open} className={`${classes.paper}`}>
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
            <Button className={`${classes.button}`} onClick={handleNotDone}>
              not done
            </Button>
            <Button className={`${classes.button}`} onClick={handleDone}>
              done
            </Button>
          </div>
        </div>
      </CustomDialog>
    );
  }
}

export default withStyles(styles)(GoalModal);
