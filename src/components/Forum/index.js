import { useEffect, useState } from "react";
import useFirebase from "hooks/useFirebase";
import PostBox from "./PostBox";
import PostInput from "./PostInput";

export default function Forum() {
  const { messages, user } = useFirebase();

  return (
    <div className="w-full sm:w-2/5 h-full pb-12 flex flex-col ">
      <div className="flex-1 max-h-fit overflow-y-auto ">
        {messages ? (
          <ul
            role="list"
            className="divide-y divide-gray-100 sm:pl-6 overflow-scroll mx-4"
          >
            {messages.map((post) => (
              <PostBox key={post.id} post={post} />
            ))}
          </ul>
        ) : null}
      </div>

      <PostInput />
    </div>
  );
}
