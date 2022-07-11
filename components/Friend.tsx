import Avatar from './Avatar';
import styles from '../styles/components/Friend.module.css';
import Link from 'next/link';
import { Chat } from '../types/type';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import { useEffect, useState } from 'react';
import {
  collection,
  DocumentData,
  getDocs,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import { getFriendEmail } from '../utils/getFriendEmail';
import { getTime } from '../utils/getTime';

type Props = {
  chat: Chat;
};

type UserInfo = {
  displayName: string;
  email: string;
  photoURL: string;
};

const Friend = ({ chat }: Props) => {
  const [user] = useAuthState(auth);
  const [userInfo, setUserInfo] = useState<UserInfo | DocumentData>();

  useEffect(() => {
    const q = query(
      collection(db, 'userInfo'),
      where('email', '==', getFriendEmail(chat.users, user?.email ?? ''))
    );

    const unsub = onSnapshot(q, (snapshot) =>
      setUserInfo(snapshot.docs.map((doc) => ({ ...doc.data() }))[0])
    );

    return unsub;
  }, [chat.users, user?.email]);

  return (
    <li>
      <Link href={`#`}>
        <a className={styles.container}>
          <div className={styles.avatar}>
            <Avatar src={userInfo?.photoURL} />
          </div>
          <div className={styles.friend_info}>
            <h2>{userInfo?.displayName}</h2>
            <p>{chat.latestMessage}</p>
          </div>
          <div className={styles.time}>
            {getTime(chat.timestamp, 'MM/DD HH:mm')}
          </div>
        </a>
      </Link>
    </li>
  );
};

export default Friend;
