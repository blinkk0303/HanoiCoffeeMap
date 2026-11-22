import { PaginatedResponse } from '@/types/pagination';
import api from '../lib/axios';
import type { Cafe,CafeDetailResponse } from '../types/cafe';

const BASE = '/admin/cafes';
export const cafeService = {
    getAllCafes: async(params?: any): Promise<PaginatedResponse<Cafe>> => {
        const response = await api.get<PaginatedResponse<Cafe>>(BASE, { params });
        return response.data;
    },
    getCafeDetails: async (cafeId: string): Promise<CafeDetailResponse> => {
        const res = await api.get<CafeDetailResponse>(`${BASE}/${cafeId}`);
        return res.data;
    }
}