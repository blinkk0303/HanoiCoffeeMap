import { useEffect, useState } from 'react';
import { Link, useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft } from 'lucide-react';

import { userService } from '@/service/userService';
import type { UserDetail} from '@/types/user';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const formatDate = (value?: string) =>
  value ? new Date(value).toLocaleString('vi-VN') : '—';

const getErrorMessage = (err: unknown) => {
  if (axios.isAxiosError(err)) {
    // Ưu tiên message do backend trả về
    return err.response?.data?.message ?? 'Không thể tải chi tiết người dùng';
  }
  return err instanceof Error ? err.message : 'Không thể tải chi tiết người dùng';
};

const InfoRow = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="flex flex-col gap-1 sm:flex-row sm:justify-between">
    <span className="text-sm text-muted-foreground">{label}</span>
    <span className="break-all text-sm font-medium">{value}</span>
  </div>
);

const UserDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<UserDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const OWNED_CAFE_ROLES = ['OWNER', 'ADMIN'];
  
  

  useEffect(() => {
    let ignore = false;

    const fetchAdminUserDetail = async () => {
      if (!id) {
        setError('Không tìm thấy ID người dùng');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const data = await userService.adminGetUserDetail(id);
        if (!ignore) setUser(data);
      } catch (err) {
        console.error('Lỗi khi tải chi tiết người dùng', err);
        if (!ignore) setError(getErrorMessage(err));
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    fetchAdminUserDetail();
    return () => {
      ignore = true;
    };
  }, [id]);

  // Loading
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

  if (error || !user) {
    return (
      <div className="container flex flex-col items-start gap-4 py-8">
        <p className="text-destructive">{error ?? 'Không tìm thấy người dùng'}</p>
        <Button size="icon" variant="outline" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại
        </Button>
      </div>
    );
  }

  const isOwner = OWNED_CAFE_ROLES.includes(user.role);
  const ownedCafes = user.ownedCafes ?? [];

  return (
    <div className="container flex flex-col gap-6 py-8">
      <Button variant="outline" className="w-fit px-0 "onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại
      </Button>

      {/* Tổng quan */}
      <Card>
        <CardContent className="flex flex-col items-start gap-4 pt-6 sm:flex-row sm:items-center">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user.avatar_url} alt={user.full_name} />
            <AvatarFallback className="text-2xl">
              {user.full_name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-semibold">{user.full_name}</h1>
            <p className="text-muted-foreground">{user.email}</p>
            <div className="flex flex-wrap gap-2">
              <Badge>{user.role}</Badge>
              {user.is_active !== undefined && (
                <Badge variant={user.is_active ? 'secondary' : 'destructive'}>
                  {user.is_active ? 'Đang hoạt động' : 'Đã khoá'}
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Thông tin tài khoản */}
        <Card>
          <CardHeader>
            <CardTitle>Thông tin tài khoản</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <InfoRow label="ID" value={user.id} />
            <InfoRow label="Email" value={user.email} />
            {/* <InfoRow label="Vai trò" value={user.role} /> */}
            <InfoRow label="Số liên hệ" value={user.phone} />
            <InfoRow label="Ngày tạo" value={formatDate(user.created_at)} />
            <InfoRow label="Cập nhật lần cuối" value={formatDate(user.updated_at)} />
          </CardContent>
        </Card>

        {/* Quán sở hữu: chỉ hiện với owner va admin*/}
        {isOwner && (
          <Card>
            <CardHeader>
              <CardTitle>Quán đang sở hữu ({ownedCafes.length})</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              {ownedCafes.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  Người dùng này chưa sở hữu quán nào.
                </p>
              ) : (
                ownedCafes.map((cafe) => (
                  <Link
                    key={cafe.id}
                    to={`/cafes/${cafe.id}`}
                    className="rounded-md border p-3 transition-colors hover:bg-muted"
                  >
                    <div className="font-medium">{cafe.name}</div>
                    <div className="text-sm text-muted-foreground">{cafe.address}</div>
                    <div className="mt-2 flex gap-2">
                      <Badge variant="outline">{cafe.approval_status}</Badge>
                      <Badge variant="outline">{cafe.operating_status}</Badge>
                    </div>
                  </Link>
                ))
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default UserDetailPage;