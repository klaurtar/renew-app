const styles = theme => ({
    root: {
      display: "flex",
      margin: "1rem 2rem",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center"
    },
    top: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%"
    },
    header: {
      fontSize: "4rem",
      fontWeight: "bold",
    },
    createLight: {
        background: 'green',
        height: "100%",
        fontWeight: "bold",
        fontSize: "1.2rem",
        color: "white"
    },
    createDark: {
        background: "#2E3B55",
        height: "100%",
        fontWeight: "bold",
        fontSize: "1.2rem",
        color: "white"
    },
    darkText: {
        color: "white"
    },
    lightText: {
        color: "black"
    }
  
})

export default styles;