import api from '../lib/axios';


export const authService = {
    signUp: async (full_name: string, email: string, password_hash: string) => {
        const res = await api.post('/auth/signUp', { full_name, email, password_hash }, { withCredentials: true });
        return res.data;
    },
    
    signIn: async (email: string, password_hash: string) => {
        const res = await api.post('/auth/login', { email, password_hash }, { withCredentials: true });
        return res.data; //access token 
    },

    signOut: async () => {
        return await api.post('/auth/logout', {}, { withCredentials: true });
    },

    getCurrentUser: async () => {
        const res = await api.get('/auth/getMe', { withCredentials: true });
        return res.data.user; 
    },

    refresh: async() => {
        const res = await api.post('/auth/refresh')
        return res.data;
    }

}

