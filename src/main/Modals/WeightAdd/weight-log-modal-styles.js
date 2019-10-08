import { darken } from "@material-ui/core/styles/colorManipulator";

const styles = theme => {
  return {
    container: {
      backgroundColor: theme.palette.secondary.main,
      padding: "16px",
      textAlign: "center",
      minWidth: "200px"
    },
    header: {
      display: "flex",
      justifyContent: "center",
      marginBottom: "16px"
    },
    title: {
      letterSpacing: "2px",
      color: theme.palette.primary.main,
      fontWeight: "bold",
      fontSize: "1.2rem"
    },
    buttonContainer: {
      marginTop: "14px",
      display: "grid",
      gridTemplateColumns: "1fr 1fr"
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
    buttonRight: {
      gridArea: "1 / 2 / 2 / 3"
    }
  };
};

export default styles;
