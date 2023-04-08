import React from "react";
import { auth } from "../../config/firebase";

const Logout = () => {
  async function logout() {
    try {
      await auth.signOut();
      localStorage.clear();
    } catch (err) {
      console.log(err);
    }
  }

  return <div>Logout</div>;
};

export default Logout;
