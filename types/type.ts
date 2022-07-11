import { Timestamp } from 'firebase/firestore';

export type Chat = {
  latestMessage?: string;
  timestamp?: Timestamp;
  users: string[];
  id: number;
};
