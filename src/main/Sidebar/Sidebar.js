import React from "react";
import { withStyles } from "@material-ui/styles";
import { Drawer, Divider } from "@material-ui/core";
import WorkoutsList from "./Lists/WorkoutsList";
import GoalsList from "./Lists/GoalsList";
import GoalsCompletedList from "./Lists/GoalsCompletedList";
import styles from "./sidebar-styles";

class Sidebar extends React.Component {
  render() {
    const { classes, workouts, goals, handleWorkoutModalOpen, handleGoalUpdate, handleGoalAdd } = this.props;
    const completedGoals = goals.filter(e => e.complete);
    const notCompletedGoals = goals.filter(e => !e.complete);
    return (
      <Drawer classes={{ paper: classes.paper }} variant="permanent">
        <div className={classes.allListContainer}>
          <WorkoutsList workouts={workouts} handleWorkoutModalOpen={handleWorkoutModalOpen} />
          <Divider />
          <GoalsList goals={notCompletedGoals} handleGoalUpdate={handleGoalUpdate} handleGoalAdd={handleGoalAdd} />
          <Divider />
          {completedGoals.length === 0 ? undefined : true && <GoalsCompletedList goals={completedGoals} handleGoalUpdate={handleGoalUpdate} />}
          {completedGoals.length === 0 ? undefined : true && <Divider />}
        </div>
      </Drawer>
    );
  }
}
export default withStyles(styles)(Sidebar);
