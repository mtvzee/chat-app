import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import styles from '../styles/components/Chat.module.css';
import { Message } from '../types/type';
import { getTime } from '../utils/getTime';
import Avatar from './Avatar';
import DeleteMessage from './DeleteMessage';

const Chat = ({ id, senderEmail, timestamp, text, photoURL }: Message) => {
  const [user] = useAuthState(auth);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {senderEmail === user?.email ? (
        <div className={styles.chat_right} onClick={() => setIsOpen(true)}>
          <p>{text}</p>
          <span className={styles.time_right}>
            {getTime(timestamp, 'HH:mm')}
          </span>
        </div>
      ) : (
        <div className={styles.container}>
          <div>
            <Avatar src={photoURL} />
          </div>
          <div className={styles.chat_left}>
            <p>{text}</p>
            <span className={styles.time_left}>
              {getTime(timestamp, 'HH:mm')}
            </span>
          </div>
        </div>
      )}
      {isOpen && (
        <DeleteMessage messageId={id} text={text} setIsOpen={setIsOpen} />
      )}
    </>
  );
};

export default Chat;
