import { observer } from "mobx-react-lite";
import ChatHeader from "../../components/chat-header/ChatHeader";
import ChatMessages from "../../components/chat-messages/ChatMessages";
import ContactList from "../../components/contact-list/ContactList";
import "./chat-page.css";

const ChatPage: React.FC = observer(() => {
  return (
    <div className="chat-page">
      <div className="contact-list">
        <ContactList />
      </div>
      <div className="chat-content">
        <ChatHeader />
        <ChatMessages />
      </div>
    </div>
  );
});

export default ChatPage;
