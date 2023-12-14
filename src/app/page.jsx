"use client";
import { usePolyfire } from "polyfire-js/hooks";
import { useState, useEffect } from "react";
import Forum from "@/components/Forum";
import Spinner from "utils/Spinner";

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

  if (status === "loading") {
    return <Spinner />;
  }

  return <Forum />;

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
