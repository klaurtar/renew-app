const styles = theme => ({
    root: {
        padding: "1rem 1rem 1rem 1rem",
        display: "flex",
        justifyContent: "space-around",
    },
    image: {
        width: "33%",
        display: "block",
        margin: "0 auto"
    },
    one: {
        width: "25%"
    },
    name: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "25%",
    },
    price: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "25%",
    },
    views: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "25%",
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
})

export default styles;