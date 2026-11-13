export type CafeApprovalStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export type CafeOperatingStatus = 'open' | 'closed';

export interface Cafe {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    address: string;
    district: string;
    phone: string | null;
    website: string | null;
    created_at: string;
    avg_rating: string;
    approval_status: CafeApprovalStatus;
    operating_status: CafeOperatingStatus;
    owner_name: string;
    owner_email: string;
}
