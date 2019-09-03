import uuid from "uuid/v1";
import React from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import WorkoutCard from "../WorkoutCard/WorkoutCard";
import { Snackbar, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import styles from "./main-styles";
import WorkoutModal from "../Modals/Workouts/WorkoutModal/WorkoutModal";
import { lighten } from "@material-ui/core/styles/colorManipulator";
import { userKeys, workoutKeys, exerciseKeys } from "../../helpers/constants";
import userData from "../dummy-data";

export const CustomSnackbar = withStyles(theme => ({
  root: {
    "& .MuiSnackbarContent-root": {
      minWidth: "0px",
      backgroundColor: lighten(theme.palette.secondary.main, 0.03),
      borderRadius: "0px"
    }
  }
}))(Snackbar);

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workoutModalOpen: false,
      openModal: 0,
      data: userData,
      showDoneMessage: false,
      doneMessage: "",
      doneMessageDuration: 3000
    };
    this.handleWorkoutModalOpen = this.handleWorkoutModalOpen.bind(this);
    this.handleWorkoutModalClose = this.handleWorkoutModalClose.bind(this);
    this.handleDeleteWorkoutConfirm = this.handleDeleteWorkoutConfirm.bind(this);
    this.handleWorkoutUpdate = this.handleWorkoutUpdate.bind(this);
    this.handleExerciseUpdate = this.handleExerciseUpdate.bind(this);
    this.handleGoalUpdate = this.handleGoalUpdate.bind(this);
    this.handleGoalAdd = this.handleGoalAdd.bind(this);
    this.handleDoneClick = this.handleDoneClick.bind(this);
    this.toggleSnackBar = this.toggleSnackBar.bind(this);
  }

  handleWorkoutModalOpen(i) {
    this.setState(({ workoutModalOpen }) => ({ workoutModalOpen: !workoutModalOpen, openModal: i }));
  }

  handleWorkoutModalClose() {
    this.setState(({ workoutModalOpen }) => ({ workoutModalOpen: !workoutModalOpen }));
  }

  handleGoalUpdate(id, done) {
    this.setState(({ data }) => {
      let goal = data.goals.filter(g => g.id === id)[0];
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

  handleDeleteWorkoutConfirm(id) {
    this.setState(({ data }) => {
      const { workouts } = data;
      data.workouts = workouts.filter(w => w.id !== id);
      return { data, openModal: 0 };
    });
  }

  handleWorkoutUpdate(wid, name, note, exercises, days) {
    this.setState(({ data }) => {
      data.workouts.forEach(w => {
        if (w.id === wid) {
          w[workoutKeys.name] = name;
          w[workoutKeys.note] = note;
          w[workoutKeys.exercises] = exercises;
          w[workoutKeys.days] = days;
        }
      });
      return { data };
    });
  }

  handleDoneClick(wid) {
    this.setState(({ data }) => {
      let name, last;
      data.workouts.forEach(w => {
        if (w.id === wid) {
          w[workoutKeys.last] = new Date();
          name = w[workoutKeys.name];
          last = w[workoutKeys.last];
        }
      });
      return { data, doneMessage: `Completed ${name} on ${last.toDateString()}.`.trim(), showDoneMessage: true };
    });
  }

  toggleSnackBar() {
    this.setState(({ showDoneMessage }) => ({ showDoneMessage: !showDoneMessage }));
  }

  handleGoalAdd(goal) {
    this.setState(({ data }) => {
      data.goals.push(goal);
      return { data };
    });
  }

  handleExerciseUpdate(wid, eid, sets, note, name) {
    this.setState(({ data }) => {
      // Objects are passed by reference
      // that is why this works.
      const workout = data[userKeys.workouts].filter(w => w.id === wid)[0];
      const exercise = workout[workoutKeys.exercises].filter(e => e.id === eid)[0];
      exercise[exerciseKeys.sets] = sets;
      exercise[exerciseKeys.note] = note;
      exercise[exerciseKeys.name] = name;
      return data;
    });
  }

  render() {
    const { classes } = this.props;
    const { workoutModalOpen, openModal, showDoneMessage, doneMessage, doneMessageDuration } = this.state;
    const { goals, workouts } = this.state.data;
    return (
      <div className={classes.mainContainer}>
        <Navbar />
        <Sidebar
          workouts={workouts}
          goals={goals}
          handleWorkoutModalOpen={this.handleWorkoutModalOpen}
          handleGoalUpdate={this.handleGoalUpdate}
          handleGoalAdd={this.handleGoalAdd}
        />
        <div className={classes.cardsContainer}>
          {workouts.map((w, i) => (
            <WorkoutCard
              workout={w}
              key={i}
              handleExerciseUpdate={this.handleExerciseUpdate}
              handleDoneClick={this.handleDoneClick}
              handleWorkoutModalOpen={() => {
                this.handleWorkoutModalOpen(i);
              }}
            />
          ))}
        </div>
        {workouts.length !== 0 && (
          <CustomSnackbar
            key={uuid()}
            open={showDoneMessage}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            autoHideDuration={doneMessageDuration}
            onClose={this.toggleSnackBar}
            message={<Typography className={classes.snackText}>{doneMessage}</Typography>}
          />
        )}
        {workouts.length !== 0 && (
          <WorkoutModal
            key={workouts[openModal].id}
            wid={workouts[openModal].id}
            open={workoutModalOpen} // boolean to open the modal
            workout={workouts[openModal]} // the workout object that will be displayed
            handleWorkoutUpdate={this.handleWorkoutUpdate}
            handleDeleteWorkoutConfirm={this.handleDeleteWorkoutConfirm}
            handleClose={this.handleWorkoutModalClose}
          />
        )}
      </div>
    );
  }
}

export default withStyles(styles)(Main);
