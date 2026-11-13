import { PaginatedResponse } from '@/types/pagination';
import api from '../lib/axios';
import type { User } from '../types/user';

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
    }
}
