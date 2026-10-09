import {create} from 'zustand';
import {toast} from 'sonner';
import {authService} from '../service/authService';
import type { AuthState } from '../types/store';

export const useAuthStore = create<AuthState>((set,get) => ({
    accessToken: null,
    user: null,
    loading: false,
    
    // Hàm để xóa trạng thái đăng nhập => clear toàn bộ state
    clearState: () => {
        set({accessToken: null, user: null, loading: false});
    },

    signUp: async (full_name: string, email: string, password_hash: string) => {
        try{
            set({loading: true});
            //gọi api đăng ký
            await authService.signUp(full_name, email, password_hash);
            toast.success('Đăng ký thành công! Bạn sẽ được chuyển sang trang đăng nhập');
            return true;
        }catch(error:any){
            console.error(error);
            const message = error.response?.data?.message || 'Đăng ký không thành công';
            toast.error(message);
            return false;
        }finally{
            set({loading: false});
        }
    },
    signIn: async (email: string, password_hash: string) => {
        try{
            set({loading: true});
            const {accessToken,user} = await authService.signIn(email, password_hash);
            console.log("sign in result", accessToken,user);
            set({accessToken,user});

            const ok =  await get().fetchCurrentUser(); //lấy thông tin user hiện tại sau khi đăng nhập thành công
            if(!ok){
                toast.error('Lỗi xảy ra khi lấy thông tin người dùng, vui lòng thử lại');
                return false;
            }
            toast.success('Đăng nhập thành công!');
            return true;
        }catch(error:any){
            console.error(error);
            const message = error.response?.data?.message || 'Đăng nhập không thành công';
            toast.error(message);
            return false;
        }finally{
            set({loading: false});
        }
    },
    signOut: async () => {
        try{
            get().clearState();
            await authService.signOut();
            toast.success('Đăng xuất thành công!');
        }finally{
            localStorage.removeItem('accessToken');
            get().clearState();
        }
    },
    fetchCurrentUser: async () => {
        const {accessToken,user} = get();
        if(!accessToken || !user){
            set({user: null});
            return false; 
        } //nếu không có accessToken thì không cần gọi api, reset user về null
        try{
            const user = await authService.getCurrentUser();            
            //cập nhật lại store khi da co user
            set({user});
            return true;
        }catch(error:any){
            console.error(error);
            set({user: null, accessToken: null}); //reset state nếu không lấy được user
            toast.error('Lỗi xảy ra khi lấy thông tin người dùng, vui lòng thử lại');
            return false;
        }
    }
}));