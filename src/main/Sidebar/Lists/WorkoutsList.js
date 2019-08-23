import React from "react";
import { withStyles } from "@material-ui/styles";
import { Typography, IconButton, List, ListItem, ListItemText, ListItemIcon, Collapse } from "@material-ui/core";
import { LabelOutlined, Add, ExpandMore, ExpandLess } from "@material-ui/icons";
import styles from "./list-styles";

class WorkoutList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expand: true
    };
    this.handleCollapseButton = this.handleCollapseButton.bind(this);
  }
  handleCollapseButton() {
    this.setState(({ expand }) => ({ expand: !expand }));
  }
  render() {
    const { classes, workouts, handleWorkoutModalOpen } = this.props;
    const { expand } = this.state;
    return (
      <div>
        <div className={classes.titleContainer}>
          <Typography className={classes.listTitleText} component="h3" onClick={this.handleCollapseButton}>
            Workouts
          </Typography>
          <IconButton disableRipple size="small" className={classes.collapseButton} onClick={this.handleCollapseButton}>
            {expand ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </div>
        <Collapse in={expand}>
          <List className={classes.list}>
            {workouts.map(({ name }, i) => {
              return (
                <ListItem
                  button
                  key={i}
                  className={classes.listItem}
                  onClick={() => {
                    handleWorkoutModalOpen(i);
                  }}
                >
                  <ListItemIcon className={classes.listItemIcon}>
                    <LabelOutlined />
                  </ListItemIcon>
                  <ListItemText primary={name} className={classes.listItemText} />
                </ListItem>
              );
            })}
          </List>
          <div className={classes.addButtonContainer}>
            <IconButton className={classes.addButton} iaria-label="add-workout">
              <Add />
            </IconButton>
          </div>
        </Collapse>
      </div>
    );
  }
}

export default withStyles(styles)(WorkoutList);
