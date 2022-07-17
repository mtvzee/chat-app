import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { AiOutlineClose } from 'react-icons/ai';
import { auth, db } from '../firebase';
import styles from '../styles/components/AddFriendModal.module.css';

type Props = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const AddFriendModal = ({ setIsOpen }: Props) => {
  const [input, setInput] = useState('');
  const [user] = useAuthState(auth);

  const addFriend = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await addDoc(collection(db, 'chats'), {
      latestMessage: '',
      timestamp: serverTimestamp(),
      users: [user?.email, input],
    });
    setInput('');
    setIsOpen(false);
  };

  return (
    <div className={styles.overlay} onClick={() => setIsOpen(false)}>
      <form
        className={styles.content}
        onSubmit={(e) => addFriend(e)}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.close_btn} onClick={() => setIsOpen(false)}>
          <AiOutlineClose size={25} />
        </button>
        <h1 className={styles.title}>友達のメールアドレスを入力</h1>
        <input
          type="email"
          className={styles.email}
          placeholder="メールアドレス"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className={styles.footer_btn}>
          <button className={styles.delete}>追加</button>
          <button className={styles.cancel} onClick={() => setIsOpen(false)}>
            キャンセル
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddFriendModal;
