import React from 'react';
import '../App.css';
import { Link } from "react-router-dom";

function SignedIn(){
  const favorites = ["Programming Languages"]
  const favCourses = favorites.map((fav) =>
    <li key={fav.toString()}>
      <Link to="/course">
        {fav}
      </Link>
    </li>
  )

  return (
    <div>
      <h3>Favorite Courses</h3>
      <ul>{favCourses}</ul>
    </div>
  )
}

export default SignedIn;
