import React from "react";
import { auth, googleProvider } from "../../firebase";

function GoogleRegister() {
  const handleGoogleSignIn = async () => {
    try {
      await auth.signInWithPopup(googleProvider);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h2>Register with Google:</h2>
      <button onClick={handleGoogleSignIn}>Register with Google</button>
    </div>
  );
}

export default GoogleRegister;
