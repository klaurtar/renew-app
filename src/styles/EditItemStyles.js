const styles = {
    heading: {
      textAlign: "center",
      fontSize: "3rem"
    },
    newForm: {
      display: "flex",
      flexDirection: "column",
      paddingLeft: "15rem",
      paddingRight: "15rem",
      justifyContent: "space-between",
      height: "37.5rem"
    },
    buttons: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "1rem"
    },
    cssLabel: {
      color: "white"
    },
    cssOutlinedInput: {
      "&$cssFocused $notchedOutline": {
        borderColor: "blue!important"
      }
    },
  
    cssFocused: {},
  
    notchedOutline: {
      borderWidth: "1px",
      borderColor: "white !important"
    },
  
    multilineColor: {
      color: "white"
    },
  
    photo_groups: {
      display: "flex",
      justifyContent: "space-between",
      width: "100%"
    },
  
    select: {
      width: "100%"
    },
  
    checkbox: {
      margin: "0 auto"
    }
}

export default styles;