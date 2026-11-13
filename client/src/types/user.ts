export type UserRole = 'ADMIN' | 'USER' | 'OWNER';

export interface User {
    id: string;
    full_name: string;
    email: string;
    role: UserRole;
    avatar_url?: string;
    updated_at: string;
    is_active?: boolean;
}