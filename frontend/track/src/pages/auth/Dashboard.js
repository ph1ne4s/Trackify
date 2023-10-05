import React from "react";
import { auth } from "../../firebase";

function Dashboard() {
  const user = auth.currentUser;

  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h2>Welcome, {user ? user.email : "Guest"}!</h2>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
}

export default Dashboard;
