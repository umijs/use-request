import { getUserList } from '@/service';
import useAPI from '@umijs/use-api';
import { List, Pagination, Select } from 'antd';
import React, { useEffect, useState, useRef } from 'react';
import Link from 'umi/link';

export default () => {

  const firstRun = useRef(true);

  const { params, run, data, loading, pagination } = useAPI(
    (p, gender?: string) => getUserList({ ...p, gender }),
    {
      cacheKey: 'paginationDemo',
      paginated: true,
      manual: true
    }
  );

  const [gender, setGender] = useState<string>(params[1]);

  // first run
  useEffect(() => {
    // First execution, read pagination data from cache
    if (firstRun.current && params[1]) {
      firstRun.current = false;
      run(...params);
    } else {
      run({
        current: 1,
        pageSize: 10
      }, gender);
    }
  }, [gender])


  return (
    <div>
      <Select
        value={gender}
        style={{ width: 180, marginBottom: 24 }}
        onChange={(g: string) => setGender(g)}
        placeholder="select gender"
        allowClear={true}
      >
        <Select.Option value="male">male</Select.Option>
        <Select.Option value="female">female</Select.Option>
      </Select>
      <List
        dataSource={data && data.list}
        loading={loading}
        renderItem={item => (
          <List.Item>
            {item.name} - {item.email}
          </List.Item>
        )}
      />
      <Pagination
        {...(pagination as any)}
        showQuickJumper={true}
        showSizeChanger={true}
        onShowSizeChange={pagination.onChange}
        style={{ marginTop: 16, textAlign: 'right' }}
      />
      <div>
        <Link to="/another">
          go to another page
        </Link>
      </div>
    </div>
  );
};
