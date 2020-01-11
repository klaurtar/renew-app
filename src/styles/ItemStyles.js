const styles = theme => ({
  root: {
    padding: "1rem 1rem 1rem 1rem",
    display: "flex",
    justifyContent: "space-around"
  },
  image: {
    width: "33%",
    display: "block",
    margin: "0 auto"
  },
  one: {
    width: "20%"
  },
  name: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "20%"
  },
  price: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "20%"
  },
  views: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "20%"
  },
  actions: {
    width: "20%",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    "& button": {
        backgroundColor: "transparent",
        border: "none",
        outline: "none",
        cursor: "pointer",
      },
  },
  
  edit: {
    color: "green"
  },
  trash: {
    color: "red"
  },
  textDark: {
    color: "green"
  },
  textLight: {
    color: "black"
  },
  borderDark: {
    borderBottom: "1px solid #2E3B55"
  },
  borderLight: {
    borderBottom: "1px solid lightgrey"
  }
});

export default styles;
