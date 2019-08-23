import React from "react";
import ExerciseCard from "./ExerciseCard/ExerciseCard";
import { Card, Typography, Button, IconButton } from "@material-ui/core";
import { ExpandMore, ExpandLess } from "@material-ui/icons";
import { withStyles } from "@material-ui/styles";
import { getDay } from "../../helpers/helpers";
import { workoutKeys } from "../../helpers/constants";
import ExerciseModal from "../Modals/Exercises/ExerciseModal";
import styles from "./workout-card-styles";

class WorkoutCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
      openModal: 0,
      exerciseModalOpen: false
    };
    this.handleCollapseButton = this.handleCollapseButton.bind(this);
    this.handleExerciseClick = this.handleExerciseClick.bind(this);
    this.handleExerciseModalClose = this.handleExerciseModalClose.bind(this);
  }

  handleExerciseClick(i) {
    this.setState(({ exerciseModalOpen }) => ({ exerciseModalOpen: !exerciseModalOpen, openModal: i }));
  }

  handleExerciseModalClose() {
    this.setState(({ exerciseModalOpen }) => ({ exerciseModalOpen: !exerciseModalOpen }));
  }

  handleCollapseButton() {
    this.setState(({ collapsed }) => ({ collapsed: !collapsed }));
  }
  render() {
    const { classes, workout, handleWorkoutModalOpen } = this.props;
    const { collapsed, openModal, exerciseModalOpen } = this.state;
    return (
      <Card className={classes.card} style={{ height: workout }}>
        <div className={classes.cardHeader}>
          <Typography className={classes.cardName} onClick={handleWorkoutModalOpen}>
            {workout.name}
          </Typography>
          <Typography className={classes.cardDay}>{getDay(workout)}</Typography>
        </div>
        <div className={classes.cardExercises}>
          {workout.exercises.map((e, i) => {
            return (
              <ExerciseCard
                key={i}
                exercise={e}
                collapsed={collapsed}
                handleExerciseClick={() => {
                  this.handleExerciseClick(i);
                }}
              />
            );
          })}
        </div>
        <div className={classes.cardFooter}>
          <Button size="small" disableRipple className={`${classes.cardFooterButtons} ${classes.footerDone}`}>
            done
          </Button>
          <IconButton disableRipple size="small" className={`${classes.cardFooterButtons} ${classes.footerResize}`} onClick={this.handleCollapseButton}>
            {collapsed ? <ExpandMore /> : <ExpandLess />}
          </IconButton>
          <Button size="small" disableRipple className={`${classes.cardFooterButtons} ${classes.footerUpdate}`} onClick={handleWorkoutModalOpen}>
            update
          </Button>
        </div>
        {/* Modal for an exercise to show individual sets */}
        <ExerciseModal open={exerciseModalOpen} exercise={workout[workoutKeys.exercises][openModal]} handleClose={this.handleExerciseModalClose} />
      </Card>
    );
  }
}

export default withStyles(styles)(WorkoutCard);
