import { observer } from "mobx-react-lite";
import contactStore from "../../stores/contactStore/ContactStore";
import "./chatheader.css";

const ChatHeader = observer(() => {
  return (
    <div className="chat-header">{contactStore.selectedContact?.name}</div>
  );
});

export default ChatHeader;
