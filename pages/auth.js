import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

const uiConfig = {
  signInFlow: "popup",
  signInSuccessUrl: "/",
  // signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
};

function SignInScreen() {
  return (
    <div className="max-w-md bg-[#e61e4d] flex flex-col justify-center items-center">
      <h1>Vacation Rental Login</h1>
      {/* <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} /> */}
    </div>
  );
}

export default SignInScreen;
