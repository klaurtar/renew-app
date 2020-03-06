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
      alignItems: "center",
      [theme.breakpoints.down('sm')]: {
        display: "block"
      }
  },
  darkText: {
    color: "white"
  },
  lightText: {
    color: "black"
  },
  header: {
    fontSize: "3rem",
    textAlign: "center",
    marginTop: "1rem",
    marginBottom: "1rem",
    
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
    borderRadius: "15px",
    [theme.breakpoints.down('sm')]: {
      justifyContent: "space-between"
    }
  },
  bgDark: {
    background: "#2E3B55",
    color: "white"
  },
  bgLight: {
    background: "rgb(93, 58, 255)"
  },
  searchbar: {
    [theme.breakpoints.down('sm')]: {
      display: "none"
    }
  },
  mobileFriendly: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  mobileHeader: {
    width: "16.6666%", 
    textAlign: "center",
    [theme.breakpoints.down('sm')]: {
      width: "30%"
    }
  }
});

export default styles;
