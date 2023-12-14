import { useCallback, useState } from "react";
import { ChatBubbleLeftIcon, HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { shorten } from "utils/format";
import useFirebase from "hooks/useFirebase";
import LoginUI from "../Auth/LoginUI";
import { usePolyfire } from "polyfire-js/hooks";

export default function PostBox({ post }) {
  const [showMore, setShowMore] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const { likePost, user } = useFirebase();
  const {
    auth: { status },
  } = usePolyfire();

  const handleLike = useCallback(
    (id) => {
      if (status === "unauthenticated") {
        setShowLogin(true);
        return;
      }
      likePost(id);
    },
    [status]
  );

  return (
    <>
      {showLogin && (
        <LoginUI showLogin={showLogin} setShowLogin={setShowLogin} />
      )}
      <li
        key={post.id}
        className="flex flex-wrap items-start justify-between gap-x-6 gap-y-4 py-5 sm:flex-nowrap"
      >
        <div>
          <p className="text-sm font-semibold leading-6 text-gray-900">
            <span
              onClick={() => setShowMore(!showMore)}
              className="hover:underline cursor-pointer"
            >
              {post.title || "spicy news from a spicy founder"}
            </span>
          </p>
          <p className="text-xs text-gray-500 leading-6">
            {shorten(post.content, showMore ? 1000 : 90)}
            {post.content.length > 90 ? (
              <a
                onClick={() => setShowMore(!showMore)}
                className="hover:underline ml-2 text-blue-500 cursor-pointer"
              >
                Show {showMore ? "less" : "more"}
              </a>
            ) : null}
          </p>
          <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
            <p>
              <a href={"#"} className="hover:underline">
                {post.author || "Anonymous"}
              </a>
            </p>
            <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
              <circle cx={1} cy={1} r={1} />
            </svg>
            <p>
              <time dateTime={post.timestamp}>
                {post.date || "time posted"}
              </time>
            </p>
          </div>
        </div>
        <dl className="flex w-full flex-col flex-none justify-between gap-x-8 sm:w-auto">
          {false && (
            <div className="flex w-16 gap-x-2.5 items-center">
              <dt>
                <span className="sr-only">Total comments</span>
                <ChatBubbleLeftIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </dt>
              <dd className="text-sm leading-6 text-gray-900">
                {post.comments ? Object.keys(post.comments).length : 0}
              </dd>
            </div>
          )}
          <div className="flex w-16 gap-x-2.5 items-center">
            <dt className="cursor-pointer" onClick={() => handleLike(post.id)}>
              <span className="sr-only">Total likes</span>
              {user && post.likes[user?.uid] ? (
                <HeartIconSolid
                  className="h-5 w-5 text-red-400"
                  aria-hidden="true"
                />
              ) : (
                <HeartIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              )}
            </dt>
            <dd className="text-sm leading-6 text-gray-900">
              {post.likes ? Object.keys(post.likes).length : 0}
            </dd>
          </div>
        </dl>
      </li>
    </>
  );
}
