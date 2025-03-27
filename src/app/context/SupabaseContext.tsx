import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface SupabaseContextType {
    user: any;
    loading: boolean;
    fetchData: () => Promise<void>;
    insertData: (data: any) => Promise<void>;
}

const SupabaseContext = createContext<SupabaseContextType | undefined>(undefined);

export const SupabaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getCurrentUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
            setLoading(false);
        };

        getCurrentUser();
    }, []);

    const fetchData = async () => {
        // データ取得のロジックをここに追加
    };

    const insertData = async (data: any) => {
        const { error } = await supabase
            .from('your_table')
            .insert([data]);

        if (error) {
            console.error('Error inserting data:', error);
        }
    };

    return (
        <SupabaseContext.Provider value={{ user, loading, fetchData, insertData }}>
            {children}
        </SupabaseContext.Provider>
    );
};

export const useSupabase = () => {
    const context = useContext(SupabaseContext);
    if (!context) {
        throw new Error('useSupabase must be used within a SupabaseProvider');
    }
    return context;
}; 