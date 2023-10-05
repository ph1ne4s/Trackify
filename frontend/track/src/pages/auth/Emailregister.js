import React, { useState } from "react";
import { auth } from "../../firebase";

function EmailPasswordRegister() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailPasswordRegister = async () => {
    try {
      await auth.createUserWithEmailAndPassword(email, password);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h2>Register with Email/Password:</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleEmailPasswordRegister}>Register</button>
    </div>
  );
}

export default EmailPasswordRegister;
