const styles = theme => {
  return {
    mainContainer: {
      background: theme.palette.secondary.light,
      height: "100%",
      display: "grid",
      gridTemplate: "4rem auto/ 272px auto auto",
      gridTemplateAreas: `
        "navbar navbar navbar"
        "sidebar cards cards"
      `
    },
    cardsContainer: {
      padding: "8px",
      columnCount: "auto",
      columnWidth: "300px",
      columnGap: "8px",
      marginRight: "15%",
      gridArea: "cards",
      background: theme.palette.secondary.light
    }
  };
};

export default styles;