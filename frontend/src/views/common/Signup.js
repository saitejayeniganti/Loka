import React, { useEffect, useState } from "react";
import { get } from "../../utils/serverCall";

function Signup() {
  const [user, setUser] = useState(null);
  const getUser = async () => {
    get("/auth/loggedUser")
      .then((response) => {
        // set user
      })
      .catch((error) => {
        // nothing
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <h1>This is Signup page.</h1>
      <h1>This is Signup page.</h1>
      <h1>This is Signup page.</h1>
    </div>
  );
}

export default Signup;
