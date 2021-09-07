//jshint esversion:6
import "./Signin.css";
import Input from "../components/Input";
import { Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import SubmitButton from "../components/SubmitButton";
import Loader from "../components/Loader";
import ErrorBox from "../components/ErrorBox";
import { useStateValue } from "./StateProvider";
import { change_wallpaper, download_image } from "./Utils";
const axios = require("axios");

//validate the inputs of users
function validate_input(Email, Password) {
  return new Promise((resolve, reject) => {
    let message = "";
    if (Email != null && Email!="") {
      //regex for validating the emails
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(Email)) {
        message = message + "Enter the valid Email address<br/>";
      }
    } else {
      message = message + "Enter Email address<br/>";
    }
    if (Password == null || Password=="") {
      message = message + "Enter password<br/>";
    }

    //if there is no message i.e. no problem with the inputs then promise is resolved
    if (message === "") resolve();
    else reject(message);
  });
}

function Signin() {
  var [Email, setEmail] = useState();
  var [Password, setPassword] = useState();
  var [loading,setLoading] = useState(true);
  const history = useHistory();
  const [user, setUser,,PageError,setPageError] = useStateValue();

  useEffect(() => {
    let isCancelled = false;
    const runAsync = async () => {
      try {
        if (!isCancelled) {
          if(document.getElementById("sign_in_").style.backgroundImage === ""){
              await change_wallpaper("sign","sign_in_");
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

  function handleSubmit(e){
    e.preventDefault();
    setLoading(true);
    validate_input(Email, Password)
      .then(() => {
        document.getElementById("sign_in_message").innerHTML = "";
        axios
          .post(
            process.env.REACT_APP_API_DOMAIN + "/login",
            {
              username: Email,
              password: Password,
            },
            { withCredentials: true }
          )
          .then(function (response) {
            history.push("/");
            setUser(response.data);
          })
          .catch((err) => {
            document.getElementById("sign_in_message").innerHTML =
              "An Error has occured";
              setPageError({status:err.response.status,message:"Invalid Username or Password"});
              // console.log(err.response.status);
              setLoading(false);
          });
      })
      .catch((err) => {
        document.getElementById("sign_in_message").innerHTML = err;
        setLoading(false);
      });
  }

  return (
    <div
      id="sign_in_"

    ><Loader loading={loading} />
        <ErrorBox />
      <div className="sign_in_form_back">
        <h1 className="sign_in_heading">Sign in</h1>
        <div className="sign_in_input_elements">
          <form onSubmit={handleSubmit} >
            <p id="sign_in_message"></p>
            <Input set_state={setEmail} placeholder="Email"></Input>
            <Input
              type="password"
              set_state={setPassword}
              placeholder="Password"
            ></Input>
            <SubmitButton text="Sign In" />
          </form>
        </div>
        <Link className="sign_in_link" to="/">
          Home Page
        </Link>
        <Link className="sign_in_link" to="/register">
          Register
        </Link>
      </div>
    </div>
  );
}

export default Signin;
