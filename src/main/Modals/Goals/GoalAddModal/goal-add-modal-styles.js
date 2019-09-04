import { darken } from "@material-ui/core/styles/colorManipulator";

const styles = theme => {
  return {
    container: {
      backgroundColor: theme.palette.secondary.main,
      padding: "16px",
      textAlign: "center",
      minWidth: "400px"
    },
    title: {
      color: darken(theme.palette.primary.main, 0.3),
      fontSize: "1.1rem",
      letterSpacing: "1px",
    },
    form: {
      display: "flex",
      flexDirection: "column"
    },
    input: {
      marginTop: "16px",
      color: theme.palette.primary.main
    },
    error: {
      textTransform: "uppercase",
      fontSize: "0.7rem",
      marginTop: "8px",
      fontWeight: "300",
      letterSpacing: "1px",
      color: theme.palette.error[400]
    },
    buttonContainer: {
      marginTop: "16px",
      display: "flex",
      justifyContent: "space-between"
    },
    button: {
      padding: "0px",
      color: darken(theme.palette.primary.main, 0.3),
      "&:hover": {
        backgroundColor: "transparent",
        color: darken(theme.palette.primary.main, 0.1)
      },
      "&:focus": {
        color: darken(theme.palette.primary.main, 0.1)
      }
    }
  };
};

export default styles;
