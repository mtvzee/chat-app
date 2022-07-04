import Avatar from './Avatar';
import styles from '../styles/components/Friend.module.css';
import Link from 'next/link';

const Friend = () => {
  return (
    <li>
      <Link href={`#`}>
        <a className={styles.container}>
          <div className={styles.avatar}>
            <Avatar src="/" />
          </div>
          <div className={styles.friend_info}>
            <h2>name</h2>
            <p>テキスト</p>
          </div>
          <div className={styles.time}>2022</div>
        </a>
      </Link>
    </li>
  );
};

export default Friend;
