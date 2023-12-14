import React, { useState } from "react";
import InputBox from "./InputBox";
import { usePolyfire } from "polyfire-js/hooks";
import LoginUI from "components/Auth/LoginUI";

export default function PostInput() {
  const [showModal, setShowModal] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const {
    auth: { status },
  } = usePolyfire();

  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowModal(false);
    }
  };

  const handlePostButton = () => {
    if (status === "authenticated") {
      setShowModal(true);
    } else {
      setShowLogin(true);
    }
  };

  return (
    <>
      {showLogin ? (
        <LoginUI showLogin={showLogin} setShowLogin={setShowLogin} />
      ) : null}
      {showModal && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-blue-500 bg-opacity-50 z-50 flex items-center justify-center"
          onClick={handleOutsideClick}
        >
          <div className="w-4/5 sm:w-2/5">
            <InputBox setShowModal={setShowModal} />
          </div>
        </div>
      )}
      <div className="fixed bottom-4 inset-x-0 flex items-center justify-center">
        <button
          className="bg-blue-500 hover:bg-blue-300 text-white px-12 py-2 rounded-full"
          onClick={handlePostButton}
        >
          Post
        </button>
      </div>
    </>
  );
}
