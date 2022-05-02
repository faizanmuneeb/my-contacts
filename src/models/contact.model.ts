export type Contact = {
  id: string;
  img: string;
  name: string;
  phoneNumber: string;
  tags: [
    {
      name: string;
    }
  ];
  type: string;
  messagesSent: number;
  messagesReceived: number;
  createdAt: string;
};
