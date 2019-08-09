import React from "react";
import ExerciseCard from "./ExerciseCard/ExerciseCard";
import { Card, Typography, Button, IconButton } from "@material-ui/core";
import { ExpandMore, ExpandLess } from "@material-ui/icons";
import { withStyles } from "@material-ui/styles";
import { getDay } from "../../helpers/helpers";
import styles from "./workout-card-styles";

class WorkoutCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true
    };
    this.collapseButtonHandler = this.collapseButtonHandler.bind(this);
  }

  collapseButtonHandler() {
    this.setState(({ collapsed }) => ({ collapsed: !collapsed }));
  }
  render() {
    const { classes, workout } = this.props;
    const { collapsed } = this.state;
    return (
      <Card className={classes.card} style={{ height: workout }}>
        <div className={classes.cardHeader}>
          <Typography className={classes.cardName}>{workout.name}</Typography>
          <Typography className={classes.cardDay}>{getDay(workout)}</Typography>
          {/* <Typography>Size: {workout}</Typography> */}
        </div>
        <div className={classes.cardExercises}>
          {workout.exercises.map((e, i) => {
            return <ExerciseCard key={i} exercise={e} collapsed={collapsed} />;
          })}
        </div>
        <div className={classes.cardFooter}>
          <Button size="small" disableRipple className={`${classes.cardFooterButtons} ${classes.footerDone}`}>
            done
          </Button>
          <IconButton disableRipple size="small" className={`${classes.cardFooterButtons} ${classes.footerResize}`} onClick={this.collapseButtonHandler}>
            {collapsed ? <ExpandMore /> : <ExpandLess />}
          </IconButton>
          <Button size="small" disableRipple className={`${classes.cardFooterButtons} ${classes.footerUpdate}`}>
            update
          </Button>
        </div>
      </Card>
    );
  }
}

export default withStyles(styles)(WorkoutCard);
