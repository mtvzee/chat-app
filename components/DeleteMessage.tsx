import { Dispatch, SetStateAction } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import styles from '../styles/components/DeleteMessage.module.css';

type Props = {
  text: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const DeleteMessage = ({ text, setIsOpen }: Props) => {
  return (
    <div className={styles.overlay} onClick={() => setIsOpen(false)}>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close_btn} onClick={() => setIsOpen(false)}>
          <AiOutlineClose size={25} />
        </button>
        <h1 className={styles.title}>メッセージを削除しますか？</h1>
        <p className={styles.message}>{`"${text}"`}</p>
        <div className={styles.footer_btn}>
          <button className={styles.delete}>削除</button>
          <button className={styles.cancel} onClick={() => setIsOpen(false)}>
            キャンセル
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteMessage;
