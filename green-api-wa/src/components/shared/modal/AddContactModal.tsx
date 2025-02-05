import { observer } from "mobx-react-lite";
import { useState } from "react";
import "./addcontactmodal.css";
import contactStore from "../../../stores/contactStore/ContactStore";
import { Contact } from "../../../stores/contactStore/types";
import chatStore from "../../../stores/chatStore/ChatStore";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddContactModal: React.FC<ModalProps> = observer(
  ({ isOpen, onClose }: ModalProps) => {
    const [formData, setFormData] = useState<Contact>({
      name: "",
      number: "",
      chatId: "",
    });

    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    if (!isOpen) return null;

    const handleFormSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      const chatId = `${formData.number}@c.us`;
      if (formData.name.trim() && formData.number.trim()) {
        contactStore.addContact(formData.name, formData.number);
        chatStore.createChat(chatId, []);
        onClose(); // Close the modal
      }
    };

    return (
      <div className="overlay">
        <div className="modal">
          <h2 className="modal-header">Add Contact</h2>
          <form className="add-contact-form" onSubmit={handleFormSubmit}>
            <div className="input-set">
              <p>Contact Name</p>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
              />
            </div>
            <div className="input-set">
              <p>Contact Number</p>
              <input
                maxLength={11}
                minLength={11}
                type="number"
                name="number"
                placeholder="77751238514"
                value={formData.number}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit">Add contact</button>
            <button onClick={onClose}>Cancel</button>
          </form>
        </div>
      </div>
    );
  }
);

export default AddContactModal;
