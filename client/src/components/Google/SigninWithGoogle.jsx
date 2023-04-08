import React from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../config/firebase";
import { API_URL } from "../../helpers/constants";
import axios from "axios";

const provider = new GoogleAuthProvider();

const SigninWithGoogle = () => {
  async function signinWithGoogle() {
    try {
      const res = await signInWithPopup(auth, provider);
      const userBody = {
        name: res.user.displayName,
        email: res.user.email,
        displayPicture: res.user.photoURL,
      };
      const apiRes = await axios.post(`${API_URL}/user/signin`, {
        email: userBody.email,
        name: userBody.name,
      });

      console.log(apiRes);

      localStorage.setItem(
        "user",
        JSON.stringify({ ...apiRes.data, avatarUrl: userBody.displayPicture })
      );
    } catch (err) {
      console.log(err);
    }
  }

  return <div onClick={signinWithGoogle}>SigninWithGoogle</div>;
};

export default SigninWithGoogle;
