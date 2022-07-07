import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { BsChatDots } from 'react-icons/bs';
import Sidebar from '../components/Sidebar';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import { useEffect } from 'react';
import { doc, setDoc } from 'firebase/firestore';

const Home: NextPage = () => {
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      setDoc(doc(db, 'userInfo', user?.uid), {
        email: user?.email,
        photoURL: user?.photoURL,
        displayName: user?.displayName,
      });
    }
  }, [user]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Chat App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.sidebar}>
        <Sidebar />
      </div>
      <main className={styles.main}>
        <BsChatDots className={styles.chat_logo} />
        <p>友達を追加して、チャットを作成してください</p>
      </main>
    </div>
  );
};

export default Home;
