import { User } from '@/types/user'
import { DataTable } from './data-table';
import { columns } from './column';
import { useEffect, useState } from 'react';
import {userService} from '@/service/userService';

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  useEffect(() => {
    setLoading(true);
    userService.getAllUsers({page: pagination.pageIndex + 1, limit: pagination.pageSize})
      .then((res) => {
      setUsers(res.data);
      setTotal(res.total);
      setLoading(false);
    })
    .catch((err) => {console.error('Error fetching users:', err);})
    .finally(() => setLoading(false));
  }, [pagination.pageIndex, pagination.pageSize]);

  return (
    <div className="container flex flex-col gap-6">
      <div>
        <div className="container mx-auto py-10">
          <h2 className="text-3xl font-bold tracking-tight">Người dùng</h2>
          <DataTable columns={columns} data={users} rowCount={total} pagination={pagination} onPaginationChange={setPagination} />
        </div>
      </div>
    </div>
  )
}

export default UsersPage