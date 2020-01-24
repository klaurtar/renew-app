import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import PageContent from "../PageContent";
import Navbar from "../Navbar";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputState from "../Hooks/useFormState";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import GroupCheckbox from "../GroupCheckbox";
import { LoggedInContext } from "../contexts/LoggedIn";
import { ThemeContext } from "../contexts/ThemeContext";
import { withStyles } from "@material-ui/core";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
    height: "500px"
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
  },

  photo_groups: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%"
  }
};

function NewItem(props) {
  const history = useHistory();
  const { classes } = props;
  const { isDarkMode } = useContext(ThemeContext);
  const { token } = useContext(LoggedInContext);

  const [itemNameValue, handleItemNameChange, resetItemName] = InputState("");
  const [itemPriceValue, handlePriceChange, resetPriceUrl] = InputState("");
  const [
    itemDescriptionValue,
    handleItemDescriptionChange,
    resetItemDescription
  ] = InputState("");

  const [fileState, setFileState] = useState([]);

  const [open, setOpen] = useState(false);

  const handleSnackbarClick = () => {
    setOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const goBackButton = () => {
    history.push("/items");
  };

  const handleFileUpload = event => {
    setFileState([...fileState, event.target.files[0]]);
    console.log(event.target.files[0]);
    console.log(fileState);
  };

  //This code works but photos always uploads as empty array
  // const handleNewItemSubmit = e => {
  //   e.preventDefault();
  //   fetch("http://localhost:8181/items", {
  //     body: JSON.stringify({
  //       title: itemNameValue,
  //       price: itemPriceValue,
  //       description: itemDescriptionValue,
  //       photos: fileState
  //     }),
  //     headers: {
  //       "Content-Type": "application/json",
  //       Token: token
  //     },
  //     method: "POST"
  //   })
  //     .then(res => res.json())
  //     .then(data => {
  //       console.log(data);
  //       handleSnackbarClick();
  //     });
  // };
  const handleNewItemSubmit = e => {
    e.preventDefault();

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "multipart/form-data");
    myHeaders.append("token", JSON.stringify(token));

    var formdata = new FormData();
    formdata.append("title", JSON.stringify(itemNameValue));
    formdata.append("description", JSON.stringify(itemDescriptionValue));
    formdata.append("price", itemPriceValue);
    formdata.append("photos", fileState.name);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow"
    };

    fetch("http://localhost:8181/items", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log("error", error));
  };
  return (
    <PageContent>
      <Navbar />
      <h1 className={classes.heading} style={{ color: isDarkMode && "white" }}>
        New Item
      </h1>
      <form
        className={classes.newForm}
        noValidate
        autoComplete="off"
        onSubmit={handleNewItemSubmit}
      >
        <TextField
          required
          id="outlined-name-1"
          label="Facebook Item Name"
          variant="outlined"
          onChange={handleItemNameChange}
          value={itemNameValue}
          InputLabelProps={{
            classes: {
              root: isDarkMode && classes.cssLabel,
              focused: classes.cssFocused
            }
          }}
          InputProps={{
            classes: {
              root: isDarkMode && classes.cssOutlinedInput,
              focused: classes.cssFocused,
              notchedOutline: isDarkMode && classes.notchedOutline,
              input: isDarkMode && classes.multilineColor
            }
          }}
        />
        <TextField
          required
          id="outlined-name-2"
          label="Facebook Item Price"
          variant="outlined"
          onChange={handlePriceChange}
          value={itemPriceValue}
          InputLabelProps={{
            classes: {
              root: isDarkMode && classes.cssLabel,
              focused: classes.cssFocused
            }
          }}
          InputProps={{
            classes: {
              root: isDarkMode && classes.cssOutlinedInput,
              focused: classes.cssFocused,
              notchedOutline: isDarkMode && classes.notchedOutline,
              input: isDarkMode && classes.multilineColor
            }
          }}
        />

        <TextField
          id="outlined-desc"
          label="Facebook Item Description"
          variant="outlined"
          multiline={true}
          rows={4}
          rowsMax={8}
          onChange={handleItemDescriptionChange}
          value={itemDescriptionValue}
          InputLabelProps={{
            classes: {
              root: isDarkMode && classes.cssLabel,
              focused: classes.cssFocused
            }
          }}
          InputProps={{
            classes: {
              root: isDarkMode && classes.cssOutlinedInput,
              focused: classes.cssFocused,
              notchedOutline: isDarkMode && classes.notchedOutline,
              input: isDarkMode && classes.multilineColor
            }
          }}
        />
        <div className={classes.photo_groups}>
          {/* <input
            accept="image/*"
            className={classes.input}
            style={{ display: "none" }}
            id="raised-button-file"
            multiple
            type="file"
            onChange={handleFileUpload}
          />
          <label htmlFor="raised-button-file">
            <Button
              variant="raised"
              component="span"
              className={classes.button}
            >
              Photo Upload
            </Button>
          </label> */}
          <input type="file" onChange={handleFileUpload} />
          <GroupCheckbox />
        </div>
        <div className={classes.buttons}>
          <Button
            variant="outlined"
            style={{ width: "20%", color: "red", border: "1px solid red" }}
            onClick={goBackButton}
          >
            Back
          </Button>
          <Button
            variant="outlined"
            type="submit"
            style={{ width: "20%", color: "green", border: "1px solid green" }}
          >
            Add Item
          </Button>
        </div>
      </form>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="success">
          {itemNameValue} was successfully added!
        </Alert>
      </Snackbar>
    </PageContent>
  );
}

export default withStyles(styles)(NewItem);
