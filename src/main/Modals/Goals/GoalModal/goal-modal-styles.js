const styles = theme => {
  return {
    container: {
      backgroundColor: theme.palette.secondary.main,
      padding: "16px",
      textAlign: "center",
      borderRadius: "1000px"
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
      color: theme.palette.primary.main,
      fontSize: "0.8rem",
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
