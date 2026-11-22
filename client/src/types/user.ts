export type UserRole = 'ADMIN' | 'USER' | 'OWNER';
export type CafeApprovalStatus = 'PENDING' | 'APPROVED' | 'REJECTED';
export type CafeOperatingStatus = 'open' | 'closed' | 'maintenance';
export interface User {
    id: string;
    full_name: string;
    email: string;
    role: UserRole;
    avatar_url?: string;
    created_at: string;
    phone?: string;
    updated_at: string;
    is_active?: boolean;

}

export interface OwnedCafe {
    id: string;
    name: string;
    address: string;
    approval_status: CafeApprovalStatus;
    operating_status: CafeOperatingStatus;
}
export interface UserDetail extends User {
    ownedCafes?: OwnedCafe[];
}

// Hồ sơ công khai: không có email, is_active, updated_at
export type PublicUserProfile = Pick<
  User,
  'id' | 'full_name' | 'avatar_url' | 'phone' | 'created_at'
> & {
  ownedCafes?: OwnedCafe[];  // backend chỉ trả quán đã duyệt
};

// export interface UserDetailResponse {
//   success: boolean;
//   message: string;
//   data: UserDetail;
// }