import React from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import WorkoutCard from "../WorkoutCard/WorkoutCard";
import { withStyles } from "@material-ui/styles";
import styles from "./main-styles";
import { Dialog } from "@material-ui/core";
import WorkoutModal from "../Modals/Workouts/WorkoutModal/WorkoutModal";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workoutModalOpen: false,
      openModal: 0
    };
    this.handleWorkoutModalOpen = this.handleWorkoutModalOpen.bind(this);
    this.handleWorkoutModalClose = this.handleWorkoutModalClose.bind(this);
  }

  handleWorkoutModalOpen(i) {
    this.setState(({ workoutModalOpen }) => ({ workoutModalOpen: !workoutModalOpen, openModal: i }));
  }

  handleWorkoutModalClose() {
    this.setState(({ workoutModalOpen }) => ({ workoutModalOpen: !workoutModalOpen }));
  }

  render() {
    const {
      classes,
      data: { goals, workouts }
    } = this.props;
    const { workoutModalOpen, openModal } = this.state;
    return (
      <div className={classes.mainContainer}>
        <Navbar />
        <Sidebar workouts={workouts} goals={goals} handleWorkoutModalOpen={this.handleWorkoutModalOpen} />
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
        <Dialog open={workoutModalOpen}>
          <WorkoutModal workout={workouts[openModal]} handleClose={this.handleWorkoutModalClose} />
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(Main);
