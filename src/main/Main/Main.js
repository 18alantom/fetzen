import uuid from "uuid/v1";
import clone from "clone";
import React from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import ProfileModal from "../Modals/Profile/ProfileModal";
import WeightLogModal from "../Modals/WeightAdd/WeightLogModal";
import WorkoutCard from "../WorkoutCard/WorkoutCard";
import { Snackbar, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import styles from "./main-styles";
import WorkoutModal from "../Modals/Workouts/WorkoutModal/WorkoutModal";
import WorkoutAddModal from "../Modals/Workouts/WorkoutAddModal/WorkoutAddModal";
import { lighten } from "@material-ui/core/styles/colorManipulator";
import { userKeys, workoutKeys, exerciseKeys, goalKeys } from "../../helpers/constants";
import { getUser } from "../../helpers/object-getters";
import { User } from "../../helpers/classes";
import { getEndPoint as gEP, endpoints as ep } from "../../helpers/endpoints";
import {
  getGoalAddJson,
  getGoalDeleteJson,
  getGoalUpdateJson,
  getExerciseJson,
  getWorkoutAddJson,
  getWorkoutUpdateJson,
  getWorkoutDelete,
  getWorkoutDone,
  getLogWeight
} from "../../helpers/json-getters";

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
      workoutAddModalOpen: false,
      profileModalOpen: false,
      logWeightModalOpen: false,
      openModal: 0,
      data: new User(),
      timerId: 0,
      alive: true,
      showDoneMessage: false,
      doneMessage: "",
      doneMessageDuration: 3000,
      wUnit: "kg",
      hUnit: "cm",
      status: {}
    };
    this.handleWorkoutModalOpen = this.handleWorkoutModalOpen.bind(this);
    this.handleLogWeightModalUpdate = this.handleLogWeightModalUpdate.bind(this);
    this.handleWorkoutAddModalToggle = this.handleWorkoutAddModalToggle.bind(this);
    this.handleWorkoutModalClose = this.handleWorkoutModalClose.bind(this);
    this.handleDeleteWorkoutConfirm = this.handleDeleteWorkoutConfirm.bind(this);
    this.handleWorkoutAdd = this.handleWorkoutAdd.bind(this);
    this.handleWorkoutUpdate = this.handleWorkoutUpdate.bind(this);
    this.handleExerciseUpdate = this.handleExerciseUpdate.bind(this);
    this.handleProfileClick = this.handleProfileClick.bind(this);
    this.handleGoalUpdate = this.handleGoalUpdate.bind(this);
    this.handleGoalAdd = this.handleGoalAdd.bind(this);
    this.handleGoalDelete = this.handleGoalDelete.bind(this);
    this.handleDoneClick = this.handleDoneClick.bind(this);
    this.toggleSnackBar = this.toggleSnackBar.bind(this);
    this.toggleProfileModal = this.toggleProfileModal.bind(this);
    this.toggleLogWeightModal = this.toggleLogWeightModal.bind(this);
    this.sendData = this.sendData.bind(this);
    this.dataUpdated = this.dataUpdated.bind(this);
  }

  componentDidMount() {
    const { userData, dataLoadedHandler, URL } = this.props;
    this.setState({
      data: getUser(clone(userData)),
      timerId: setInterval(() => {
        fetch(gEP(URL, ep.ping))
          .catch(_err => {
            this.setState(({ alive }) => {
              if (alive) {
                return { alive: !alive, doneMessage: "Network Error: changes may not be saved", showDoneMessage: true };
              }
            });
            return false;
          })
          .then(res => {
            if (res) {
              this.setState(({ alive }) => {
                if (!alive) {
                  return { alive: true, doneMessage: "network issue resolved", showDoneMessage: true };
                }
              });
            }
          });
      }, 10000)
    });
    dataLoadedHandler();
  }

  componentWillUnmount() {
    this.setState(({ timerId }) => {
      clearInterval(timerId);
      return { data: {} };
    });
  }

  dataUpdated() {
    this.props.saveToLocalStorage("userData", this.state.data);
  }

  sendData(endpoint, doneMessage, body = {}, method = "POST", handleData) {
    const { alive } = this.state;
    const { URL } = this.props;
    const headers = new Headers({ "Content-Type": "application/json" });
    const init = {
      method,
      body,
      headers
    };
    const req = new Request(gEP(URL, endpoint), init);
    if (alive) {
      fetch(req)
        .catch(err => {
          this.setState(({ status }) => {
            status.ok = false;
            status.code = 503;
            status.message = err.message;
            return { status };
          });
          return false;
        })
        .then(res => {
          if (res) {
            this.setState(({ status }) => {
              status.ok = res.ok;
              status.code = res.status;
              return { status };
            });
            return res.json();
          } else {
            return "Network Error";
          }
        })
        .then(data => {
          const { ok } = this.state.status;
          if (ok) {
            if (handleData) {
              handleData(data);
            } else {
              this.setState({ doneMessage });
              this.toggleSnackBar();
            }
          } else {
            throw new Error(`${data}`);
          }
        })
        .catch(err => {
          this.setState({ doneMessage: err.message });
          this.toggleSnackBar();
        });
    } else {
      this.setState({ doneMessage: "Network Error: changes not saved" });
    }
  }

  toggleSnackBar() {
    this.setState(({ showDoneMessage }) => ({ showDoneMessage: !showDoneMessage }));
  }

  handleWorkoutModalOpen(i) {
    this.setState(({ workoutModalOpen }) => ({ workoutModalOpen: !workoutModalOpen, openModal: i }));
  }

  handleWorkoutModalClose() {
    this.setState(({ workoutModalOpen }) => ({ workoutModalOpen: !workoutModalOpen }));
  }

  handleWorkoutAddModalToggle() {
    this.setState(({ workoutAddModalOpen }) => ({ workoutAddModalOpen: !workoutAddModalOpen }));
  }

  handleGoalAdd(goal) {
    const doneMessage = `Set goal '${goal[goalKeys.title]}'`;
    this.setState(
      ({ data }) => {
        data.goals.push(goal);
        return { data };
      },
      () => {
        this.dataUpdated();
      }
    );
    this.sendData(ep.goals.add, doneMessage, getGoalAddJson({ ...goal, uid: this.state.data.id }), "POST");
  }

  handleGoalDelete(id) {
    let { goals } = this.state.data;
    let goalToRemove = goals.filter(g => g.id === id)[0];
    goals = goals.filter(g => g.id !== id);
    const doneMessage = `Removed goal '${goalToRemove[goalKeys.title]}'`;

    this.setState(
      ({ data }) => {
        data[userKeys.goals] = goals;
        return { data };
      },
      () => {
        this.dataUpdated();
      }
    );

    this.sendData(ep.goals.delete, doneMessage, getGoalDeleteJson(id), "DELETE");
  }

  handleGoalUpdate(id, done) {
    let { goals } = this.state.data;
    let doneMessage = "";
    let goal = goals.filter(g => g.id === id)[0];
    if (done) {
      goal[goalKeys.complete] = true;
      goal[goalKeys.dateCompleted] = new Date();
      doneMessage = `Accomplished goal '${goal[goalKeys.title]}'`;
    } else if (!done) {
      goal[goalKeys.complete] = false;
      goal[goalKeys.dateCompleted] = undefined;
      doneMessage = `Reset goal '${goal[goalKeys.title]}'`;
    }
    this.setState(
      ({ data }) => {
        return { data };
      },
      () => {
        this.dataUpdated();
      }
    );
    this.sendData(ep.goals.update, doneMessage, getGoalUpdateJson(goal), "PUT");
  }

  handleWorkoutAdd(workout) {
    const doneMessage = `Added workout '${workout[workoutKeys.name]}'`;
    const seq = this.state.data[userKeys.workouts].length;
    workout.seq = seq;

    this.setState(
      ({ data }) => {
        data[userKeys.workouts].push(workout);
        return { data };
      },
      () => {
        this.dataUpdated();
      }
    );
    this.sendData(ep.workouts.add, doneMessage, getWorkoutAddJson({ ...workout, uid: this.state.data.id }), "POST");
  }

  handleDeleteWorkoutConfirm(id, name) {
    const doneMessage = `Deleted workout '${name}'`;
    this.setState(
      ({ data }) => {
        const { workouts } = data;
        data.workouts = workouts.filter(w => w.id !== id);
        data.workouts.forEach((w, i) => (w.seq = i));
        return { data, openModal: 0 };
      },
      () => {
        this.dataUpdated();
      }
    );
    this.sendData(ep.workouts.delete, doneMessage, getWorkoutDelete(id), "DELETE");
  }

  handleWorkoutUpdate(wid, name, note, exercises, days, exercisesRemoved, seq, id) {
    const doneMessage = `Updated workout '${name}.'`;
    const workout = this.state.data.workouts.filter(w => w.id === wid)[0];
    workout[workoutKeys.name] = name;
    workout[workoutKeys.note] = note;
    workout[workoutKeys.exercises] = exercises;
    workout[workoutKeys.days] = days;
    this.setState(
      ({ data }) => {
        // This may be bad design.
        return { data };
      },
      () => {
        this.dataUpdated();
      }
    );
    this.sendData(ep.workouts.update, doneMessage, getWorkoutUpdateJson({ ...workout, wED: exercisesRemoved }), "PUT");
  }

  handleExerciseUpdate(wid, eid, sets, note, name, seq, units) {
    const doneMessage = `Updated exercise '${name}'.`;
    this.setState(
      ({ data }) => {
        // Objects are passed by reference
        // that is why this works.
        const workout = data[userKeys.workouts].filter(w => w.id === wid)[0];
        const exercise = workout[workoutKeys.exercises].filter(e => e.id === eid)[0];
        exercise[exerciseKeys.sets] = sets;
        exercise[exerciseKeys.note] = note;
        exercise[exerciseKeys.name] = name;
        return { data };
      },
      () => {
        this.dataUpdated();
      }
    );
    const body = getExerciseJson({ wid, eid, sets, note, name, seq, units });
    this.sendData(ep.exercises.update, doneMessage, body, "PUT");
  }

  handleDoneClick(wid) {
    const workout = this.state.data[userKeys.workouts].filter(w => w.id === wid)[0];
    const last = new Date();
    const doneMessage = `Completed ${workout.name} on ${last.toDateString()}.`;
    this.setState(
      ({ data }) => {
        data.workouts.forEach(w => {
          if (w.id === wid) {
            w[workoutKeys.last] = last;
          }
        });
        return { data };
      },
      () => {
        this.dataUpdated();
      }
    );
    this.sendData(ep.workouts.done, doneMessage, getWorkoutDone({ ...workout, last }), "PUT");
  }

  toggleProfileModal() {
    this.setState(({ profileModalOpen }) => ({ profileModalOpen: !profileModalOpen }));
  }

  toggleLogWeightModal() {
    this.setState(({ logWeightModalOpen }) => ({ logWeightModalOpen: !logWeightModalOpen }));
  }

  handleLogWeightModalUpdate(val) {
    let value = parseFloat(val);
    const doneMessage = `Logged weight: ${value} ${this.state.wUnit}.`;
    const { id } = this.state.data;
    this.setState(
      ({ data }) => {
        data.weight = value;
        return { data };
      },
      () => {
        this.dataUpdated();
      }
    );
    this.sendData(ep.users.weightLog, doneMessage, getLogWeight({ id, value }), "PUT");
  }

  handleProfileClick() {
    this.toggleProfileModal();
  }

  render() {
    const { classes, logoutHandler } = this.props;
    const {
      workoutModalOpen,
      profileModalOpen,
      openModal,
      showDoneMessage,
      doneMessage,
      doneMessageDuration,
      workoutAddModalOpen,
      logWeightModalOpen,
      wUnit,
      hUnit
    } = this.state;
    const { goals, workouts, id, fname, lname, weight, height } = this.state.data;
    return (
      <div className={classes.mainContainer}>
        <Navbar handleLogout={logoutHandler} handleProfileClick={this.handleProfileClick} handleLogWeightClick={this.toggleLogWeightModal} />
        <Sidebar
          workouts={workouts}
          goals={goals}
          handleWorkoutAddModalToggle={this.handleWorkoutAddModalToggle}
          handleWorkoutModalOpen={this.handleWorkoutModalOpen}
          handleGoalDelete={this.handleGoalDelete}
          handleGoalUpdate={this.handleGoalUpdate}
          handleGoalAdd={this.handleGoalAdd}
        />
        <div className={classes.cardsContainer}>
          {workouts.map((w, i) => (
            <WorkoutCard
              sendData={this.sendData}
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
            sendData={this.sendData}
            key={workouts[openModal].id}
            wid={workouts[openModal].id}
            open={workoutModalOpen} // boolean to open the modal
            workout={workouts[openModal]} // the workout object that will be displayed
            handleWorkoutUpdate={this.handleWorkoutUpdate}
            handleDeleteWorkoutConfirm={this.handleDeleteWorkoutConfirm}
            handleClose={this.handleWorkoutModalClose}
          />
        )}
        <WorkoutAddModal open={workoutAddModalOpen} handleWorkoutAddModalToggle={this.handleWorkoutAddModalToggle} handleWorkoutAdd={this.handleWorkoutAdd} />
        {fname.length > 0 && (
          <ProfileModal
            key={id + weight}
            open={profileModalOpen}
            sendData={this.sendData}
            id={id}
            fname={fname}
            lname={lname}
            weight={weight}
            height={height}
            handleClose={this.toggleProfileModal}
            wUnit={wUnit}
            hUnit={hUnit}
          />
        )}
        <WeightLogModal
          key={weight}
          open={logWeightModalOpen}
          handleClose={this.toggleLogWeightModal}
          handleUpdate={this.handleLogWeightModalUpdate}
          wUnit={wUnit}
          initValue={weight}
        />
      </div>
    );
  }
}

export default withStyles(styles)(Main);
