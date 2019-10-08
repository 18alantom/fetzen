import { darken } from "@material-ui/core/styles/colorManipulator";

const styles = theme => {
  return {
    flName: {
      letterSpacing: "2px",
      color: theme.palette.primary.main,
      fontWeight: "bold",
      fontSize: "1.2rem",
    },
    container: {
      backgroundColor: theme.palette.secondary.main,
      padding: "16px",
      textAlign: "center",
      minWidth: "500px",
      maxWidth: "700px"
    },
    header: {
      display: "flex",
      justifyContent: "center",
      marginBottom: "16px"
    },
    whContainer: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gridGap: "32px"
    },
    nameValueContainer: {
      display: "flex",
      justifyContent: "space-between"
    },
    name: {
      color: darken(theme.palette.primary.main, 0.2),
      fontSize: "1rem"
    },
    value: {
      color: darken(theme.palette.primary.main, 0),
      fontSize: "1rem"
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
