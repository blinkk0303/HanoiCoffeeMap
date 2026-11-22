import UserModel from '../models/users.js';
import AppError from "../utils/Errors/AppError.js";
import catchAsync from "../utils/Errors/catchAsync.js";


const OWNED_CAFE_ROLES = ['OWNER', 'ADMIN'];
export const getUsers = catchAsync (async(req, res) => {
        const { page, limit } = req.query;
        const result = await UserModel.findAllUsers({ page, limit });
        res.json({
            success: true,
            message: 'Get all users successfully',
            ...result,
        })
});

const attachOwnedCafes  = (async(user,{approval_status = false} = {}) => {
    if(!OWNED_CAFE_ROLES.includes(user.role)) return {...user, ownedCafes:[]};
    const ownedCafes = await UserModel.findCafeOwnerId(user.id, {approval_status});
    return {...user,ownedCafes};
});

// get /user/me 
export const getMyProfile = catchAsync(async(req,res) => {
    const user = await UserModel.findUserById(req.user.id);
    if(!user){return next(new AppError("Không tìm thấy người dùng",404))}
    const data = await attachOwnedCafes(user, {approval_status: false});
    return res.status(200).json({
        success: true,
        message: "Lấy thông tin người dùng thành công",
        data
    })
});

export const getPublicProfile = catchAsync(async(req,res,next) => {
    const id = req.params.id; 
    const user = await UserModel.findUserPublicById(id);
    if(!user){return next(new AppError("Không tìm thấy người dùng",404))}
    const data = await attachOwnedCafes(user, { onlyApproved: false });
    return res.status(200).json({
        success: true,
        message: "Lấy thông tin người dùng thành công",
        data: data
    })
});

export const adminGetUserDetail = catchAsync(async(req,res,next)=> {
    const {id} = req.params;
    if(!id) {return next(new AppError("ID người dùng không hợp lệ",400))};

    const user = await UserModel.findUserDetailById(id);
    if(!user){
        return next(new AppError("Không tìm thấy người dùng",404))
    }
    //admin xem tat ca quan, ke ca chua duoc duyet 
    const data = await attachOwnedCafes(user,{approval_status: false});
    return res.status(200).json({
        success:true,
        message: "Lấy thông tin người dùng thành công",
        data
    })
});

export const createUser = catchAsync(async(req,res) => {
        const {email, password_hash,full_name, phone, avatar_url, role, is_active} = req.body;
        const user = await UserModel.createUser({email, password_hash,full_name, phone, avatar_url, role, is_active});
        res.status(201).json({
            success: true,
            message: 'Tạo người dùng thành công',
            data: user
        })
});

export const updateUser =catchAsync (async(req,res,next) => {
        const {email, password_hash,full_name, phone, avatar_url, role, is_active} = req.body;
        const user = await UserModel.updateUser(req.params.id, {email, password_hash,full_name, phone, avatar_url, role, is_active});
        if(!user){
            return next(new AppError("Không tìm thấy người dùng",404))
        }
        res.status(200).json({
            success: true,
            message: `updated ${user.full_name} successfully`,
            data: user
        })
});

export const deleteUser = catchAsync(async(req,res,next) => {
        const user = await UserModel.deleteUser(req.params.id);
        if(!user){
            return next(new AppError("Không tìm thấy người dùng",404))
        }
        res.status(200).json({
            success: true,
            message: `deleted ${user.full_name} successfully`,
            data: user
        })
});


export default { getUsers,getMyProfile,getPublicProfile,adminGetUserDetail,createUser, updateUser, deleteUser }
