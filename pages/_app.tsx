import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Login from '../components/Login';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../styles/theme';

function MyApp({ Component, pageProps }: AppProps) {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          fontSize: '4rem',
        }}
      >
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Login />;
  } else {
    return (
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    );
  }
}

export default MyApp;
