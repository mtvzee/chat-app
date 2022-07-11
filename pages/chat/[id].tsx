import Head from 'next/head';
import Chat from '../../components/Chat';
import Sidebar from '../../components/Sidebar';
import styles from '../../styles/ChatPage.module.css';
import { AiOutlineSend } from 'react-icons/ai';
import { BsChevronLeft } from 'react-icons/bs';
import { NextPage } from 'next';

const ChatPage: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>ChatApp - </title>
      </Head>
      <div className={styles.sidebar}>
        <Sidebar />
      </div>
      <div className={styles.chat}>
        <header>
          <button>
            <BsChevronLeft className={styles.chevron} />
          </button>
          <h2>name</h2>
        </header>
        <main>
          <Chat />
        </main>
        <form className={styles.send}>
          <input type="text" placeholder="メッセージを入力..." />
          <button>
            <AiOutlineSend className={styles.send_btn} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;
