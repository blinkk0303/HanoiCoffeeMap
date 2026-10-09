export type UserRole = 'ADMIN' | 'USER' | 'GUEST';

export interface User {
    id: string;
    fullname: string;
    email: string;
    role: UserRole;
    avatar_url?: string;
    updated_at: string;
}