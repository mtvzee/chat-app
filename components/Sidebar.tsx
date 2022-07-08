import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import styles from '../styles/components/Sidebar.module.css';
import AddFriend from './AddFriend';
import Avatar from './Avatar';
import Dropdown from './Dropdown';
import Friend from './Friend';

const Sidebar = () => {
  const [user] = useAuthState(auth);

  return (
    <div className={styles.container}>
      <header>
        <div className={styles.user_info}>
          <Avatar src={user?.photoURL} width={48} height={48} />
          <h1>{user?.displayName}</h1>
        </div>
        <Dropdown />
      </header>
      <AddFriend />
      <ul>
        <Friend />
      </ul>
    </div>
  );
};

export default Sidebar;
