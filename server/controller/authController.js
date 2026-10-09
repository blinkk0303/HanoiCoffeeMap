import bcrypt from "bcrypt"
import UserModel from "../models/users.js";
import jwt from "../utils/jwt.js";
import AppError from "../utils/Errors/AppError.js";
import catchAsync from "../utils/Errors/catchAsync.js";

export const signUp = catchAsync (async(req,res,next) => {
        const {email, password_hash,full_name} = req.body;
        if(!email || !password_hash || !full_name) {
            return next(new AppError("Không thể thiếu email , password và full name",400))
        }

        // kiem tra user ton tai chua ?
        const duplicate = await UserModel.isEmailExists(email);
        if(duplicate){
            return next(new AppError("Email đã tồn tại, vui lòng dùng email khác",409))
        }
    
        // ma hoa mat khau 
        const hashedPass = await bcrypt.hash(password_hash, 10) //salt = 10

        // tao user moi 
        await UserModel.createUser({email, password_hash:hashedPass,full_name})

        return res.status(204).json({
            success: true,
            message: 'Đăng ký thành công',
        });
        
});

export const signIn = catchAsync(async(req,res,next) => {
        const {email, password_hash} = req.body;
        if(!email || !password_hash){
            return next(new AppError("Email và mật khẩu là bắt buộc",400));
        }
        const user = await UserModel.findUserByEmail(email);
        if(!user){
            return next(new AppError("Email hoặc mật khẩu không đúng",401));
        }
        const isMatch = await bcrypt.compare(password_hash, user.password_hash);
        if(!isMatch){
            return next(new AppError("Email hoặc mật khẩu không đúng ",401));
        }
        const accessToken = jwt.generateToken({
            userId: user.id, role: user.role
        })

        //khong tra password ve client 
        const { password_hash: _, ...safeUser } = user;

        res.status(200).json({
        message: 'Đăng nhập thành công',
        accessToken,
        user: safeUser
        });
});

export const signOut = catchAsync(async(req,res) => {
    // client thực hiện xóa token ở phía client, server không cần làm gì cả
    res.status(200).json({
        success: true,
        message: 'Đăng xuất thành công',
    })
    
});

export const getCurrentUser = catchAsync(async(req,res,next) => {
    // Lấy thông tin người dùng từ req.user (được xác thực bởi middleware)
    const {userId} = req.user;
    const user = await UserModel.findUserById(userId);
    if(!user){
        return next(new AppError("Người dùng không tồn tại",401));
    }
    if(user.is_active === false){
        return next(new AppError("Tài khoản của bạn đã bị khóa, vui lòng liên hệ quản trị viên",403));
    }
    res.status(200).json({
        success: true,
        user
    });
});
