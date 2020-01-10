const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between"
  },
  secondary: {
      width: "95vw",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center"
  },
  darkText: {
    color: "#2E3B55"
  },
  lightText: {
    color: "black"
  },
  header: {
    fontSize: "3rem",
    textAlign: "center",
    marginTop: "1rem",
    marginBottom: "1rem"
  },
  holder: {
    width: "95vw"
  },
  table: {
    padding: "1rem 1rem 0 1rem",
    height: "30px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    borderRadius: "15px"
  },
  bgDark: {
    background: "#2E3B55"
  },
  bgLight: {
    background: "rgb(93, 58, 255)"
  }
});

export default styles;
