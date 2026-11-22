import { PaginatedResponse } from '@/types/pagination';
import api from '../lib/axios';
import type { User,PublicUserProfile,UserDetail } from '../types/user';

const BASE = '/admin/users';
export type GetUserParams = {
    page?: number;
    limit?: number;
    search?: string;
    role?: User['role'];
}

export const userService = {
    getAllUsers: async(params?: GetUserParams): Promise<PaginatedResponse<User>> => {
        const response = await api.get<PaginatedResponse<User>>(BASE, { params });
        return response.data;
    },

    getMyProfile: async() : Promise<UserDetail> =>{
        const response = await api.get('/user/me');
        return response.data;
    },

    getPublicProfile: async(id: string): Promise<PublicUserProfile> => {
        const response = await api.get(`/${id}/profile`);
        return response.data;
    },

    adminGetUserDetail: async(id:string): Promise<UserDetail> => {
        const res = await api.get(`${BASE}/${id}`);
        return res.data.data;
    }
    
}
