import React from "react";
import { withStyles } from "@material-ui/styles";
import { Drawer, Divider } from "@material-ui/core";
import WorkoutsList from "./Lists/WorkoutsList";
import GoalsList from "./Lists/GoalsList";
import styles from "./sidebar-styles";

class Sidebar extends React.Component {
  render() {
    const { classes, workouts, goals, handleWorkoutModalOpen } = this.props;
    return (
      <Drawer classes={{ paper: classes.paper }} variant="permanent">
        <div className={classes.allListContainer}>
          <WorkoutsList workouts={workouts} handleWorkoutModalOpen={handleWorkoutModalOpen} />
          <Divider />
          <GoalsList goals={goals} />
        </div>
      </Drawer>
    );
  }
}
export default withStyles(styles)(Sidebar);
