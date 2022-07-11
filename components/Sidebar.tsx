import {
  collection,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
  where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import styles from '../styles/components/Sidebar.module.css';
import { Chat } from '../types/type';
import AddFriend from './AddFriend';
import Avatar from './Avatar';
import Dropdown from './Dropdown';
import Friend from './Friend';

const Sidebar = () => {
  const [user] = useAuthState(auth);
  const [chatList, setChatList] = useState<Chat[]>([]);

  useEffect(() => {
    const q = query(
      collection(db, 'chats'),
      where('users', 'array-contains', user?.email),
      orderBy('timestamp', 'desc')
    );
    const unsub = onSnapshot(q, (snapshot) => {
      setChatList(
        snapshot.docs.map((doc: DocumentData) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    });
    return unsub;
  }, [user?.email]);

  return (
    <div className={styles.container}>
      <header>
        <div className={styles.user_info}>
          <Avatar src={user?.photoURL} width={40} height={40} />
          <h1>{user?.displayName}</h1>
        </div>
        <Dropdown />
      </header>
      <AddFriend />
      <ul>
        {chatList.map((chat) => (
          <Friend key={chat.id} chat={chat} />
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
