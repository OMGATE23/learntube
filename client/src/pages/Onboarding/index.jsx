import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../helpers/constants";

const Onboarding = () => {
  const CATEGORY_LIST = [
    "Business",
    "Finance",
    " Web dev",
    "AI/ML",
    "UX/UI",
    "Healthcare",
    "Biology",
    "Maths",
    "Science",
  ];
  const [isActive, setIsActive] = useState("");
  const { user } = useAuthContext();
  const navigate = useNavigate();

  async function submitCategoryHandler(){
    
    try {
      const user = JSON.parse(localStorage.getItem('user'))
  
      const response = await fetch(API_URL + "/user/category" , {
          method : 'PUT',
          body : JSON.stringify({
              userId : user._id,
              category : isActive
          }),
          headers: { 'Content-Type': 'application/json' },
      })
  
      const data = await response.json();
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/dashboard");
      return (data)
     } catch(err) {
      console.log(err)
     }
  }

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className=" h-screen flex justify-center items-center">
      <div className="w-[450px] h-[400px] outline outline-1 flex flex-col justify-center gap-12  rounded-3xl outline-white">
        <h1 className="text-3xl text-white font-semibold text-center">
          Please Select
        </h1>
        <div className="flex flex-wrap gap-x-8 gap-y-4 justify-center">
          {CATEGORY_LIST.map((el) => (
            <div
            key = {el}
              className={`transition-all duration-150 text-white text-md px-4 outline-1 outline outline-white py-2 rounded-xl ${
                isActive === el ? "bg-white text-purple-900" : "bg-transparent"
              } hover:cursor-pointer w-[25%] text-center`}
              onClick={() => {
                setIsActive(el);
              }}
            >
              {el}
            </div>
          ))}
          <button className="transition-all duration-150 text-white text-xl mt-4 outline-2 outline-white outline px-4 py-2 rounded-sm font-semibold hover:bg-white hover:text-purple-950" onClick={submitCategoryHandler}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
