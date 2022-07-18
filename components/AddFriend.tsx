import { useState } from 'react';
import styles from '../styles/components/AddFriend.module.css';
import { Chat } from '../types/type';
import AddFriendModal from './AddFriendModal';

type Props = {
  chatList: Chat[];
};

const AddFriend = ({ chatList }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className={styles.container}>
        <button className={styles.btn} onClick={() => setIsOpen(true)}>
          友達を追加
        </button>
      </div>
      {isOpen && <AddFriendModal chatList={chatList} setIsOpen={setIsOpen} />}
    </>
  );
};

export default AddFriend;
