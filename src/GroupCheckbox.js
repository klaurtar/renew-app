import React, { useState, useEffect, useContext } from "react";
import { LoggedInContext } from "./contexts/LoggedIn";
import { withStyles } from "@material-ui/core";

const styles = {
  root: {
    borderRadius: "15px",
    padding: "1rem",
    backgroundColor: "rgb(93, 58, 255)",
    width: "400px",
    boxShadow: "10px 10px 5px -5px rgba(0,0,0,0.25)"
  },
  group_header: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: "2rem"
  },
  specific_group: {
    margin: ".5rem 0"
  }
};

function GroupCheckbox(props) {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(LoggedInContext);
  const { classes } = props;

  useEffect(() => {
    fetch("http://localhost:8181/groups", {
      headers: {
        "Content-Type": "application/json",
        Token: token
      }
    })
      .then(res => res.json())
      .then(data => {
        setGroups(data.data);
        setLoading(false);
      });
  }, [token]);

  return (
    <div className={classes.root} style={{margin: `${props.margin}`}}>
      <div className={classes.group_header}>Groups</div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        groups.map(x => {
          return (
            <div className={classes.specific_group} key={x._id}>
              <input
                type="checkbox"
                id={x._id}
                name={x.name}
                onChange={props.handleGroupCheckboxClick}
              />
              <label htmlFor={x.name}>{x.name}</label>
            </div>
          );
        })
      )}
    </div>
  );
}

export default withStyles(styles)(GroupCheckbox);
