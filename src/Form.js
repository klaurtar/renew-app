import React, { useContext, useState } from "react";
// import { Redirect } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
// import SignUp from './SignUp';
import withStyles from "@material-ui/core/styles/withStyles";
import styles from "./styles/FormStyles";
import { LoggedInContext } from "./contexts/LoggedIn";
import { ThemeContext } from "./contexts/ThemeContext";
import Cookies from "js-cookie";

function Form(props) {
  // let _isMounted = false;
  const { isDarkMode } = useContext(ThemeContext);
  const { changeLogIn, setToken } = useContext(LoggedInContext);
  const [isSignUp, setSignUp] = useState(false);
  const { classes } = props;

  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const handleUsernameChange = e => {
    setUsernameValue(e.target.value);
  };
  const handlePasswordChange = e => {
    setPasswordValue(e.target.value);
  };
  // const [value, setValue] = useState(initialVal);
  //   const handleChange = (e) => {
  //       setValue(e.target.value);
  //   };

  const handleClick = () => {
    setSignUp(!isSignUp);
  };
  const reset = () => {
    setUsernameValue("");
    setPasswordValue("");
  };

  // useEffect(() => {
  //   _isMounted = true;
  // }, []);

  const authSubmitHandler = event => {
    event.preventDefault();

    if (!isSignUp) {
      try {
        fetch(process.env.REACT_APP_SERVER + "auth", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: usernameValue,
            password: passwordValue
          })
        })
          .then(res => res.json())
          .then(responseData => {
            if (responseData.data.sign_in) {
              console.log("Successful sign in");
              console.log(responseData);
              setToken(responseData.data.token);
              Cookies.set("token", responseData.data.token);
              changeLogIn(true);
            }
          });
        // const response = await fetch(process.env.REACT_APP_SERVER + "auth", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json"
        //   },
        //   body: JSON.stringify({
        //     username: usernameValue,
        //     password: passwordValue
        //   })
        // });

        // const responseData = await response.json();
        // if (responseData.data.sign_in) {
        //   console.log("Successful sign in");
        //   setToken(responseData.data.token);
        //   Cookies.set("token", responseData.data.token);
        //   changeLogIn(true);
        //   reset();
        // }
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        fetch(process.env.REACT_APP_SERVER + "auth", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: usernameValue,
            password: passwordValue
          })
        })
          .then(res => res.json())
          .then(responseData2 => {
            if (responseData2.data) {
              console.log("Successful Sign Up");
              console.log(responseData2.data);
              Cookies.set("token", responseData2.data.token);
              reset();
            }
          });
        // const response2 = await fetch(process.env.REACT_APP_SERVER + "auth", {
        //   method: "PUT",
        //   headers: {
        //     "Content-Type": "application/json"
        //   },
        //   body: JSON.stringify({
        //     username: usernameValue,
        //     password: passwordValue
        //   })
        // });

        // const responseData2 = await response2.json();
        // if (responseData2.data) {
        //   console.log("Successful Sign Up");
        //   Cookies.set("token", responseData2.data.token);
        //   reset();
        // }
        // console.log(responseData2.data);
      } catch (err) {
        console.log(err);
      }
    }
  };

  // useEffect(() => {
  //   return () => {
  //     _isMounted = false;
  //   };
  // }, []);
  //   if (loggedIn) {
  //     return <Redirect to="/items" />;
  // }

  return (
    <main className={classes.main}>
      {!isSignUp ? (
        <Paper
          className={classes.paper}
          style={{ background: isDarkMode ? "#2E3B55" : "white" }}
        >
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5">Sign In</Typography>
          <form className={classes.form} onSubmit={authSubmitHandler}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="username">Username</InputLabel>
              <Input
                id="username1"
                name="username1"
                value={usernameValue}
                onChange={handleUsernameChange}
                autoFocus
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                id="password"
                name="password"
                type="password"
                value={passwordValue}
                onChange={handlePasswordChange}
                autoFocus
              />
            </FormControl>

            <Button
              variant="contained"
              type="submit"
              fullWidth
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
          </form>
          <Button
            variant="contained"
            type="submit"
            fullWidth
            color="secondary"
            className={classes.submit}
            onClick={handleClick}
          >
            Switch to Sign up
          </Button>
        </Paper>
      ) : (
        <Paper
          className={classes.paper}
          style={{ background: isDarkMode ? "#2E3B55" : "white" }}
        >
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon color="primary" />
          </Avatar>
          <Typography variant="h5">Sign Up</Typography>
          <form className={classes.form} onSubmit={authSubmitHandler}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="username">Username</InputLabel>
              <Input
                id="username2"
                name="username"
                value={usernameValue}
                onChange={handleUsernameChange}
                autoFocus
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                id="password"
                name="password"
                type="password"
                value={passwordValue}
                onChange={handlePasswordChange}
                autoFocus
              />
            </FormControl>

            <Button
              variant="contained"
              type="submit"
              fullWidth
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
          </form>
          <Button
            variant="contained"
            type="submit"
            fullWidth
            color="secondary"
            className={classes.submit}
            onClick={handleClick}
          >
            Switch to Sign In
          </Button>
        </Paper>
      )}
    </main>
  );
}

// class Form extends Component {
//   static contextType = LanguageContext;
//   render() {

//     return (

//     );
//   }
// }
export default withStyles(styles)(Form);
