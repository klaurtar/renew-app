import React, { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { LoggedInContext } from "../contexts/LoggedIn";
import styles from "../styles/ItemListStyles";
import Item from "./Item";
import SearchBar from "material-ui-search-bar";
import { withStyles } from "@material-ui/core";


// const initialPosts = [
//   {
//     image:
//       "https://scontent-ort2-1.xx.fbcdn.net/v/t1.0-0/c0.223.640.640a/s261x260/50847910_605486903226885_8910116634320961536_o.jpg?_nc_cat=107&_nc_ohc=6mTr46fG9lYAQmQvhNyiRC5T5iSDtML4evboIf_2Nakr-Wqmiw3jULwIQ&_nc_ht=scontent-ort2-1.xx&_nc_tp=1&oh=9396a5cf9144b90637a35ddf8a1d59ac&oe=5E8E8C89",
//     name: "Storage Cube",
//     price: "$20",
//     views: "111"
//   },
//   {
//     image:
//       "https://scontent-ort2-1.xx.fbcdn.net/v/t1.0-0/c0.79.720.720a/s261x260/56255334_643975259378049_3194126964256407552_n.jpg?_nc_cat=110&_nc_ohc=n2rIEc-XvRsAQkvfKCG618SJVLUf_qxDXlQgVEkINdlNSvcLNAwi0E3MQ&_nc_ht=scontent-ort2-1.xx&_nc_tp=1&oh=ee8ae1a6f7a877d01fe47e7cc7db1729&oe=5E94BDEC",
//     name: "Bench",
//     price: "$30",
//     views: "657"
//   },
//   {
//     image:
//       "https://scontent-ort2-1.xx.fbcdn.net/v/t1.0-0/c0.79.720.720a/s261x260/75472750_795138567595050_665782122006446080_n.jpg?_nc_cat=111&_nc_ohc=kknavwIS3K0AQlkbfCuOeJ820dePWBUp2FbQJBR0PXdL__IG8Q7PUi2_w&_nc_ht=scontent-ort2-1.xx&_nc_tp=1&oh=b5b244104fc85e36019da7266f34336c&oe=5E90DCE6",
//     name: "Purple Chair",
//     price: "$60",
//     views: "76"
//   }
// ];

function ItemList(props) {
  const [value, setValue] = useState("");
  const [itemsState, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isDarkMode } = useContext(ThemeContext);
  const { token } = useContext(LoggedInContext);
  const { classes } = props;

  useEffect(() => {
    // const body = new FormData();
    // body.append("title", "Test Title\n");
    // body.append("", "\\");
    // body.append("description", "This is a sample item description");
    // body.append("", "\\");
    // body.append("price", "30");
    // body.append("", "\\");
    // body.append(
    //   "photos",
    //   "@/Users/ryantalbert/Desktop/Tires/79757528_818030245305882_7920912265061072896_n.jpg"
    // );
    // body.append("", "\\");
    // body.append(
    //   "photos",
    //   "@/Users/ryantalbert/Desktop/Tires/79773529_818030331972540_617020722639798272_n.jpg"
    // );
    // body.append("", "\\");
    // body.append(
    //   "photos",
    //   "@/Users/ryantalbert/Desktop/Tires/80438197_818030358639204_1005540827126038528_n.jpg"
    // );
    // body.append("", "\\");
    // body.append(
    //   "groups",
    //   ' [\n        "5e238c027c25620386bd8ceb",\n        "5e23728a7c25620386bd8ce5"\n    ]'
    // );

    fetch("http://localhost:8181/items", {
      headers: {
        "Content-Type":
          "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW",
        Token:
          token
      }
    })
      .then(res => res.json())
      .then(data => {
        setItems(data.data.items);
        setLoading(false);
      });
  }, [token]);

  const handleChange = e => {
    setValue(e.target.value);
  };
  const reset = () => {
    setValue("");
  };

  const removeItem = (itemId) => {
    setItems(items => items.filter(el => el._id !== itemId));
  }

  const handleDeleteItemClick = (itemId) => {
    fetch("http://localhost:8181/items/" + itemId, {
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
      removeItem(itemId);
      })
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
            // className={isDarkMode && classes.bgDark}
          />
        </form>
      </div>
      <div className={classes.holder}>
        <div
          className={`${classes.table} ${
            isDarkMode ? classes.bgDark : classes.bgLight
          }`}
        >
          <div style={{width: "16.6666%", textAlign: "center"}}>
            Picture <i className="fas fa-sort-down"></i>
          </div>
          <div style={{width: "16.6666%", textAlign: "center"}}>
            Name <i className="fas fa-sort-down"></i>
          </div>
          <div style={{width: "16.6666%", textAlign: "center"}}>
            Price <i className="fas fa-sort-down"></i>
          </div>
          <div style={{width: "16.6666%", textAlign: "center"}}>
            Views <i className="fas fa-sort-down"></i>
          </div>
          <div style={{width: "16.6666%", textAlign: "center"}}>
            Description <i className="fas fa-sort-down"></i>
          </div>
          <div style={{width: "16.6666%", textAlign: "center"}}>Actions</div>
        </div>
        {loading ? <h1>Loading...</h1> :
        itemsState.map(item => {
          return (
            <Item
              image={item.photos[0]}
              name={item.title}
              price={item.price}
              views={item.views}
              description={item.description}
              handleDeleteItemClick={handleDeleteItemClick}
              id={item._id}
              key={item._id}
            />
          );
        })}
      </div>
    </div>
  );
}

export default withStyles(styles)(ItemList);
