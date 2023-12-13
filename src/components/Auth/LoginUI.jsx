"use client";

import { usePolyfire } from "polyfire-js/hooks";
import { useEffect, useState } from "react";
import { firebaseLogin } from "utils/firebase.js";
import "./LoginUI.css";

export default function LoginUI() {
  const {
    auth: { login, logout, status, user },
  } = usePolyfire();
  const [isModal, setIsModal] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      setIsModal(false);
      user.getAuthID().then(firebaseLogin);
    }
  }, [status, user]);

  return (
    <>
      {status === "loading" && <div>Loading...</div>}
      {status === "unauthenticated" && (
        <div className="flex items-center justify-center">
          {isModal ? (
            <div
              className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-blue-500/50"
              onClick={() => setIsModal(false)}
            >
              <div className="flex justify-center items-center w-10/12 h-5/6 sm:w-1/3 sm:h-1/3 bg-blue-500 rounded-xl">
                <div className="flex flex-col justify-center items-center">
                  <button
                    className="gsi-material-button"
                    onClick={() => login("google")}
                  >
                    <div className="gsi-material-button-state"></div>
                    <div className="gsi-material-button-content-wrapper">
                      <div className="gsi-material-button-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          display="block"
                          viewBox="0 0 48 48"
                        >
                          <path
                            fill="#EA4335"
                            d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                          ></path>
                          <path
                            fill="#4285F4"
                            d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                          ></path>
                          <path
                            fill="#FBBC05"
                            d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                          ></path>
                          <path
                            fill="#34A853"
                            d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                          ></path>
                          <path fill="none" d="M0 0h48v48H0z"></path>
                        </svg>
                      </div>
                      <span className="gsi-material-button-contents">
                        Sign in with Google
                      </span>
                    </div>
                  </button>

                  <button
                    onClick={() => login("github")}
                    type="button"
                    className="py-2 px-2 mt-4 border-2 border-[#747775] max-w-md flex justify-center items-center bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white w-full transition ease-in duration-200 text-center text-sm font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-md"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      viewBox="0 0 1792 1792"
                      className="mr-2"
                    >
                      <path d="M896 128q209 0 385.5 103T1561 510.5 1664 896q0 251-146.5 451.5T1139 1625q-27 5-40-7t-13-30q0-3 .5-76.5t.5-134.5q0-97-52-142 57-6 102.5-18t94-39 81-66.5 53-105T1386 856q0-119-79-206 37-91-8-204-28-9-81 11t-92 44l-38 24q-93-26-192-26t-192 26q-16-11-42.5-27T578 459.5 493 446q-45 113-8 204-79 87-79 206 0 85 20.5 150t52.5 105 80.5 67 94 39 102.5 18q-39 36-49 103-21 10-45 15t-57 5-65.5-21.5T484 1274q-19-32-48.5-52t-49.5-24l-20-3q-21 0-29 4.5t-5 11.5 9 14 13 12l7 5q22 10 43.5 38t31.5 51l10 23q13 38 44 61.5t67 30 69.5 7 55.5-3.5l23-4q0 38 .5 88.5t.5 54.5q0 18-13 30t-40 7q-232-77-378.5-277.5T128 896q0-209 103-385.5T510.5 231 896 128zM419 1231q3-7-7-12-10-3-13 2-3 7 7 12 9 6 13-2zm31 34q7-5-2-16-10-9-16-3-7 5 2 16 10 10 16 3zm30 45q9-7 0-19-8-13-17-6-9 5 0 18t17 7zm42 42q8-8-4-19-12-12-20-3-9 8 4 19 12 12 20 3zm57 25q3-11-13-16-15-4-19 7t13 15q15 6 19-6zm63 5q0-13-17-11-16 0-16 11 0 13 17 11 16 0 16-11zm58-10q-2-11-18-9-16 3-14 15t18 8 14-14z"></path>
                    </svg>
                    Sign in with GitHub
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <button
              className="hover:text-blue-300 hover:underline"
              onClick={() => setIsModal(true)}
            >
              Log in
            </button>
          )}
        </div>
      )}
      {status === "authenticated" && (
        <button
          className="hover:text-blue-300 hover:underline"
          onClick={() => logout()}
        >
          Log out
        </button>
      )}
    </>
  );
}
