import React, { useEffect, useState } from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../config/firebase";
import { API_URL } from "../../helpers/constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

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
        JSON.stringify({ ...apiRes.data.user, avatarUrl: userBody.displayPicture })
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
    <div className=" h-[100vh] flex justify-center items-center">
      <div className="flex flex-col justify-center shadow-xl rounded-2xl w-[350px] h-[400px] text-center gap-8 mb-4">
        <div>
          <h1 className="text-3xl font-bold">Sign In</h1>
          <p className="">Join YouTube Courses</p>
        </div>

        {!loading && (
          <button
            onClick={signinWithGoogle}
            className=" block mt-12 transition-all duration-200 border-2 w-fit py-2 px-4 text-lg font-semibold border-gray-800 rounded-2xl mx-auto hover:text-white hover:bg-blue-600 hover:border-blue-600"
          >
            Sign In with Google
          </button>
        )}
        {loading && (
          <button
            disabled
            className="block bg-gray-300 mt-12 transition-all duration-200 border-2 w-fit py-2 px-4 text-lg font-semibold rounded-2xl mx-auto cursor-not-allowed"
          >
            Signing in ...
          </button>
        )}

        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    </div>
  );
};

export default SignIn;
