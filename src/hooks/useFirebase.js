import { useEffect, useState } from "react";
import { authStateUpdate, db, postMessage } from "utils/firebase";
import { query, collection, orderBy, onSnapshot } from "firebase/firestore";

export default function useFirebase() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);

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
          messages.push(doc.data().message);
        });
        setMessages(messages);
      });
      return () => {
        unsubscribe();
      };
    }
  }, [user]);

  const sendMessage = (message) => {
    postMessage(message);
    let messagesCopy = [...messages];
    messagesCopy.unshift(message);
    setMessages(messagesCopy);
    setMessage("");
  };

  return {
    messages,
    message,
    setMessage,
    sendMessage,
    user,
  };
}
