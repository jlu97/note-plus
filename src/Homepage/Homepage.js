import React from 'react';
import '../App.css';
import SignedIn from './SignedIn';
import NotSignedIn from './NotSignedIn';

function Homepage() {
  const isLoggedIn = true;

  if (isLoggedIn) {
    return <SignedIn />;
  }
  return <NotSignedIn />;
}

export default Homepage;
