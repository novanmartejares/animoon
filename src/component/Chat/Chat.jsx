"use client";
import React, { useState, useEffect } from "react";
import InputEmoji from "react-input-emoji";
import {
  collection,
  setDoc,
  doc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../../firebase"; // Adjust the path as needed
import { useSession } from "next-auth/react";
import "./chat.css";
import SignInSignUpModal from "../SignSignup/SignInSignUpModal";

const Chat = (props) => {
  const [messages, setMessages] = useState([]);
  const [logIsOpen, setLogIsOpen] = useState(false);
  const [text, setText] = useState("");
  const { data: session } = useSession();
  const [isChatVisible, setChatVisible] = useState(true);

  useEffect(() => {
    // Listen to real-time updates from Firestore
    const unsubscribe = onSnapshot(
      collection(db, "chats"),
      (snapshot) => {
        const fetchedMessages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        // Sort messages by timestamp
        fetchedMessages.sort((a, b) => a.timestamp - b.timestamp);
        setMessages(fetchedMessages);
      },
      (error) => {
        console.error("Error fetching chat messages:", error);
      }
    );

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  const handleSend = async () => {
    if (text.trim() && session) {
      try {
        // Generate a custom ID by combining liveId with the timestamp
        const timestamp = new Date().getTime(); // Get current timestamp
        const customId = `${props.liveId}-${timestamp}`;

        // Store message with the custom ID
        await setDoc(doc(db, "chats", customId), {
          text,
          username: session?.user.username || "Anonymous",
          randomImage: session?.user.randomImage || "/default-avatar.png",
          timestamp: serverTimestamp(),
        });
        setText(""); // Clear input field
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  const logg = () => {
    if (!session) {
      setLogIsOpen(true);
    }
  };

  useEffect(() => {
    // Scroll to the bottom of chat messages
    const chatMessages = document.querySelector(".chat-messages");
    if (chatMessages) {
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      <SignInSignUpModal setLogIsOpen={setLogIsOpen} logIsOpen={logIsOpen} />
      <div className="chtiE">
        {isChatVisible ? (
          <>
            <div className="chat-header">
              <button onClick={() => setChatVisible(false)}>
                Hide Chatbox
              </button>
            </div>
            <div className="chat-messages">
              {messages.map((message) => (
                <Message key={message.id} message={message} />
              ))}
            </div>
            <div className="gropE">
              <div className="inputE">
                <InputEmoji value={text} onChange={setText} />
              </div>
              <button
                onClick={() => handleSend() & logg()}
                className="chat-send-button"
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="show-chat-button">
            <button onClick={() => setChatVisible(true)}>Show Chatbox</button>
          </div>
        )}
      </div>
    </>
  );
};

// Sub-component to handle message display
const Message = ({ message }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const MAX_LENGTH = 80;

  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <div className="chat-message">
      <div className="chat-avatar">
        <img src={message.randomImage} alt="Avatar" />
      </div>
      <div className="chat-content">
        <div className="chat-username">{message.username}</div>
        <div className="chat-text">
          {isExpanded || message.text.length <= MAX_LENGTH
            ? message.text
            : `${message.text.slice(0, MAX_LENGTH)}...`}
          {message.text.length > MAX_LENGTH && (
            <button onClick={toggleExpand} className="toggle-button">
              {isExpanded ? "Show Less" : "Show More"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
