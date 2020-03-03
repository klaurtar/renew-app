import React, { useContext, useState, useEffect } from "react";
import FbItem from "./FbItem";
import { ThemeContext } from "../contexts/ThemeContext";
import styles from "../styles/FacebookItemListStyles";
import { LoggedInContext } from "../contexts/LoggedIn";
import { withStyles } from "@material-ui/core";

function FacebookItemList(props) {
  const [facebookItemState, setFacebookItem] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isDarkMode } = useContext(ThemeContext);
  const { token } = useContext(LoggedInContext);
  const { classes } = props;

  useEffect(() => {
    fetch(process.env.REACT_APP_SERVER + "fbitems", {
      headers: {
        "Content-Type": "application/json",
        Token: token
      }
    })
      .then(res => res.json())
      .then(data => {
        setFacebookItem(data.data);
        setLoading(false);
      });
  }, [token]);

  const removefbItem = (fbItemId) => {
    setFacebookItem(fbItems => fbItems.filter(el => el._id !== fbItemId));
  }

  console.log(facebookItemState);
  const handleDeletefbItemClick = (fbItemId) => {
    fetch(process.env.REACT_APP_SERVER + "fbitems/" + fbItemId, {
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
      removefbItem(fbItemId);
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
            Facebook ID <i className="fas fa-sort-down"></i>
          </div>
          <div>
             Item ID <i className="fas fa-sort-down"></i>
          </div>
          <div>
            URL <i className="fas fa-sort-down"></i>
          </div>
          <div>
            Published On <i className="fas fa-sort-down"></i>
          </div>

          <div>Actions</div>
        </div>

        {loading ? (
          <h1>Loading...</h1>
        ) : (
          facebookItemState.map(fbItem => {
            return (
              <FbItem
                id={fbItem._id}
                itemId={fbItem.item_id}
                url={fbItem.url}
                publishedAt={fbItem.published_at}
                key={fbItem._id}
                handleDeleteFbItemClick={handleDeletefbItemClick}
              />
            );
          })
        )}
      </div>
    </div>
  );
}

export default withStyles(styles)(FacebookItemList);
