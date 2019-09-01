import React from "react";
import { withStyles } from "@material-ui/styles";
import { Typography, IconButton, List, ListItem, ListItemText, ListItemIcon, Collapse } from "@material-ui/core";
import { LabelOutlined, ExpandMore, ExpandLess } from "@material-ui/icons";
import GoalModal from "../../Modals/Goals/GoalModal/GoalModal";
import styles from "./list-styles";

class GoalsCompletedList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expand: false,
      openModal: 0,
      goalModalOpen: false,
      goalAddModalOpen: false
    };
    this.handleGoalClick = this.handleGoalClick.bind(this);
    this.handleGoalModalClose = this.handleGoalModalClose.bind(this);
    this.handleGoalDone = this.handleGoalDone.bind(this);
    this.handleGoalNotDone = this.handleGoalNotDone.bind(this);
    this.handleCollapseButton = this.handleCollapseButton.bind(this);
  }
  // Opens goal modal.
  handleGoalClick(id) {
    this.setState(({ goalModalOpen }) => ({ goalModalOpen: !goalModalOpen, openModal: id }));
  }
  // Closes goal modal.
  handleGoalModalClose() {
    this.setState(({ goalModalOpen }) => ({ goalModalOpen: !goalModalOpen }));
  }
  // Sets complete to true and date of completion.
  handleGoalNotDone() {
    this.handleGoalModalClose();
    this.props.handleGoalUpdate(this.state.openModal, false);
  }
  // Sets complete to true and date of completion.
  handleGoalDone() {
    this.handleGoalModalClose();
  }

  handleCollapseButton() {
    this.setState(({ expand }) => ({ expand: !expand }));
  }

  render() {
    const { classes, goals } = this.props;
    const { expand, goalModalOpen, openModal } = this.state;
    const goal = goals.filter(g => g.id === openModal)[0];
    return (
      <div>
        <div className={classes.titleContainer}>
          <Typography className={classes.listTitleText} component="h3" onClick={this.handleCollapseButton}>
            Completed Goals
          </Typography>
          <IconButton disableRipple size="small" className={classes.collapseButton} onClick={this.handleCollapseButton}>
            {expand ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </div>
        <Collapse in={expand}>
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
        </Collapse>
        {goal && <GoalModal open={goalModalOpen} goal={goal} handleNotDone={this.handleGoalNotDone} handleDone={this.handleGoalDone} handleClose={this.handleGoalModalClose}/>}
      </div>
    );
  }
}

export default withStyles(styles)(GoalsCompletedList);
