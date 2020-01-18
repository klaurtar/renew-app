import React, { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import styles from "../styles/GroupListStyles";
import GroupItem from "./GroupItem";
import { LoggedInContext } from "../contexts/LoggedIn";
import { withStyles } from "@material-ui/core";

function GroupList(props) {
  // const [value, setValue] = useState("");
  const [groupsState, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isDarkMode } = useContext(ThemeContext);
  const { token } = useContext(LoggedInContext);
  const { classes } = props;
  // const handleChange = e => {
  //   setValue(e.target.value);
  // };
  // const reset = () => {
  //   setValue("");
  // };

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
  }, []);

  console.log(groupsState);
  const handleClick = (groupId) => {
    function removeGroup(groupId) {
      setGroups(groupsState.filter(el => el._id !== groupId));
    }
    fetch("http://localhost:8181/groups/" + groupId, {
      headers: {
        "Content-Type": "application/json",
        Token: token
      },
      method: "DELETE"
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
      console.log(data.data)
      removeGroup(groupId);
      })
  };
  return (
    <div className={classes.root}>
      <div className={classes.holder}>
        <div
          className={`${classes.table} ${
            isDarkMode ? classes.bgDark : classes.bgLight
          }`}
        >
          <div>
            Name <i className="fas fa-sort-down"></i>
          </div>
          <div>
            URL <i className="fas fa-sort-down"></i>
          </div>
          <div>
            Description <i className="fas fa-sort-down"></i>
          </div>

          <div>Actions</div>
        </div>

        {loading ? (
          <h1>Loading...</h1>
        ) : (
          groupsState.map(group => {
            return (
              <GroupItem
                name={group.name}
                url={group.url}
                description={group.description}
                id={group._id}
                key={group.name}
                handleClick={handleClick}
              />
            );
          })
        )}
      </div>
    </div>
  );
}

export default withStyles(styles)(GroupList);
