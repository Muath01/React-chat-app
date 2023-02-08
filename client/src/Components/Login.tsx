import React, { useState } from "react";
import { Link } from "react-router-dom";
import SignUp from "./SignUp";
import { useDispatch } from "react-redux";
import { setLoggedUser } from "../Redux/message";

function Login({
  setLoginSucceful,
}: {
  setLoginSucceful: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [signUp, setSignUp] = useState(false);

  const dispatch = useDispatch();

  async function checkLogin(e: any) {
    e.preventDefault();
    try {
      const body = { userName, password };
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await response.json();

      if (data == "fail") {
        setLoginSucceful(false);
      } else {
        // console.log("here");
        dispatch(setLoggedUser(userName));
        localStorage.setItem("logged", userName);
        setLoginSucceful(true);
      }

      // console.log(data);
    } catch (err: any) {
      console.log(err.message);
    }
  }

  return (
    <>
      {signUp ? (
        <SignUp signUp={signUp} setSignUp={setSignUp} />
      ) : (
        <div className="flex justify-center border-2 w-full h-full items-center ">
          {/* <div className=""> */}
          <div className="space-y-4 md:space-y-6 sm:p-8 border-2 w-2/4 h-3/4 flex flex-col justify-center">
            <h1 className="top-0 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={checkLogin}>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your username
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="username..."
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full border-2 border-gray-500 rounded-lg p-2 hover:bg-gray-200"
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <a
                  onClick={(e) => setSignUp(true)}
                  href="#"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </a>
              </p>
            </form>
          </div>
          {/* </div> */}
          {/* </section> */}
        </div>
      )}
    </>
  );
}

export default Login;
