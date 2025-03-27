import { AppProps } from 'next/app';
import { UserProvider } from './context/UserContext';
import { SupabaseProvider } from './context/SupabaseContext';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <UserProvider>
            <SupabaseProvider>
                <Component {...pageProps} />
            </SupabaseProvider>
        </UserProvider>
    );
} 