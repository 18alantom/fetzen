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
      color: theme.palette.primary.main,
      fontWeight: "bold",
      fontSize: "1.2rem",
      padding: "0px"
    },
    cardDay: {
      color: theme.palette.primary.main,
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
      color: theme.palette.primary.main,
      padding: "0px",
      minWidth: "0px"
      // "& :focus, :active": {
      //   outlineColor: fade(theme.palette.primary.main, 0.3),
      //   outlineWidth: "thin",
      //   outlineStyle: "solid"
      // }
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