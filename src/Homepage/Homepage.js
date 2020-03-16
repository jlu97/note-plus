import React from "react";
import "../App.css";
import SignedIn from "./SignedIn";
import NotSignedIn from "./NotSignedIn";
import AuthContext from "../AuthContext.js"
import {useContext} from 'react';

function Homepage(){
  const context = useContext(AuthContext);

  if (context.isLoggedIn) {
    return <SignedIn />;
  }
  return <NotSignedIn />;
}

export default Homepage;
