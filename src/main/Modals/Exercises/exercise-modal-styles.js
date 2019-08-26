const styles = theme => {
  return {
    container: {
      backgroundColor: theme.palette.secondary.main,
      padding: "16px",
      textAlign: "center",
      minWidth: "400px",
      maxWidth: "700px"
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "16px"
    },
    setsCount: {
      fontSize: "1.2rem",
      color: theme.palette.primary.main
    },
    setContainer: {
      display: "grid",
      gridRowGap: "88px",
      gridTemplateColumns: "1fr 3fr 3fr 1fr",
      marginTop: "8px"
    },
    setsContainer: {},
    index: {
      color: theme.palette.primary.main,
      justifySelf: "start"
    },
    rest: {
      justifySelf: "end"
    },
    title: {
      fontWeight: "bold",
      fontSize: "1.2rem",
      color: theme.palette.primary.main
    },
    detail: {
      color: theme.palette.primary.main
    },
    buttonContainer: {
      marginTop: "8px",
      display: "flex",
      // justifyContent: "space-between"
      justifyContent: "center"
    },
    button: {
      padding: "0px",
      color: theme.palette.primary.main
    }
  };
};

export default styles;
