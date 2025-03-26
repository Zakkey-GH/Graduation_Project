import { UserProvider } from './context/UserContext';
import { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <UserProvider>
            <Component {...pageProps} />
        </UserProvider>
    );
}
