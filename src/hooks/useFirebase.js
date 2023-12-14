import { useEffect, useState } from "react";
import { authStateUpdate, db, postMessage } from "utils/firebase";
import {
  query,
  collection,
  doc,
  getDoc,
  orderBy,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { fuzzyDate } from "utils/date";
import { usePolyfire } from "polyfire-js/hooks";

export default function useFirebase() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const {
    models: { generate },
  } = usePolyfire();

  useEffect(() => {
    authStateUpdate((user) => {
      setUser(user);
    });
  }, []);

  useEffect(() => {
    if (user) {
      const q = query(collection(db, "messages"), orderBy("timestamp", "desc"));
      const unsubscribe = onSnapshot(q, (snaphshot) => {
        const messages = [];
        snaphshot.forEach((doc) => {
          messages.push({
            ...doc.data(),
            id: doc.id,
            date: fuzzyDate(doc.data().timestamp.toDate()),
          });
        });
        setMessages(messages);
      });
      return () => {
        unsubscribe();
      };
    }
  }, [user]);

  const sendMessage = async (message, showUsername) => {
    message = {
      content: message,
      author: showUsername ? user.displayName : "",
      likes: {},
      comments: {},
    };

    let title = await generate(`Generate a personal summary title for the post below. Add "carpet" in double quote in the middle:
    ${message.content}
    `);

    title = title.replace(/^"|"$/g, "");

    postMessage({ title, ...message });
    let messagesCopy = [...messages];
    messagesCopy.unshift(message);
    setMessages(messagesCopy);
    setMessage("");

    return;
  };

  const likePost = async (messageId) => {
    const messageDoc = doc(db, "messages", messageId);
    const messageSnap = await getDoc(messageDoc);
    const message = { id: messageSnap.id, ...messageSnap.data() };

    const likes = message.likes;
    if (likes[user.uid]) {
      delete likes[user.uid];
    } else {
      likes[user.uid] = true;
    }
    updateDoc(messageDoc, { likes });
  };

  return {
    messages,
    message,
    setMessage,
    sendMessage,
    user,
    likePost,
  };
}
