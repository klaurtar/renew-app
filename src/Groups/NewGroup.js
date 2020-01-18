import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import PageContent from "../PageContent";
import Navbar from "../Navbar";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputState from "../Hooks/useFormState";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { LoggedInContext } from "../contexts/LoggedIn";
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
    height: "300px"
  },
  buttons: {
    display: "flex",
    justifyContent: "space-between"
  }
};

function NewGroup(props) {
  const history = useHistory();
  const { classes } = props;
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
  }

  const handleSnackbarClose = (event, reason) => {
      if (reason === 'clickaway') {
          return;
      }

      setOpen(false);
  }

  const goBackButton = () => {
    history.push("/groups");
  };

  const handleNewGroupSubmit = e => {
    e.preventDefault();
    fetch("http://localhost:8181/groups", {
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
    .then((res) => res.json())
    .then((data) => {
        resetGroupName();
        resetGroupUrl();
        resetGroupDescription();
        handleSnackbarClick();
    })
  };
  return (
    <PageContent>
      <Navbar />
      <h1 className={classes.heading}>New Group</h1>
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
        />
        <TextField
          required
          id="outlined-url"
          label="Facebook Group URL"
          variant="outlined"
          onChange={handleGroupUrlChange}
          value={groupUrlValue}
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
      <Snackbar open={open} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success">
          A new group was successfully added!
        </Alert>
      </Snackbar>
    </PageContent>
  );
}

export default withStyles(styles)(NewGroup);
