import React, { useEffect, useState } from 'react'
import {cafeService} from '@/service/cafeService';
import { useNavigate, useParams } from 'react-router-dom';
import { CafeDetail } from '@/types/cafe';
import { Button } from '@/components/ui/button';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader,CardTitle } from '@/components/ui/card';
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {ArrowLeft,MapPin,Phone,Globe,Clock,Wifi,Car,Star,Eye,User,
  Image as ImageIcon,
} from "lucide-react"

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("vi-VN").format(price) + " đ";
}

const formatDate = (date:string) =>{
  return new Date(date).toLocaleString("vi-VN");
}

const formatTime = (time:string) =>{
  return time.slice(0,5);
} 


const CafeDetailPage = () => {
  
  const {id} = useParams<{id: string}>(); 
  const navigate = useNavigate();
  const [cafe, setCafe] = useState<CafeDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;
    const fetchCafeDetail = async () => {
      if(!id){
        setError("Không tìm thấy ID quán cà phê");
        setLoading(false);
        return ;
      }
      setLoading(true);
      setError(null);

      try{
        const res = await cafeService.getCafeDetails(id);
        if(!ignore){
          setCafe(res.data);
        }
      }catch(err){
        console.error("Lỗi khi tải chi tiết quán cà phê",err);
        if(!ignore){
          setError(err instanceof Error ? err.message : "Không thể tải chi tiết quán cà phê");
        }
      }finally{
        if(!ignore){
          setLoading(false);
        }
      }
    };

    fetchCafeDetail();
    return () => {
      ignore = true;
    }
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <div className="container flex flex-col gap-6 py-8">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-40 w-full" />
        <div className="grid gap-6 md:grid-cols-2">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  // Error state
  if (error || !cafe) {
    return (
      <div className="container flex flex-col items-center gap-4 py-20">
        <h2 className="text-xl font-semibold">
          Không thể tải thông tin quán cafe
        </h2>

        <p className="text-sm text-muted-foreground">
          {error || "Không tìm thấy dữ liệu quán cafe."}
        </p>

        <Button variant="outline" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Quay lại
        </Button>
      </div>
  );
  }

  const approvalVariant = {
    APPROVED: "default",
    PENDING: "secondary",
    REJECTED: "destructive",
  } as const;

  const approvalLabel = {
    APPROVED: "Đã duyệt",
    PENDING: "Chờ duyệt",
    REJECTED: "Đã từ chối",
  };



  return (
    <div className="container mx-auto flex flex-col gap-6 py-8">

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>

          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Chi tiết quán cafe
            </h1>
            <p className="text-sm text-muted-foreground">
              Thông tin chi tiết và quản lý quán cafe
            </p>
          </div>
        </div>

        <Badge variant={approvalVariant[cafe.approval_status]}>
          {approvalLabel[cafe.approval_status]}
        </Badge>
      </div>

      {/* Basic information */}
      <Card>
        <CardContent className="flex flex-col gap-5 p-6 md:flex-row">
          <div className="flex h-32 w-full items-center justify-center overflow-hidden rounded-lg bg-muted md:w-48">
            {cafe.images.length > 0 ? (
              <img
                src={
                  cafe.images.find((image) => image.is_primary)?.image_url ||
                  cafe.images[0].image_url
                }
                alt={cafe.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <ImageIcon className="h-10 w-10 text-muted-foreground" />
            )}
          </div>

          <div className="flex flex-1 flex-col justify-center gap-2">
            <h2 className="text-2xl font-bold">{cafe.name}</h2>

            <p className="text-sm text-muted-foreground">
              Slug: {cafe.slug}
            </p>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              {cafe.address}
            </div>

            <p className="text-sm text-muted-foreground">
              {cafe.district}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <Star className="h-8 w-8 text-yellow-500" />
            <div>
              <p className="text-sm text-muted-foreground">Đánh giá</p>
              <p className="text-xl font-bold">
                {cafe.avg_rating} / 5
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <Eye className="h-8 w-8 text-blue-500" />
            <div>
              <p className="text-sm text-muted-foreground">Lượt xem</p>
              <p className="text-xl font-bold">{cafe.view_count}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <Star className="h-8 w-8 text-orange-500" />
            <div>
              <p className="text-sm text-muted-foreground">
                Số lượt đánh giá
              </p>
              <p className="text-xl font-bold">{cafe.review_count}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* General information and contact */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Thông tin cơ bản</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Mô tả</p>
              <p className="mt-1 text-sm leading-6">
                {cafe.description || "Chưa có mô tả"}
              </p>
            </div>

            <Separator />

            <div>
              <p className="text-sm text-muted-foreground">Khoảng giá</p>
              <p className="mt-1 font-medium">
                {formatPrice(cafe.price_min)} - {formatPrice(cafe.price_max)}
              </p>
            </div>

            <Separator />

            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">
                <Wifi className="mr-1 h-3 w-3" />
                {cafe.wifi ? `Wi-Fi: ${cafe.wifi}` : "Không có Wi-Fi"}
              </Badge>

              <Badge variant="outline">
                <Car className="mr-1 h-3 w-3" />
                {cafe.has_parking ? "Có bãi đỗ xe" : "Không có bãi đỗ xe"}
              </Badge>
            </div>

            {cafe.reject_reason && (
              <>
                <Separator />
                <div>
                  <p className="text-sm text-muted-foreground">
                    Lý do từ chối
                  </p>
                  <p className="mt-1 text-sm text-destructive">
                    {cafe.reject_reason}
                  </p>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Thông tin liên hệ và hoạt động</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Điện thoại</p>
                <p className="text-sm font-medium">
                  {cafe.phone || "Chưa cập nhật"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Website</p>
                {cafe.website ? (
                  <a
                    href={cafe.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    {cafe.website}
                  </a>
                ) : (
                  <p className="text-sm">Chưa cập nhật</p>
                )}
              </div>
            </div>

            <Separator />

            <div className="flex items-center gap-3">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">
                  Giờ hoạt động
                </p>
                <p className="text-sm font-medium">
                  {formatTime(cafe.open_time)} - {formatTime(cafe.close_time)}
                </p>
              </div>
            </div>

            <Badge
              variant={
                cafe.operating_status === "open"
                  ? "default"
                  : "secondary"
              }
            >
              {cafe.operating_status === "open"
                ? "Đang mở cửa"
                : "Đã đóng cửa"}
            </Badge>

            <Separator />

            <div>
              <p className="text-xs text-muted-foreground">Tọa độ</p>
              <p className="text-sm">
                Latitude: {cafe.latitude}
              </p>
              <p className="text-sm">
                Longitude: {cafe.longitude}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Images */}
      <Card>
        <CardHeader>
          <CardTitle>Hình ảnh quán cafe ({cafe.images.length})</CardTitle>
        </CardHeader>

        <CardContent>
          {cafe.images.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {cafe.images.map((image) => (
                <div key={image.id} className="relative">
                  <img
                    src={image.image_url}
                    alt={cafe.name}
                    className="aspect-square w-full rounded-lg object-cover"
                  />

                  {image.is_primary && (
                    <Badge className="absolute left-2 top-2">
                      Ảnh đại diện
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Quán cafe chưa có hình ảnh.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Tags */}
      <Card>
        <CardHeader>
          <CardTitle>Đặc điểm quán ({cafe.tags.length})</CardTitle>
        </CardHeader>

        <CardContent>
          {cafe.tags.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {cafe.tags.map((tag) => (
                <Badge key={tag.id} variant="secondary">
                  {tag.icon} {tag.name}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Chưa có tag nào.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Menu */}
      <Card>
        <CardHeader>
          <CardTitle>Menu ({cafe.menu_items.length} món)</CardTitle>
        </CardHeader>

        <CardContent>
          {cafe.menu_items.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left">
                    <th className="py-3 pr-4">Tên món</th>
                    <th className="py-3 pr-4">Danh mục</th>
                    <th className="py-3 pr-4">Giá</th>
                    <th className="py-3">Trạng thái</th>
                  </tr>
                </thead>

                <tbody>
                  {cafe.menu_items.map((item) => (
                    <tr key={item.id} className="border-b last:border-0">
                      <td className="py-3 pr-4 font-medium">
                        {item.item_name}
                      </td>

                      <td className="py-3 pr-4">
                        {item.category}
                      </td>

                      <td className="py-3 pr-4">
                        {formatPrice(item.price)}
                      </td>

                      <td className="py-3">
                        <Badge
                          variant={
                            item.is_available ? "default" : "secondary"
                          }
                        >
                          {item.is_available ? "Đang bán" : "Ngừng bán"}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Chưa có dữ liệu menu.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Owner information */}
      <Card>
        <CardHeader>
          <CardTitle>Thông tin chủ sở hữu</CardTitle>
        </CardHeader>

        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="flex items-center gap-3">
            <User className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Họ tên</p>
              <p className="text-sm font-medium">{cafe.owner_name}</p>
            </div>
          </div>

          <div>
            <p className="text-xs text-muted-foreground">Email</p>
            <p className="text-sm font-medium">{cafe.owner_email}</p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground">Số điện thoại</p>
            <p className="text-sm font-medium">{cafe.owner_phone}</p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground">Owner ID</p>
            <p className="break-all text-sm font-medium">
              {cafe.owner_id}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Timestamps */}
      <Card>
        <CardHeader>
          <CardTitle>Thông tin hệ thống</CardTitle>
        </CardHeader>

        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xs text-muted-foreground">Ngày tạo</p>
            <p className="text-sm">{formatDate(cafe.created_at)}</p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground">Cập nhật lần cuối</p>
            <p className="text-sm">{formatDate(cafe.updated_at)}</p>
          </div>

          <div className="sm:col-span-2">
            <p className="text-xs text-muted-foreground">Cafe ID</p>
            <p className="break-all text-sm">{cafe.id}</p>
          </div>
        </CardContent>
      </Card>

    </div>
  );
};

export default CafeDetailPage