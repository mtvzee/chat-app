import { deleteDoc, doc } from 'firebase/firestore';
import { MouseEvent } from 'react';
import { BiTrash } from 'react-icons/bi';
import { useSetRecoilState } from 'recoil';
import { showDeleteFriendBtn } from '../atoms/buttonAtom';
import { db } from '../firebase';
import styles from '../styles/components/DeleteFriendBtn.module.css';

type Props = {
  id: number;
};

const DeleteFriendBtn = ({ id }: Props) => {
  const setShowDeleteBtn = useSetRecoilState(showDeleteFriendBtn);

  const handleDeleteFriend = async (e: MouseEvent<HTMLDivElement, MouseEvent>) => {
    await deleteDoc(doc(db, `chats/${id}`));
    setShowDeleteBtn(false);
  };
  return (
    <>
      <div
        className={styles.overlay}
        onClick={() => setShowDeleteBtn(false)}
      ></div>
      <div className={styles.delete} onClick={(e) => handleDeleteFriend(e)}>
        <BiTrash size="25" />
      </div>
    </>
  );
};

export default DeleteFriendBtn;
