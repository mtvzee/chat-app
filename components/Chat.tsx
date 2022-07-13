import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import styles from '../styles/components/Chat.module.css';
import { Message } from '../types/type';
import { getTime } from '../utils/getTime';
import Avatar from './Avatar';

const Chat = ({ id, senderEmail, timestamp, text, photoURL }: Message) => {
  const [user] = useAuthState(auth);
  return (
    <>
      {senderEmail === user?.email ? (
        <div className={styles.chat_right}>
          <p>{text}</p>
          <span className={styles.time_right}>
            {getTime(timestamp, 'HH:mm')}
          </span>
        </div>
      ) : (
        <div className={styles.container}>
          <Avatar src={photoURL} />
          <div className={styles.chat_left}>
            <p>{text}</p>
            <span className={styles.time_left}>
              {getTime(timestamp, 'HH:mm')}
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default Chat;
