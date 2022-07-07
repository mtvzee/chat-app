import styles from '../styles/components/Login.module.css';
import { FcGoogle } from 'react-icons/fc';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase';
import { useRouter } from 'next/router';

const Login = () => {
  const router = useRouter();
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then(() => {
      router.push('/');
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.panel}>
        <h1>Chat App</h1>
        <button onClick={signInWithGoogle}>
          <FcGoogle />
          Googleでログイン
        </button>
      </div>
    </div>
  );
};

export default Login;
