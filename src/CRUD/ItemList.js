import React, { useContext, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import styles from "../styles/ItemListStyles";
import Item from "./Item";
import SearchBar from "material-ui-search-bar";
import { withStyles } from "@material-ui/core";

const initialPosts = [
  {
    image:
      "https://scontent-ort2-1.xx.fbcdn.net/v/t1.0-0/c0.223.640.640a/s261x260/50847910_605486903226885_8910116634320961536_o.jpg?_nc_cat=107&_nc_ohc=6mTr46fG9lYAQmQvhNyiRC5T5iSDtML4evboIf_2Nakr-Wqmiw3jULwIQ&_nc_ht=scontent-ort2-1.xx&_nc_tp=1&oh=9396a5cf9144b90637a35ddf8a1d59ac&oe=5E8E8C89",
    name: "Storage Cube",
    price: "$20",
    views: "111"
  },
  {
    image:
      "https://scontent-ort2-1.xx.fbcdn.net/v/t1.0-0/c0.79.720.720a/s261x260/56255334_643975259378049_3194126964256407552_n.jpg?_nc_cat=110&_nc_ohc=n2rIEc-XvRsAQkvfKCG618SJVLUf_qxDXlQgVEkINdlNSvcLNAwi0E3MQ&_nc_ht=scontent-ort2-1.xx&_nc_tp=1&oh=ee8ae1a6f7a877d01fe47e7cc7db1729&oe=5E94BDEC",
    name: "Bench",
    price: "$30",
    views: "657"
  },
  {
    image:
      "https://scontent-ort2-1.xx.fbcdn.net/v/t1.0-0/c0.79.720.720a/s261x260/75472750_795138567595050_665782122006446080_n.jpg?_nc_cat=111&_nc_ohc=kknavwIS3K0AQlkbfCuOeJ820dePWBUp2FbQJBR0PXdL__IG8Q7PUi2_w&_nc_ht=scontent-ort2-1.xx&_nc_tp=1&oh=b5b244104fc85e36019da7266f34336c&oe=5E90DCE6",
    name: "Purple Chair",
    price: "$60",
    views: "76"
  }
];

function ItemList(props) {
  const [value, setValue] = useState("");
  const { isDarkMode } = useContext(ThemeContext);
  const { classes } = props;
  const handleChange = e => {
    setValue(e.target.value);
  };
  const reset = () => {
    setValue("");
  };
  return (
    <div className={classes.root}>
      <div className={classes.secondary}>
        <div
          className={`${classes.header} ${
            isDarkMode ? classes.darkText : classes.lightText
          }`}
        >
          Items List
        </div>
        <form
          onSubmit={e => {
            e.preventDefault();

            reset();
          }}
        >
          <SearchBar
            value={value}
            onChange={handleChange}
            onRequestSearch={() => console.log(this.state.value)}
            className={isDarkMode && classes.bgDark}
          />
        </form>
      </div>
      <div className={classes.holder}>
        <div
          className={`${classes.table} ${
            isDarkMode ? classes.bgDark : classes.bgLight
          }`}
        >
          <div>
            Picture <i className="fas fa-sort-down"></i>
          </div>
          <div>
            Name <i className="fas fa-sort-down"></i>
          </div>
          <div>
            Price <i className="fas fa-sort-down"></i>
          </div>
          <div>
            Views <i className="fas fa-sort-down"></i>
          </div>
          <div>Actions</div>
        </div>
        {initialPosts.map(item => {
          return (
            <Item
              image={item.image}
              name={item.name}
              price={item.price}
              views={item.views}
            />
          );
        })}
      </div>
    </div>
  );
}

export default withStyles(styles)(ItemList);
