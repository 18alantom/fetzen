import { darken } from "@material-ui/core/styles/colorManipulator";

const styles = theme => {
  return {
    container: {
      backgroundColor: theme.palette.secondary.main,
      padding: "16px",
      textAlign: "center",
      minWidth: "400px",
      maxWidth: "700px"
    },
    title: {
      fontWeight: "bold",
      fontSize: "1.2rem",
      color: theme.palette.primary.main
    },
    detail: {
      marginTop: "24px",
      color: theme.palette.primary.main
    },
    deadline: {
      marginTop: "4px",
      color: darken(theme.palette.primary.main, 0.2),
      fontSize: "0.8rem"
    },
    buttonContainer: {
      marginTop: "16px",
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr"
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
