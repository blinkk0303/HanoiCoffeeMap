import { User } from './user';

export interface AuthState {
  accessToken: string | null;
  user: User | null;
  loading: boolean;
  clearState: () => void;

  signUp: (full_name: string, email: string, password_hash: string) => Promise<boolean>;
  signIn: (email: string, password_hash: string) => Promise<void | boolean>;
  signOut: () => Promise<void>;
  fetchCurrentUser: () => Promise<void | boolean>; //return true nếu lấy dc thông tin user , false nếu không có accessToken hoặc lỗi 
  refresh: () => Promise<string>
} 