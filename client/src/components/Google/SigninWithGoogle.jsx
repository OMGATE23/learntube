import React from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../config/firebase";

const provider = new GoogleAuthProvider();

const SigninWithGoogle = () => {
  async function signinWithGoogle() {
    const res = await signInWithPopup(auth, provider);
    const userBody = {
      name: res.user.displayName,
      email: res.user.email,
      displayPicture: res.user.photoURL,
    };
    console.log(userBody);
  }

  return <div onClick={signinWithGoogle}>SigninWithGoogle</div>;
};

export default SigninWithGoogle;
