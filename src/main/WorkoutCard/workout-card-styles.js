import { darken } from "@material-ui/core/styles/colorManipulator";

const styles = theme => {
  return {
    card: {
      minWidth: "320px",
      borderRadius: "0px",
      breakInside: "avoid",
      padding: "24px 32px",
      marginBottom: "8px",
      background: theme.palette.secondary.dark
    },
    cardHeader: {
      display: "flex",
      alignItems: "center",
      padding: "8px 0px",
      justifyContent: "space-between"
    },
    cardName: {
      cursor: "pointer",
      color: theme.palette.primary.main,
      fontWeight: "bold",
      fontSize: "1.2rem",
      padding: "0px"
    },
    cardDay: {
      color: darken(theme.palette.primary.main, 0.2),
      fontSize: "1.2rem",
      padding: "0px"
    },
    cardExercises: {
      color: "white"
    },
    cardFooter: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gridTemplateAreas: `"done resize update"`,
      marginTop: "16px"
    },
    cardFooterButtons: {
      color: darken(theme.palette.primary.main, 0.3),
      padding: "0px",
      minWidth: "0px"
    },
    footerDone: {
      justifySelf: "start",
      gridArea: "done"
    },
    footerResize: {
      justifySelf: "center",
      gridArea: "resize"
    },
    footerUpdate: {
      justifySelf: "end",
      gridArea: "update"
    }
  };
};

export default styles;
