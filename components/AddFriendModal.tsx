import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import {
  Dispatch,
  MouseEvent,
  SetStateAction,
  useState,
} from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { AiOutlineClose } from 'react-icons/ai';
import { auth, db } from '../firebase';
import styles from '../styles/components/AddFriendModal.module.css';
import { Chat } from '../types/type';

type Props = {
  chatList: Chat[];
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const AddFriendModal = ({ chatList, setIsOpen }: Props) => {
  const [input, setInput] = useState('');
  const [user] = useAuthState(auth);

  const chatAlreadyExists = (email: string) =>
    chatList.find(
      (chat) =>
        chat.users.includes(user?.email ?? '') && chat.users.includes(email)
    );

  const addFriend = async (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    if (!chatAlreadyExists(input)) {
      await addDoc(collection(db, 'chats'), {
        latestMessage: '',
        timestamp: serverTimestamp(),
        users: [user?.email, input],
      });
      setInput('');
      setIsOpen(false);
    }
  };

  const addDummy = async () => {
    await setDoc(doc(db, `chats/${user?.uid}`), {
      latestMessage: '',
      timestamp: serverTimestamp(),
      users: [user?.email, 'dummypz8@gmail.com'],
    });
    await addDoc(collection(db, `chats/${user?.uid}/messages`), {
      senderEmail: 'dummypz8@gmail.com',
      photoURL:
        'https://lh3.googleusercontent.com/a/AItbvmk3WsfgwrkEqwvJPQHMLOtMRUgpHIMF8LOKybqG=s96-c',
      timestamp: serverTimestamp(),
      text: 'こんにちは',
    });
    setIsOpen(false);
  };

  return (
    <div className={styles.overlay} onClick={() => setIsOpen(false)}>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close_btn} onClick={() => setIsOpen(false)}>
          <AiOutlineClose size={25} />
        </button>
        <h1 className={styles.title}>友達のメールアドレスを入力</h1>
        <div className={styles.input}>
          <input
            type="email"
            className={styles.email}
            placeholder="メールアドレス"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className={styles.dummy} onClick={addDummy}>
            ダミーを追加する
          </button>
        </div>
        <div className={styles.footer_btn}>
          <button className={styles.delete} onClick={(e) => addFriend(e)}>
            追加
          </button>
          <button className={styles.cancel} onClick={() => setIsOpen(false)}>
            キャンセル
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddFriendModal;
