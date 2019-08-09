import React from "react";
import { withStyles } from "@material-ui/styles";
import { Typography, IconButton, List, ListItem, ListItemText, ListItemIcon, Dialog } from "@material-ui/core";
import { LabelOutlined, Add } from "@material-ui/icons";
import GoalAddModal from "../../Modals/Goals/GoalAddModal/GoalAddModal";
import GoalModal from "../../Modals/Goals/GoalModal/GoalModal";
import styles from "./list-styles";

class GoalsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: 0,
      goalModalOpen: false,
      goalAddModalOpen: false
    };
    this.handleGoalAddClick = this.handleGoalAddClick.bind(this);
    this.handleGoalClick = this.handleGoalClick.bind(this);
    this.handleGoalModalClose = this.handleGoalModalClose.bind(this);
    this.handleGoalAddModalClose = this.handleGoalAddModalClose.bind(this);
  }
  // Opens goal modal.
  handleGoalClick(i) {
    this.setState(({ goalModalOpen }) => ({ goalModalOpen: !goalModalOpen, openModal: i }));
  }
  // Opens goal adding modal.
  handleGoalAddClick() {
    this.setState(({ goalAddModalOpen }) => ({ goalAddModalOpen: !goalAddModalOpen }));
  }
  // Closes goal modal.
  handleGoalModalClose() {
    this.setState(({ goalModalOpen }) => ({ goalModalOpen: !goalModalOpen }));
  }
  // Closes goal add modal.
  handleGoalAddModalClose() {
    this.setState(({ goalAddModalOpen }) => ({ goalAddModalOpen: !goalAddModalOpen }));
  }

  render() {
    const { classes, goals } = this.props;
    const { goalAddModalOpen, goalModalOpen, openModal } = this.state;
    return (
      <div>
        <Typography className={classes.listTitleText} component="h3">
          Goals
        </Typography>
        <List className={classes.list}>
          {goals.map(({ title }, i) => {
            return (
              <ListItem button key={i} className={classes.listItem} onClick={() => this.handleGoalClick(i)}>
                <ListItemIcon className={classes.listItemIcon}>
                  <LabelOutlined />
                </ListItemIcon>
                <ListItemText primary={title} className={classes.listItemText} />
              </ListItem>
            );
          })}
        </List>
        <div className={classes.addButtonContainer}>
          <IconButton className={classes.addButton} iaria-label="add-workout" onClick={this.handleGoalAddClick}>
            <Add />
          </IconButton>
        </div>
        <Dialog open={goalModalOpen}>
          <GoalModal goal={goals[openModal]} handleClose={this.handleGoalModalClose} />
        </Dialog>
        <Dialog open={goalAddModalOpen}>
          <GoalAddModal handleClose={this.handleGoalAddModalClose} />
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(GoalsList);
