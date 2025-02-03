import { action, makeAutoObservable, observable } from "mobx";
import { Contact } from "./types";

class ContactStore {

    @observable contacts: Contact[] = JSON.parse(localStorage.getItem("contacts") || "[]");
    @observable selectedContact: Contact | null = null;
 
    constructor() {
        makeAutoObservable(this);
        this.loadContactsFromLocalStorage();
    }

    @action
    selectContact = async (contact: Contact) => {
        this.selectedContact = contact;
    }

    @action
    addContact = async (name: string, number: string) => {

        if (this.contacts.some((c) => c.number === number)) {
            alert("This number already exists!");
            return;
        }

        const chatId = `${number}@c.us`
    
        const newContact: Contact = { name, number, chatId };
        this.contacts.push(newContact);
        this.saveContactsToLocalStorage();
        localStorage.setItem("contacts", JSON.stringify(this.contacts));
    }

    saveContactsToLocalStorage() {
        localStorage.setItem("contacts", JSON.stringify(this.contacts));
    }

    loadContactsFromLocalStorage() {
        const storedContacts = localStorage.getItem("contacts");
        if (storedContacts) {
          this.contacts = JSON.parse(storedContacts);
        }
    }

}

const contactStore = new ContactStore();
export default contactStore;