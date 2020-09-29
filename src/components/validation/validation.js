import React from "react";

export const checkEmail = (email) => {
  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (re.test(email)) {
    // this is a valid email address
    // call setState({email: email}) to update the email
    // or update the data in redux store.
    console.log("This is a valid email address format: ", email);
    return true;
  } else return false;
};
