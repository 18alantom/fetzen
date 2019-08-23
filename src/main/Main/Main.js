import React from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import WorkoutCard from "../WorkoutCard/WorkoutCard";
import { withStyles } from "@material-ui/styles";
import styles from "./main-styles";
import WorkoutModal from "../Modals/Workouts/WorkoutModal/WorkoutModal";
import userData from "../dummy-data";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workoutModalOpen: false,
      openModal: 0,
      data: userData
    };
    this.handleWorkoutModalOpen = this.handleWorkoutModalOpen.bind(this);
    this.handleWorkoutModalClose = this.handleWorkoutModalClose.bind(this);
    this.handleGoalUpdate = this.handleGoalUpdate.bind(this);
  }

  handleWorkoutModalOpen(i) {
    this.setState(({ workoutModalOpen }) => ({ workoutModalOpen: !workoutModalOpen, openModal: i }));
  }

  handleWorkoutModalClose() {
    this.setState(({ workoutModalOpen }) => ({ workoutModalOpen: !workoutModalOpen }));
  }

  handleGoalUpdate(id, done) {
    console.log(id);
    this.setState(({ data }) => {
      let goal = data.goals.filter(g => g.id === id)[0];
      console.log(goal);
      if (done) {
        goal.complete = true;
        goal.dateCompleted = new Date();
      } else if (!done) {
        goal.complete = false;
        goal.dateCompleted = undefined;
      } else {
        return;
      }
      return { data };
    });
  }

  render() {
    const { classes } = this.props;
    const { goals, workouts } = this.state.data;
    const { workoutModalOpen, openModal } = this.state;
    return (
      <div className={classes.mainContainer}>
        <Navbar />
        <Sidebar workouts={workouts} goals={goals} handleWorkoutModalOpen={this.handleWorkoutModalOpen} handleGoalUpdate={this.handleGoalUpdate} />
        <div className={classes.cardsContainer}>
          {workouts.map((w, i) => (
            <WorkoutCard
              workout={w}
              key={i}
              handleWorkoutModalOpen={() => {
                this.handleWorkoutModalOpen(i);
              }}
            />
          ))}
        </div>
        <WorkoutModal open={workoutModalOpen} workout={workouts[openModal]} handleClose={this.handleWorkoutModalClose} />
      </div>
    );
  }
}

export default withStyles(styles)(Main);
