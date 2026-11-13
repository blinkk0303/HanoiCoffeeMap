// Phân quyền theo role admin - user - owner

export const requireRole = (...allowedRoles) => {
    return (req,res,next) => {
        if(!req.user){
            return res.status(401).json({
                message: "Chưa xác nhận"
            })
        }
        if(!allowedRoles.includes(req.user.role)){
            return res.status(403).json({
                message: "Bạn không đủ quyền thực hiện hành động này"
            })
        }
        next();
    }
}

export default requireRole;