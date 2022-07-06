import styles from '../styles/components/Chat.module.css';
import Avatar from './Avatar';

const Chat = () => {
  return (
    <div className={styles.container}>
      <Avatar src="/" />
      <div className={styles.chat_left}>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Explicabo,
          vitae illum sit itaque a hic quasi, fugit dolore et id voluptatem
          facere commodi magni quia rem dolor provident temporibus at!
        </p>
        <span className={styles.time}>14:00</span>
      </div>
    </div>
  );
};

export default Chat;
