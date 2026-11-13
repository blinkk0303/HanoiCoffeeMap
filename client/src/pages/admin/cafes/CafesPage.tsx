import { User } from '@/types/user';
import React, { useEffect, useState } from 'react'
import {cafeService} from '@/service/cafeService';
import { Cafe } from '@/types/cafe';
import { DataTable } from './data-table';
import { columns } from './columns';

const CafesPage = () => {
   const [cafes, setCafes] = useState<Cafe[]>([]);
   const [total, setTotal] = useState<number>(0);
   const [loading, setLoading] = useState<boolean>(false);
   const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  useEffect(() => {
      setLoading(true);
      cafeService.getAllCafes({page: pagination.pageIndex + 1, limit: pagination.pageSize})
        .then((res) => {
        setCafes(res.data);
        setTotal(res.total);
        setLoading(false);
      })
      .catch((err) => {console.error('Error fetching cafes:', err);})
      .finally(() => setLoading(false));
    }, [pagination.pageIndex, pagination.pageSize]);

  return (
    <div className="container flex flex-col gap-6">
          <div>
            <div className="container mx-auto py-10">
              <h2 className="text-3xl font-bold tracking-tight">Cafes</h2>  
            </div>
            <DataTable columns={columns} data={cafes} rowCount={total} pagination={pagination} onPaginationChange={setPagination} />
          </div>
        </div>
  )
}

export default CafesPage