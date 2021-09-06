//jshint esversion:6
import "./Register.css";
import Input from "../components/Input";
import { Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import SubmitButton from "../components/SubmitButton";
import Loader from "../components/Loader";
import ErrorBox from "../components/ErrorBox";
import { useStateValue } from "./StateProvider";
import { change_wallpaper } from "./Utils";
const axios = require("axios");

//validate the inputs of users
function validate_input(Email, FirstName, LastName, Password) {
  return new Promise((resolve, reject) => {
    let message = "";
    if (Email != null || "") {
      //regex for validating the emails
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(Email)) {
        message = message + "Enter the valid Email address<br/>";
      }
    } else {
      message = message + "Enter Email address<br/>";
    }
    if (FirstName == null || FirstName === "") {
      message = message + "Enter First Name<br/>";
    }
    else if (LastName == null || FirstName ===  "") {
      message = message + "Enter Last Name<br/>";
    }
    else if (Password == null || FirstName ===  "") {
      message = message + "Enter password<br/>";
    }

    //if there is no message i.e. no problem with the inputs then promise is resolved
    if (message === "") resolve();
    else reject(message);
  });
}

function Register() {
  var [FirstName, setFirstName] = useState();
  var [LastName, setLastName] = useState();
  var [Email, setEmail] = useState();
  var [loading,setLoading] = useState(false);
  var [Password, setPassword] = useState();
  const history = useHistory();
  const [user, setUser,,PageError,setPageError] = useStateValue();

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    validate_input(Email, FirstName, LastName, Password)
      .then(() => {
        document.getElementById("register_message").innerHTML = "";
        axios
          .post(
            process.env.REACT_APP_API_DOMAIN + "/signup",
            {
              // username: Username,
              username: Email,
              firstName: FirstName,
              lastName: LastName,
              password: Password,
            },
            { withCredentials: true }
          )
          .then(function (response) {
            history.push("/");
            setUser(response.data);
          })
          .catch((err) => {
            document.getElementById("register_message").innerHTML =
              "An Error has occured";
              setPageError({status:err.response.status,message:err.response.data})
              // console.log({err});
              setLoading(false);
          });
      })
      .catch((err) => {
        document.getElementById("register_message").innerHTML = err;
        setLoading(false);
      });
  }
  useEffect(() => {
    let isCancelled = false;
    const runAsync = async () => {
      try {
        if (!isCancelled) {
          setLoading(true);
          if(document.getElementById("register_").style.backgroundImage === ""){
            await change_wallpaper("sign","register_");
        }
            setLoading(false);
        }
      } catch (e) {
        if (!isCancelled) {
          console.log(e)
        }
      }
    };
  
    runAsync();
    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <div id="register_">
    <Loader loading={loading} />
    <ErrorBox />
      <div className="register_form_back">
        <h1 className="register_heading">Register</h1>
        <div className="register_input_elements">
          <form onSubmit={handleSubmit}>
            <p id="register_message"></p>
            <Input set_state={setFirstName} placeholder="First Name"></Input>
            <Input set_state={setLastName} placeholder="Last Name"></Input>
            <Input set_state={setEmail} placeholder="Email"></Input>
            <Input
              type="password"
              set_state={setPassword}
              placeholder="Password"
            ></Input>
            <SubmitButton text="Register" />
          </form>
        </div>
        <Link className="register_link" to="/">
          Home Page
        </Link>
        <Link className="register_link" to="/signin">
          Sign In
        </Link>
      </div>
    </div>
  );
}

export default Register;
