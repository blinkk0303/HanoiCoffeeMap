export type CafeApprovalStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export type CafeOperatingStatus = 'open' | 'closed' | 'maintenance';
// Cafe images
export interface CafeImage {
  id: string;
  image_url: string;
  is_primary: boolean;
  display_order: number;
}

// Cafe tags
export interface CafeTag {
  id: string;
  name: string;
  icon: string;
}

// Cafe menu items
export interface CafeMenuItem {
  id: string;
  category: string;
  item_name: string;
  price: number;
  is_available: boolean;
}

// Cafe list
export interface Cafe {
  id: string;
  owner_id: string;
  name: string;
  slug: string;
  description: string;
  address: string;
  district: string;
  latitude: string;
  longitude: string;
  phone: string;
  website: string;
  open_time: string;
  close_time: string;
  price_min: number;
  price_max: number;
  wifi: string;
  has_parking: boolean;
  avg_rating: string;
  review_count: number;
  view_count: number;
  approval_status: CafeApprovalStatus;
  reject_reason: string;
  created_at: string;
  updated_at: string;
  operating_status: CafeOperatingStatus;
  owner_name: string;
  owner_email: string;
}

// Cafe detail
export interface CafeDetail extends Cafe {
  owner_name: string;
  owner_email: string;
  owner_phone: string;

  images: CafeImage[];
  tags: CafeTag[];
  menu_items: CafeMenuItem[];
}

// API response
export interface CafeDetailResponse {
  success: boolean;
  message: string;
  data: CafeDetail;
}