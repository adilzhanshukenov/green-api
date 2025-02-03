import { observer } from "mobx-react-lite";
import chatStore from "../../stores/chatStore/ChatStore";
import MessageSender from "../message-sender/MessageSender";
import "./chatmessages.css";
import { useEffect, useRef } from "react";
import { autorun } from "mobx";

const ChatMessages = observer(() => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const selectedChat = chatStore.selectedChat;

  const messages = selectedChat
    ? chatStore.findChatById(selectedChat)?.messages || []
    : [];

  useEffect(() => {
    const dispose = autorun(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    });

    return () => dispose();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      chatStore.fetchMessages();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!chatStore.selectedChat) {
    return (
      <div id="no-chat-message">
        <h1>Select a contact to chat</h1>
      </div>
    );
  }

  //   const msgs = [
  //     { text: "Hello", sender: "me" },
  //     { text: "Wyd", sender: "them" },
  //     { text: 'Righ', sender: 'them'},
  //     {text: 'Yes', sender: 'me'}
  //   ];

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div
            key={index}
            style={{
              ...styles.message,
              ...(message.sender === "me" ? styles.sent : styles.received),
            }}
          >
            {message.text}
          </div>
        ))}
      </div>
      <MessageSender />
      <div ref={messagesEndRef} />
    </div>
  );
});

const styles: Record<string, React.CSSProperties> = {
  message: {
    padding: "10px",
    borderRadius: "10px",
    marginBottom: "8px",
    maxWidth: "70%",
    wordWrap: "break-word",
  },
  sent: {
    backgroundColor: "#AAB99A",
    alignSelf: "flex-end",
  },
  received: {
    backgroundColor: "#AAB99A",
    alignSelf: "flex-start",
  },
  inputContainer: {
    display: "flex",
    padding: "10px",
    borderTop: "1px solid #ccc",
  },
  input: {
    flex: 1,
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    outline: "none",
  },
  button: {
    marginLeft: "8px",
    padding: "8px 12px",
    border: "none",
    backgroundColor: "#25D366", // WhatsApp green
    color: "white",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default ChatMessages;
