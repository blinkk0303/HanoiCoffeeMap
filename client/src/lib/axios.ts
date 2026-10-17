import { useAuthStore } from '@/stores/useAuthStore';
import axios from 'axios';
import { toast } from 'sonner'; 
const REFRESH_THRESHOLD = 12 * 60 * 60; // còn dưới 12h thì gia hạn (giây)

// Các endpoint công khai: 401 ở đây là sai thông tin đăng nhập, không phải hết phiên
const PUBLIC_PATHS = ['/auth/login', '/auth/signUp']; 

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Đọc `exp` từ payload JWT (chỉ để biết khi nào hết hạn, không verify)
function getExp(token: string): number | null {
  try {
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64)).exp ?? null;
  } catch {
    return null;
  }
}

// gắn access token vào header, và gia hạn trước nếu token sắp hết hạn
api.interceptors.request.use(async (config) => {
  let accessToken = useAuthStore.getState().accessToken;
  const isRefreshCall = config.url?.includes('/auth/refresh');

  // Không tự gia hạn khi chính request này là request gia hạn, nếu không sẽ lặp vô hạn
  if (accessToken && !isRefreshCall) {
    const exp = getExp(accessToken);
    const now = Date.now() / 1000;

    if (exp && exp > now && exp - now < REFRESH_THRESHOLD) {
      try {
        accessToken = await useAuthStore.getState().refresh();
      } catch {
        // Gia hạn lỗi thì dùng token cũ; nếu hết hạn thật sẽ bị 401 ở response interceptor
      }
    }
  }

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// token hết hạn hoặc không hợp lệ thì đăng xuất
api.interceptors.response.use(
  (res) => res,
  (error) => {
    const url: string = error.config?.url ?? '';
    const isPublic = PUBLIC_PATHS.some((p) => url.includes(p));

    if (error.response?.status === 401 && !isPublic) {
      useAuthStore.getState().clearState();
      if (window.location.pathname !== '/signin') {
        toast.error('Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại');
        window.location.href = '/signin';
      }
    }
    return Promise.reject(error);
  }
);

export default api;