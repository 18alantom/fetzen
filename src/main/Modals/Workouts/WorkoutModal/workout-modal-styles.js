import { fade, darken } from "@material-ui/core/styles/colorManipulator";

const styles = theme => {
  return {
    container: {
      backgroundColor: theme.palette.secondary.main,
      padding: "16px",
      textAlign: "center",
      minWidth: "500px",
      maxWidth: "700px"
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "8px"
    },
    lastCompleted: {
      color: darken(theme.palette.primary.main, 0.2),
      marginTop: "4px",
      fontSize: "1rem",
      letterSpacing: "2px"
    },
    exercise: {
      display: "flex",
      padding: "4px 0px"
    },
    exerciseName: {
      textAlign: "start",
      color: theme.palette.primary.main
    },
    col0: {
      gridColumn: "1 / span 1"
    },
    col1: {
      gridColumn: "2 / span 1"
    },
    workoutContainer: {
      marginTop: "8px",
      display: "grid",
      gridTemplateColumns: "repeat(2,1fr)",
      gridColumnGap: "16px"
    },
    index: {
      marginRight: "8px",
      color: darken(theme.palette.primary.main, 0.3)
    },
    title: {
      padding: "0px"
    },
    checkboxLabel: {
      color: darken(theme.palette.primary.main, 0.3)
    },
    daysContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start"
    },
    checkboxContainer: {
      display: "flex",
      flexDirection: "row"
    },
    days: {
      color: darken(theme.palette.primary.main, 0.2),
      textAlign: "start",
      letterSpacing: "1px",
      fontSize: "0.9rem"
    },
    buttonContainer: {
      marginTop: "14px",
      display: "flex",
      justifyContent: "space-between"
    },
    addRemoveButton: {
      marginLeft: "auto",
      height: "24px",
      width: "24px"
    },
    note: {
      margin: "12px 0px 8px 0px"
    },
    button: {
      color: darken(theme.palette.primary.main, 0.3),
      padding: "0px",
      "&:disabled": {
        color: theme.palette.secondary.main
      },
      "&:hover": {
        backgroundColor: "transparent"
      }
    },
    divisor: {
      borderColor: fade(darken(theme.palette.primary.light, 0.4), 0.4),
      marginTop: "12px"
    },
    areYouSure: {
      color: theme.palette.primary.main,
      fontSize: "1rem",
      minWidth: "10%",
      maxWidth: "80%",
      margin: "auto"
    },
    topDivisor: {
      marginTop: "8px",
      marginBottom: "16px"
    },
    error: {
      textAlign: "center",
      textTransform: "uppercase",
      fontSize: "0.8em",
      letterSpacing: "1px"
    }
  };
};

export default styles;
