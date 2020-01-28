import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import PageContent from "../PageContent";
import Navbar from "../Navbar";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import GroupCheckbox from "../GroupCheckbox";
import { LoggedInContext } from "../contexts/LoggedIn";
import { ThemeContext } from "../contexts/ThemeContext";
import styles from "../styles/EditItemStyles.js";
import { withStyles } from "@material-ui/core";
import Categories from "../Utilities/Category_List";
import Select from "react-select";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function EditItem(props) {
  const history = useHistory();
  const { classes } = props;
  const { isDarkMode } = useContext(ThemeContext);
  const { token } = useContext(LoggedInContext);

  const [itemNameValue, setItemName] = useState("");
  const [itemPriceValue, setItemPrice] = useState("");
  const [itemDescriptionValue, setItemDescription] = useState("");
  const [fileState, setFileState] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectOption, setSelectOption] = useState(null);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleItemNameChange = e => {
    setItemName(e.target.value);
  };
  const handlePriceChange = e => {
    setItemPrice(e.target.value);
  };
  const handleItemDescriptionChange = e => {
    setItemDescription(e.target.value);
  };
  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER}items/${props.match.params.id}`, {
      headers: {
        "Content-Type":
          "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW",
        Token: token
      }
    })
      .then(res => res.json())
      .then(data => {
        setItemName(data.data.title);
        setItemPrice(data.data.price);
        setItemDescription(data.data.description);
        setFileState(data.data.photos);
        setSelectOption(data.data.category);
        setSelectedGroups(data.data.groups);
        setLoading(false);
        console.log(data.data);
        console.log("Data Fetch was successful");
      });
  }, [props.match.params.id, token]);

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

  const handleSelectOption = selectOption => {
    setSelectOption(selectOption);
    console.log(selectOption);
  };

  const handleGroupCheckboxClick = event => {
    let checkId = event.target.id;
    setSelectedGroups([...selectedGroups, checkId]);
    console.log(selectedGroups);
  };

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

    fetch(process.env.REACT_APP_SERVER + "items", {
      body: formData,
      headers: {
        //"Content-Type": "application/json",
        Token: token
      },
      method: "PUT"
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        handleSuccessSnackbarClick();
      })
      .catch(error => console.log(error));
  };

  return (
    <PageContent>
      <Navbar />
      <h1 className={classes.heading} style={{ color: isDarkMode && "white" }}>
        Edit Item
      </h1>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
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
            <input type="file" onChange={handleFileUpload} multiple />
            <Select
              options={Categories}
              placeholder="Category"
              className={classes.select}
              value={selectOption}
              onChange={handleSelectOption}
            />
          </div>
          <GroupCheckbox
            className={classes.checkbox}
            handleGroupCheckboxClick={handleGroupCheckboxClick}
            margin={"0 auto"}
          />
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
              style={{
                width: "20%",
                color: "green",
                border: "1px solid green"
              }}
            >
              Update Item
            </Button>
          </div>
        </form>
      )}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="success">
          The item was successfully added!
        </Alert>
      </Snackbar>
    </PageContent>
  );
}

export default withStyles(styles)(EditItem);
