import { observer } from "mobx-react-lite";
import ContactCard from "../contact-card/ContactCard";
import "./contactlist.css";
import { useState } from "react";
import AddContactModal from "../shared/modal/AddContactModal";
import contactStore from "../../stores/contactStore/ContactStore";
import chatStore from "../../stores/chatStore/ChatStore";

const ContactList: React.FC = observer(() => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="contacts">
      <div className="contacts-header">
        <h1>Chats</h1>
        <button onClick={() => setIsModalOpen(true)}>+</button>
      </div>

      <div className="contacts">
        {contactStore.contacts.map((contact, index) => (
          <ContactCard
            key={index}
            handleClick={() => {
              contactStore.selectContact(contact);
              chatStore.selectChat(contact.chatId);
            }}
            name={contact.name}
            number={contact.number}
          />
        ))}
      </div>
      <AddContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
});

export default ContactList;
