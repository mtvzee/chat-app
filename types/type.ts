import { Timestamp } from 'firebase/firestore';

export type Chat = {
  latestMessage?: string;
  timestamp?: Timestamp;
  users: string[];
  id: number;
};

export type Message = {
  id: string;
  senderEmail: string;
  timestamp: Timestamp;
  text: string;
  photoURL: string;
};
