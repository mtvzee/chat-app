import { useState } from 'react';
import styles from '../styles/components/AddFriend.module.css';
import AddFriendModal from './AddFriendModal';

const AddFriend = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className={styles.container}>
        <button className={styles.btn} onClick={() => setIsOpen(true)}>
          友達を追加
        </button>
      </div>
      {isOpen && <AddFriendModal setIsOpen={setIsOpen} />}
    </>
  );
};

export default AddFriend;
