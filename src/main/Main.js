import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { withStyles } from "@material-ui/styles";

const styles = theme => {
  return {
    mainContainer: {
      background: theme.palette.secondary.light,
      height: "100%"
    }
  };
};

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { classes, data:{goals,workouts} } = this.props;
    // const {}
    console.log(this.props.data);
    return (
      <div className={classes.mainContainer}>
        <Navbar />
        <Sidebar workouts={workouts} goals={goals} />
        
      </div>
    );
  }
}

export default withStyles(styles)(Main);
