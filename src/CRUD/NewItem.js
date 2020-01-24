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
import Categories from "../Utilities/Category_List";
import Select from "react-select";

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
};

function NewItem(props) {
  const history = useHistory();
  const { classes } = props;
  const { isDarkMode } = useContext(ThemeContext);
  const { token } = useContext(LoggedInContext);

  const [itemNameValue, handleItemNameChange, resetItemName] = InputState("");
  const [itemPriceValue, handlePriceChange, resetPrice] = InputState("");
  const [
    itemDescriptionValue,
    handleItemDescriptionChange,
    resetItemDescription
  ] = InputState("");

  const [fileState, setFileState] = useState([]);

  const [open, setOpen] = useState(false);

  const [selectOption, setSelectOption] = useState(null);

  const [selectedGroups, setSelectedGroups] = useState([]);

  const handleSuccessSnackbarClick = () => {
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

  const handleFileUpload = e => {
    setFileState(e.target.files);
  };

  const resetFileUpload = () => {
    setFileState([]);
  }

  const handleSelectOption = selectOption => {
    setSelectOption(selectOption);
    console.log(selectOption);
  };

  const resetSelectOption = () => {
    setSelectOption(null);
  };

  const handleGroupCheckboxClick = event => {
    let checkId = event.target.id;
    setSelectedGroups([...selectedGroups, checkId]);
    console.log(selectedGroups);
  };

  const resetGroupCheckbox = () => {
    setSelectedGroups([]);
  }

  const handleNewItemSubmit = e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", itemNameValue);
    formData.append("price", itemPriceValue);
    formData.append("description", itemDescriptionValue);
    formData.append("category", selectOption.value);

    for (let i = 0; i < selectedGroups.length; i++) {
      formData.append("groups", selectedGroups[i]);
    }
    //formData.append('photos', fileState);
    for (let i = 0; i < fileState.length; i++) {
      formData.append("photos", fileState[i], fileState[i].name);
    }

    fetch("http://localhost:8181/items", {
      body: formData,
      headers: {
        //"Content-Type": "application/json",
        Token: token
      },
      method: "POST"
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        handleSuccessSnackbarClick();
        resetItemName();
        resetPrice();
        resetItemDescription();
        resetSelectOption();
        resetGroupCheckbox();
        resetFileUpload();
      })
      .catch(error => console.log(error));
  };

  // const handleFileUpload = event => {
  //   setFileState([...fileState, event.target.files[0]]);
  //   console.log(event.target.files[0]);
  //   console.log(fileState);
  // };

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

  // const handleNewItemSubmit = e => {
  //   e.preventDefault();
  //
  //   var myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "multipart/form-data");
  //   myHeaders.append("token", JSON.stringify(token));
  //
  //   var formdata = new FormData();
  //   formdata.append("title", JSON.stringify(itemNameValue));
  //   formdata.append("description", JSON.stringify(itemDescriptionValue));
  //   formdata.append("price", itemPriceValue);
  //   formdata.append("photos", fileState.name);
  //
  //   var requestOptions = {
  //     method: "POST",
  //     headers: myHeaders,
  //     body: formdata,
  //     redirect: "follow"
  //   };
  //
  //   fetch("http://localhost:8181/items", requestOptions)
  //     .then(response => response.text())
  //     .then(result => console.log(result))
  //     .catch(error => console.log("error", error));
  // };

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
          <input type="file" onChange={handleFileUpload} multiple />
          <Select
            options={Categories}
            placeholder="Category"
            className={classes.select}
            value={selectOption}
            onChange={handleSelectOption}
          />
        </div>
        <GroupCheckbox className={classes.checkbox} handleGroupCheckboxClick={handleGroupCheckboxClick} margin={"0 auto"}/>
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
