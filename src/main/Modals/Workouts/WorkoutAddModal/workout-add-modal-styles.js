import { fade, darken } from "@material-ui/core/styles/colorManipulator";

const styles = theme => {
  return {
    container: {
      backgroundColor: theme.palette.secondary.main,
      padding: "16px",
      textAlign: "center",
      minWidth: "600px",
      maxWidth: "700px"
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "8px"
    },
    exerciseCount: {
      color: darken(theme.palette.primary.main, 0.2),
      marginTop: "4px",
      fontSize: "1rem",
      letterSpacing: "2px"
    },
    workoutContainer: {
      marginTop: "8px",
      display: "grid",
      gridTemplateColumns: "repeat(2,1fr)",
      gridColumnGap: "16px"
    },
    title: {
      padding: "0px"
    },
    setsCount: {
      color: darken(theme.palette.primary.main, 0.2),
      fontSize: "1.2rem",
      marginTop: "4px"
    },
    buttonContainer: {
      marginTop: "14px",
      display: "flex",
      justifyContent: "space-between"
    },
    buttonContainerThree: {
      marginTop: "14px",
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr"
    },
    message: {
      color: darken(theme.palette.primary.main, 0.3),
      textAlign: "center",
      fontSize: "0.9rem"
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
        backgroundColor: "transparent",
        color: darken(theme.palette.primary.main, 0.1)
      },
      "&:focus": {
        color: darken(theme.palette.primary.main, 0.1)
      }
    },
    divisor: {
      borderColor: fade(darken(theme.palette.primary.light, 0.4), 0.4)
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
    },
    subTitle: {
      color: darken(theme.palette.primary.main, 0.3),
      fontSize: "1.1rem",
      letterSpacing: "1px",
      marginBottom: "8px"
    }
  };
};

export default styles;
