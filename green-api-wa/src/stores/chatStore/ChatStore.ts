import { action, makeAutoObservable, observable } from "mobx";

import axiosInstance from "../../utils/axiosInstance";
import accountStore from "../accountStore/AccountStore";
import { Chat, IncomingMessageData, Message } from "./types";

class ChatStore {

    @observable chats: Chat[] = [];  
    @observable selectedChat: string | null = null;

    constructor() { 
        makeAutoObservable(this);  
        this.loadChatsFromLocalStorage();
    }

    findChatById(chatId: string | null): Chat | undefined {
        return this.chats.find(chat => chat.chatId === chatId);
    }

    @action
    selectChat = async (chatId: string) => {
        this.selectedChat = chatId;
        console.log('Selected Chat number', this.selectedChat);
    }

    @action
    createChat = async (chatId: string, messages: Message[]) => {
        const newChat = {chatId, messages};
        this.chats.push(newChat);
        this.saveChatsToLocalStorage();
    }

    @action
    sendMessage = async (chatId: string, text: string) => {
        const message: Message = { text, sender: "me", timestamp: Date.now() };
       
        const selectedChat = this.selectedChat;
        const idInstance = accountStore.idInstance;
        const apiTokenInstance = accountStore.apiTokenInstance;
        
        try {
            console.log('IdInstance: ', idInstance);
            console.log('ChatId: ', selectedChat);
            console.log('ApiTokenInstance: ', apiTokenInstance);

            await axiosInstance.post(`/waInstance${idInstance}/sendMessage/${apiTokenInstance}`, { "chatId":chatId, "message":text });
            
            let chat = this.findChatById(selectedChat);
            console.log('Selected Chat', chat);
            if (!chat) chat = { chatId, messages: [] };
            chat.messages.push(message);
            this.saveChatsToLocalStorage();
          } catch (error) {
            console.error("Error sending message:", error);
          }
    }

    @action
    receiveMessage = async (data: IncomingMessageData) => {
        let chatId: string = "";
        if(data.body.senderData)
        chatId = data.body.senderData.chatId;

        console.log('Receiving chat: ',chatId);

        const receiptId = data.receiptId;
        const chat = this.findChatById(chatId);

        if(data.body.messageData.typeMessage !== 'textMessage') {
            this.deleteNotification(receiptId);
        }

        const textMessage = data.body.messageData.textMessageData.textMessage;

        chat?.messages.push({sender: "them", text: textMessage, timestamp: Date.now()})
        this.saveChatsToLocalStorage();
        this.deleteNotification(receiptId);

    }

    @action
    deleteNotification = async (receiptId: number) => {
        const idInstance = accountStore.idInstance;
        const apiTokenInstance = accountStore.apiTokenInstance;

        try {
          const url = `/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`;
          const response = await axiosInstance.delete(url);
          console.log(`Notification with receiptId ${receiptId} deleted`, response.data);
        } catch (error) {
          console.error("Error deleting notification:", error);
        }
      }

    @action
    async fetchMessages() {

        const idInstance = accountStore.idInstance;
        const apiTokenInstance = accountStore.apiTokenInstance;

        try {
          const response = await axiosInstance.get(`/waInstance${idInstance}/receiveNotification/${apiTokenInstance}?reveiveTimeout=20`);
         
          if(response.data) {
            const data: IncomingMessageData = response.data;
            console.log('Receiving Data: ',data);
            if(response.data.body.senderData) {
                this.receiveMessage(data);
            } else {
                this.deleteNotification(data.receiptId);
            }
            
          }
          
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
    }

    saveChatsToLocalStorage() {
        localStorage.setItem("chats", JSON.stringify(this.chats));
    }

    loadChatsFromLocalStorage() {
        const storedChats = localStorage.getItem("chats");
        if (storedChats) {
          this.chats = JSON.parse(storedChats);
        }
    }
}

const chatStore = new ChatStore();
export default chatStore;