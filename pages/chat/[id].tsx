import Head from 'next/head';
import Chat from '../../components/Chat';
import Sidebar from '../../components/Sidebar';
import styles from '../../styles/ChatPage.module.css';
import { AiOutlineSend } from 'react-icons/ai';
import { BsChevronLeft } from 'react-icons/bs';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { Message } from '../../types/type';
import {
  addDoc,
  collection,
  doc,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const ChatPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const endOfMsgRef = useRef<HTMLDivElement>(null);
  const friendName = sessionStorage.getItem('friendName');
  const [user] = useAuthState(auth);

  useEffect(() => {
    const q = query(
      collection(db, `chats/${id}/messages`),
      orderBy('timestamp')
    );
    const unsub = onSnapshot(q, (snapshot) =>
      setMessages(
        snapshot.docs.map((doc: DocumentData) => ({
          ...doc.data(),
          id: doc.id,
        }))
      )
    );
    return unsub;
  }, [id]);

  useEffect(() => {
    endOfMsgRef.current?.scrollIntoView();
  }, [messages]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input) return;
    // chats/id/messagesコレクションへの追加
    await addDoc(collection(db, `chats/${id}/messages`), {
      senderEmail: user?.email,
      photoURL: user?.photoURL,
      timestamp: serverTimestamp(),
      text: input,
    });

    // chats/idドキュメントの更新
    await setDoc(
      doc(db, `chats/${id}`),
      {
        timestamp: serverTimestamp(),
        latestMessage: input,
      },
      { merge: true }
    );
    setInput('');
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>ChatApp - {friendName}</title>
      </Head>
      <div className={styles.sidebar}>
        <Sidebar />
      </div>
      <div className={styles.chat}>
        <header>
          <button onClick={() => router.push('/')}>
            <BsChevronLeft className={styles.chevron} />
          </button>
          <h2>{friendName}</h2>
        </header>
        <main className={styles.messages}>
          {messages.map((msg) => (
            <Chat
              key={msg.id}
              id={msg.id}
              senderEmail={msg.senderEmail}
              timestamp={msg.timestamp}
              text={msg.text}
              photoURL={msg.photoURL}
            />
          ))}
          <div ref={endOfMsgRef} />
        </main>
        <form className={styles.send} onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            placeholder="メッセージを入力..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button>
            <AiOutlineSend className={styles.send_btn} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;
