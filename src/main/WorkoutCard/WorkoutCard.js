import React from "react";
import ExerciseCard from "./ExerciseCard";
import { Card, Typography, Button, IconButton } from "@material-ui/core";
import { ExpandMore, ExpandLess } from "@material-ui/icons";
import { withStyles } from "@material-ui/styles";
import { getDay } from "../../helpers/helpers";

const CustomButton = withStyles(theme => ({
  root: {
    "& .MuiButtonBase-root": {
      // outline: "green",
      // outlineStyle: "solid"
    }
  }
}))(Button);

const styles = theme => {
  return {
    card: {
      minWidth: "320px",
      borderRadius: "0px",
      breakInside: "avoid",
      padding: "24px 32px",
      marginBottom: "8px",
      background: theme.palette.secondary.dark
    },
    cardHeader: {
      // border: "1px solid white",
      display: "flex",
      alignItems: "center",
      padding: "8px 0px",
      justifyContent: "space-between"
    },
    cardName: {
      color: theme.palette.primary.main,
      fontWeight: "bold",
      fontSize: "1.2rem",
      padding: "0px"
    },
    cardDay: {
      color: theme.palette.primary.main,
      fontSize: "1.2rem",
      padding: "0px"
    },
    cardExercises: {
      color: "white"
      // border: "1px solid white"
    },
    cardFooter: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gridTemplateAreas: `"done resize update"`,
      marginTop: "16px"
      // border: "1px solid white"
    },
    cardFooterButtons: {
      color: theme.palette.primary.main,
      padding: "0px",
      minWidth: "0px"
      // "& :focus, :active": {
      //   outlineColor: fade(theme.palette.primary.main, 0.3),
      //   outlineWidth: "thin",
      //   outlineStyle: "solid"
      // }
    },
    footerDone: {
      justifySelf: "start",
      gridArea: "done"
    },
    footerResize: {
      justifySelf: "center",
      gridArea: "resize"
    },
    footerUpdate: {
      justifySelf: "end",
      gridArea: "update"
    }
  };
};

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
          <CustomButton size="small" disableRipple className={`${classes.cardFooterButtons} ${classes.footerDone}`}>
            done
          </CustomButton>
          <IconButton disableRipple size="small" className={`${classes.cardFooterButtons} ${classes.footerResize}`} onClick={this.collapseButtonHandler}>
            {collapsed ? <ExpandMore /> : <ExpandLess />}
          </IconButton>
          <CustomButton size="small" disableRipple className={`${classes.cardFooterButtons} ${classes.footerUpdate}`}>
            update
          </CustomButton>
        </div>
      </Card>
    );
  }
}

export default withStyles(styles)(WorkoutCard);
