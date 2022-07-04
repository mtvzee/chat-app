import styles from '../styles/components/Sidebar.module.css';
import Avatar from './Avatar';
import Friend from './Friend';

const Sidebar = () => {
  return (
    <div className={styles.container}>
      <header>
        <div className={styles.user_info}>
          <Avatar src="/" width={48} height={48} />
          <h1>name</h1>
        </div>
        <div>メニュー</div>
      </header>
      <div className={styles.btn}>
        <button>友達を追加</button>
      </div>
      <ul>
        <Friend />
      </ul>
    </div>
  );
};

export default Sidebar;
