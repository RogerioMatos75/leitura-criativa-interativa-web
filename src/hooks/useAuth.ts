import { useState, useEffect } from 'react';

const useAuth = () => {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        // Lógica para autenticação
        const fetchUser = async () => {
            try {
                const response = await fetch('/api/user');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const fetchedUser = await response.json();
                setUser(fetchedUser);
            } catch (error) {
                console.error('Error fetching user:', error);
                setUser(null);
            }
        };

        fetchUser();
    }, []);

    return { user };
};

export default useAuth;
