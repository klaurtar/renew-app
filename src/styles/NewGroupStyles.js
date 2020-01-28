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
      height: "300px"
    },
    buttons: {
      display: "flex",
      justifyContent: "space-between"
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
    }
  };

  export default styles;