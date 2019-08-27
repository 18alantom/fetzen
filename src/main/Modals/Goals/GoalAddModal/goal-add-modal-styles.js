const styles = theme => {
  return {
    container: {
      backgroundColor: theme.palette.secondary.main,
      padding: "16px",
      textAlign: "center",
      minWidth: "400px"
    },
    title: {
      textTransform: "uppercase",
      fontSize: "0.8rem",
      fontWeight: "300",
      letterSpacing: "4px",
      color: theme.palette.primary.main
    },
    form: {
      display: "flex",
      flexDirection: "column"
    },
    input: {
      marginTop: "24px",
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
      color: theme.palette.primary.main
    }
  };
};

export default styles;
