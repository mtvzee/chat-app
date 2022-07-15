import { deleteDoc, doc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { db } from '../firebase';
import styles from '../styles/components/DeleteMessage.module.css';

type Props = {
  messageId: string;
  text: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const DeleteMessage = ({ messageId, text, setIsOpen }: Props) => {
  const router = useRouter();
  const { id } = router.query;
  const handleDelete = async () => {
    await deleteDoc(doc(db, `chats/${id}/messages/${messageId}`));
  };

  return (
    <div className={styles.overlay} onClick={() => setIsOpen(false)}>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close_btn} onClick={() => setIsOpen(false)}>
          <AiOutlineClose size={25} />
        </button>
        <h1 className={styles.title}>メッセージを削除しますか？</h1>
        <p className={styles.message}>{`"${text}"`}</p>
        <div className={styles.footer_btn}>
          <button className={styles.delete} onClick={handleDelete}>
            削除
          </button>
          <button className={styles.cancel} onClick={() => setIsOpen(false)}>
            キャンセル
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteMessage;
