import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import styles from '../styles/components/AddFriend.module.css';

const AddFriend = () => {
  const [user] = useAuthState(auth);

  const addFriend = async () => {
    const friendEmail = prompt('友達のメールアドレスを入力');
    if (friendEmail != null && friendEmail !== '') {
      await addDoc(collection(db, 'chats'), {
        latestMessage: '',
        timestamp: serverTimestamp(),
        users: [user?.email, friendEmail],
      });
    }
  };
  return (
    <div className={styles.container}>
      <button className={styles.btn} onClick={addFriend}>
        友達を追加
      </button>
    </div>
  );
};

export default AddFriend;
