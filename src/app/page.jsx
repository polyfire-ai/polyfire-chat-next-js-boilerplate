"use client";
import { usePolyfire } from "polyfire-js/hooks";
import { useState, useEffect } from "react";

import { Loader } from "@/components/Loader";

import ChatUI from "@polyfact/chat";
import ColorPickerWrapper from "@/components/Colors";
import LoginUI from "@/components/Auth/LoginUI";
import Forum from "@/components/Forum";

const PROJECT_NAME = process.env.NEXT_PUBLIC_POLYFIRE_BOTNAME || "Chatbot";

const defaultColors = {
  chatBackgroundColor: "rgba(111, 111, 111, 0.1)",
  chatTextColor: "#2D3748",
  inputBackgroundColor: "#E2E8F0",
  inputColor: "#2D3748",
  placeholderTextColor: "#A0AEC0",
  botMessageColor: "#2D3748",
  botMessageBackgroundColor: "rgba(220, 242, 247)",
  userMessageColor: "#E2E8F0",
  userMessageBackgroundColor: "#4A5568",
  buttonBackgroundColor: "#4A5568",
  buttonBorderColor: "#2D3748",
  dotsColor: "#A0AEC0",
};

const Chat = () => {
  const {
    auth: { login, status },
    utils: { Chat },
  } = usePolyfire();
  const [chat, setChat] = useState();

  useEffect(() => {
    return;
    if (!chat && status === "authenticated") {
      setChat(new Chat({ autoMemory: true }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  if (login && status === "unauthenticated") {
    return <LoginUI />;
  }

  if (status === "loading") {
    return <Loader />;
  }

  if (status === "authenticated") {
    return <Forum />;
  }

  if (chat && status === "authenticated") {
    return undefined;
    /* <ChatUI
        chat={chat}
        botName={PROJECT_NAME}
        buttonBorderWidth="1px"
        {...defaultColors}
      /> */
  }

  return null;
};

export default Chat;
