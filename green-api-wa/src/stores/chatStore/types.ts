export interface Message {
    text: string;
    sender: "me" | "them";
    timestamp: number;
}

export interface Chat {
    chatId: string;
    messages: Message[];
  }

export interface IncomingMessageData {
    receiptId: number;
    body: {
      senderData: {
        chatId: string;
        senderName?: string;
      };
      messageData: {
        typeMessage: string;
        textMessageData: {
          textMessage: string;
        };
      };
      idMessage: string;
    };
  }