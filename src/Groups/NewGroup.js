import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import PageContent from "../PageContent";
import Navbar from "../Navbar";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputState from "../Hooks/useFormState";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import styles from "../styles/NewGroupStyles";
import { LoggedInContext } from "../contexts/LoggedIn";
import { ThemeContext } from "../contexts/ThemeContext";
import { withStyles } from "@material-ui/core";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function NewGroup(props) {
  const history = useHistory();
  const { classes } = props;
  const { isDarkMode } = useContext(ThemeContext);
  const { token } = useContext(LoggedInContext);

  const [groupNameValue, handleGroupNameChange, resetGroupName] = InputState(
    ""
  );
  const [groupUrlValue, handleGroupUrlChange, resetGroupUrl] = InputState("");
  const [
    groupDescriptionValue,
    handleGroupDescriptionChange,
    resetGroupDescription
  ] = InputState("");

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
    history.push("/groups");
  };

  const handleNewGroupSubmit = e => {
    e.preventDefault();
    fetch(process.env.REACT_APP_SERVER + "groups", {
      body: JSON.stringify({
        name: groupNameValue,
        url: groupUrlValue,
        description: groupDescriptionValue
      }),
      headers: {
        "Content-Type": "application/json",
        Token: token
      },
      method: "POST"
    })
      .then(res => res.json())
      .then(data => {
        resetGroupName();
        resetGroupUrl();
        resetGroupDescription();
        handleSnackbarClick();
      });
  };
  return (
    <PageContent>
      <Navbar />
      <h1 className={classes.heading} style={{ color: isDarkMode && "white" }}>
        New Group
      </h1>
      <form
        className={classes.newForm}
        noValidate
        autoComplete="off"
        onSubmit={handleNewGroupSubmit}
      >
        <TextField
          required
          id="outlined-name"
          label="Facebook Group Name"
          variant="outlined"
          onChange={handleGroupNameChange}
          value={groupNameValue}
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
          id="outlined-url"
          label="Facebook Group URL"
          variant="outlined"
          style={{ color: isDarkMode && "white" }}
          onChange={handleGroupUrlChange}
          value={groupUrlValue}
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
          label="Facebook Group Description"
          variant="outlined"
          multiline={true}
          rows={4}
          rowsMax={8}
          onChange={handleGroupDescriptionChange}
          value={groupDescriptionValue}
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
            Add Group
          </Button>
        </div>
      </form>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="success">
          A new group was successfully added!
        </Alert>
      </Snackbar>
    </PageContent>
  );
}

export default withStyles(styles)(NewGroup);
