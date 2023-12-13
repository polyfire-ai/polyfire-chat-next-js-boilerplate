import { useEffect, useState } from "react";
import useFirebase from "hooks/useFirebase";
import PostInput from "./PostInput";

export default function Forum() {
  const { messages, user } = useFirebase();

  return (
    <div className="bg-gray-100 w-2/5 h-full">
      <div className="p-4">
        <PostInput />
      </div>

      <ul>
        {messages
          ? messages?.map((message, index) => <li key={index}>{message}</li>)
          : null}
      </ul>
    </div>
  );
}
