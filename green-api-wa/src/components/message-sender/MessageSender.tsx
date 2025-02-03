import { useState } from "react";
import "./messagesender.css";
import chatStore from "../../stores/chatStore/ChatStore";
import { observer } from "mobx-react-lite";

const MessageSender = observer(() => {
  const [newMessage, setNewMessage] = useState<string>("");
  const selectedChat = chatStore.selectedChat;

  const sendMessage = async () => {
    if (newMessage.trim() && selectedChat) {
      console.log("MESSAGE: ", selectedChat, newMessage);
      await chatStore.sendMessage(selectedChat, newMessage);
      setNewMessage("");
    }
  };
  return (
    <div className="message-sender">
      <input
        id="message-input"
        type="text"
        value={newMessage}
        placeholder="Type a message..."
        onChange={(e) => {
          setNewMessage(e.target.value);
        }}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      />
      <button onClick={sendMessage} id="button-send">
        send
      </button>
    </div>
  );
});

export default MessageSender;
