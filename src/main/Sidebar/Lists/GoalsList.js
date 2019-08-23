import React from "react";
import { withStyles } from "@material-ui/styles";
import { Typography, IconButton, List, ListItem, ListItemText, ListItemIcon } from "@material-ui/core";
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
    this.handleGoalDone = this.handleGoalDone.bind(this);
    this.handleGoalNotDone = this.handleGoalNotDone.bind(this);
  }
  // Opens goal modal.
  handleGoalClick(id) {
    this.setState(({ goalModalOpen }) => ({ goalModalOpen: !goalModalOpen, openModal: id }));
  }
  // Opens goal adding modal.
  handleGoalAddClick() {
    this.setState(({ goalAddModalOpen }) => ({ goalAddModalOpen: !goalAddModalOpen }));
  }
  // Closes goal modal.
  handleGoalModalClose() {
    this.setState(({ goalModalOpen }) => ({ goalModalOpen: !goalModalOpen }));
  }
  // Sets complete to true and date of completion.
  handleGoalNotDone() {
    // this.props.handleGoalUpdate(this.state.openModal, false);
    this.handleGoalModalClose();
  }
  // Sets complete to true and date of completion.
  handleGoalDone() {
    this.handleGoalModalClose();
    this.props.handleGoalUpdate(this.state.openModal, true);
  }
  // Closes goal add modal.
  handleGoalAddModalClose() {
    this.setState(({ goalAddModalOpen }) => ({ goalAddModalOpen: !goalAddModalOpen }));
  }

  render() {
    const { classes, goals } = this.props;
    const { goalAddModalOpen, goalModalOpen, openModal } = this.state;
    const goal = goals.filter(g => g.id === openModal)[0];
    return (
      <div>
        <Typography className={classes.listTitleText} component="h3">
          Goals
        </Typography>
        <List className={classes.list}>
          {goals.map(({ title, id }, i) => {
            return (
              <ListItem button key={i} className={classes.listItem} onClick={() => this.handleGoalClick(id)}>
                <ListItemIcon className={classes.listItemIcon}>
                  <LabelOutlined />
                </ListItemIcon>
                <ListItemText primary={title} className={classes.listItemText} />
              </ListItem>
            );
          })}
        </List>
        <div className={classes.addButtonContainer}>
          <IconButton className={classes.addButton} aria-label="add-goal" onClick={this.handleGoalAddClick}>
            <Add />
          </IconButton>
        </div>
        {goal && <GoalModal open={goalModalOpen} goal={goal} handleNotDone={this.handleGoalNotDone} handleDone={this.handleGoalDone} />}
        <GoalAddModal open={goalAddModalOpen} handleClose={this.handleGoalAddModalClose} />
      </div>
    );
  }
}

export default withStyles(styles)(GoalsList);
