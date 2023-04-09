import React, { useEffect, useState } from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../config/firebase";
import { API_URL } from "../../helpers/constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import Navbar from "../../components/Navbar";

const provider = new GoogleAuthProvider();

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const { user } = useAuthContext();

  const navigate = useNavigate();

  async function signinWithGoogle() {
    setLoading(true);
    setError();
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

      localStorage.setItem(
        "user",
        JSON.stringify({
          ...apiRes.data.user,
          avatarUrl: userBody.displayPicture,
        })
      );

      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      setError("Something went wrong :(");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user]);

  return (
    <>
      <Navbar />
      <div className=" h-[90vh] flex justify-center items-center text-white">
        <div className="flex flex-col justify-center items-center shadow-xl rounded-2xl w-[400px] text-center gap-4 py-8 border border-gray-500 bg-base-100/10 bg-gradient-to-r from-transparent to-base-100/50">
          <img src="./logo.png" alt="" width="70" height="70" />
          <div>
            <h1 className="text-4xl font-semibold">Sign In</h1>
            <p className="text-sm mt-2">To LearnTube</p>
          </div>

          {!loading && (
            <button
              onClick={signinWithGoogle}
              className=" block mt-4 transition-all duration-200 border-2 w-fit py-2 px-6 text-lg font-normal border-gray-800 rounded-md mx-auto hover:text-white hover:bg-blue-600 hover:border-blue-600"
            >
              <img
                src="./googleicon.png"
                width="20"
                height="20"
                className="inline-block mr-3"
              />
              Sign In with Google
            </button>
          )}
          {loading && (
            <button
              disabled
              className="block bg-gray-300 mt-4 transition-all duration-200 border-2 w-fit py-2 px-6 text-lg font-normal rounded-md mx-auto cursor-not-allowed"
            >
              <img src="./googleicon.png" width="20" height="20" />
              Signing in ...
            </button>
          )}

          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
      </div>
    </>
  );
};

export default SignIn;
