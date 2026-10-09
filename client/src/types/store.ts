import { User } from './user';

export interface AuthState {
  accessToken: string | null;
  user: User | null;
  loading: boolean;
  clearState: () => void;

  signUp: (full_name: string, email: string, password_hash: string) => Promise<boolean>;
  signIn: (email: string, password_hash: string) => Promise<void | boolean>;
  signOut: () => Promise<void>;
  fetchCurrentUser: () => Promise<void | boolean>; // trả về true nếu lấy thông tin user thành công, false nếu không có accessToken hoặc lỗi xảy ra
} 